import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { analyzeFiles } from "../lib/fileAnalyzer";
import { getUserLocation } from "../lib/geo";
import { getTopShops } from "../lib/routing";
import { calculatePricesForShops } from "../lib/pricing";
import { createOrder, attachFilesToOrder } from "../lib/orders";
import { uploadFilesToCloudinary } from "../lib/cloudinary";

function Upload() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     1️⃣ FILE SELECTION + ANALYSIS
     =============================== */
  async function handleFileChange(e) {
    const files = [...e.target.files];
    setSelectedFiles(files);

    setLoading(true);
    try {
      const result = await analyzeFiles(files);
      setAnalysis(result);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     2️⃣ FETCH + RANK SHOPS
     =============================== */
  async function findBestShops() {
    if (!analysis) return;

    setLoading(true);
    try {
      const userLocation = await getUserLocation();
      const topShops = await getTopShops(userLocation, 5);

      const priced = calculatePricesForShops(analysis.totalPages, topShops);

      setShops(priced);
    } catch (err) {
      alert("Failed to fetch shops");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     3️⃣ CREATE ORDER + UPLOAD FILES
     =============================== */
  async function handleCreateOrder() {
    if (!selectedShop) {
      alert("Select a shop first");
      return;
    }

    setLoading(true);

    let orderId = null; // 🔑 critical for fail-safe

    try {
      // 1️⃣ Create order FIRST
      orderId = await createOrder({
        userId: currentUser.uid,
        shopId: selectedShop.id,
        totalPages: analysis.totalPages,
        totalPrice: selectedShop.totalPrice,
      });

      // 2️⃣ Upload files
      const uploadedFiles = await uploadFilesToCloudinary(
        selectedFiles,
        orderId
      );

      // 3️⃣ Attach file metadata
      const filesMeta = uploadedFiles.map((f, idx) => ({
        name: f.name,
        url: f.url,
        publicId: f.publicId,
        type: f.type,
        pages: analysis.filesMeta[idx].pages,
      }));

      await attachFilesToOrder(orderId, filesMeta);

      // 4️⃣ Success → navigate
      navigate(`/order/${orderId}`);
    } catch (err) {
      console.error(err);

      // 🔥 FAIL-SAFE (ONLY PLACE IT BELONGS)
      if (orderId) {
        try {
          await updateOrderStatus(orderId, "failed");
        } catch (e) {
          console.error("Failed to mark order as failed", e);
        }
      }

      alert("Order creation failed. Please retry.");
    } finally {
      setLoading(false);
    }
  }

  /* ===============================
     UI (INTENTIONALLY BASIC)
     =============================== */
  return (
    <main className="max-w-3xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-semibold mb-8 text-white">Create Print Order</h2>

      {/* File Upload Section */}
      <div className="mb-8">
        <label className="block w-full border-2 border-dashed border-zinc-700 hover:border-zinc-500 rounded-2xl p-8 text-center cursor-pointer transition-colors bg-zinc-900/20">
          <input
            type="file"
            multiple
            accept="application/pdf,image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="text-zinc-400 font-medium">Click to upload PDFs or Images</span>
          <p className="text-sm text-zinc-600 mt-2">Max 10MB per file</p>
        </label>

        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {selectedFiles.map((f, i) => (
              <div key={i} className="flex items-center text-sm text-zinc-300">
                <span className="mr-2">📄</span> {f.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {analysis && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm uppercase tracking-wide">Analysis</p>
            <p className="text-xl font-medium text-white">{analysis.totalPages} <span className="text-base text-zinc-500">Total Pages</span></p>
          </div>
          <button
            onClick={findBestShops}
            disabled={loading}
            className="bg-white text-zinc-950 px-6 py-2.5 rounded-lg font-medium disabled:opacity-50 hover:bg-zinc-200 transition-colors"
          >
            {loading ? "Processing..." : "Find Best Shops"}
          </button>
        </div>
      )}

      {shops.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-white mb-4">Select a Shop</h3>

          <div className="grid gap-3">
            {shops.map((shop) => (
              <label
                key={shop.id}
                className={`block p-4 rounded-xl border cursor-pointer transition-all duration-200 ${selectedShop?.id === shop.id
                    ? 'border-white bg-zinc-800'
                    : 'border-zinc-800 bg-zinc-900/30 hover:border-zinc-700'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shop"
                      onChange={() => setSelectedShop(shop)}
                      checked={selectedShop?.id === shop.id}
                      className="accent-white h-4 w-4"
                    />
                    <div>
                      <p className="font-medium text-white">{shop.name}</p>
                      <p className="text-xs text-zinc-500">Queue: {shop.queueLength} orders</p>
                    </div>
                  </div>
                  <p className="font-semibold text-white">₹{shop.totalPrice}</p>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={handleCreateOrder}
            disabled={loading || !selectedShop}
            className="w-full mt-6 bg-white text-zinc-950 py-4 rounded-xl font-semibold text-lg hover:bg-zinc-200 disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating Order..." : "Confirm & Pay"}
          </button>
        </div>
      )}

      {loading && !shops.length && !analysis && <div className="text-center text-zinc-500 mt-8">Thinking...</div>}
    </main>
  );
}

export default Upload;
