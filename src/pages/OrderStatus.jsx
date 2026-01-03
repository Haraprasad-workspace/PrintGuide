import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToOrder } from "../lib/orders";

const STATUS_LABELS = {
  pending: "Waiting in queue",
  printing: "Printing in progress",
  ready: "Ready for pickup",
  completed: "Completed",
  failed: "Order failed",
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    printing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    ready: "bg-green-500/10 text-green-500 border-green-500/20",
    completed: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
};

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    const unsubscribe = listenToOrder(orderId, setOrder);
    return () => unsubscribe();
  }, [orderId]);

  if (!order) {
    return <main className="flex-1 flex items-center justify-center text-zinc-500">Loading order...</main>;
  }

  return (
    <main className="max-w-2xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-white">Order Status</h2>
        <StatusBadge status={order.status} />
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Order ID</p>
            <p className="font-mono text-zinc-300 text-sm">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Cost</p>
            <p className="text-xl font-semibold text-white">₹{order.totalPrice}</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-zinc-300 border-b border-zinc-800 pb-2">
            Files attached ({order.files.length})
          </p>

          {order.files.length === 0 ? (
            <p className="text-zinc-500 text-sm">No files attached.</p>
          ) : (
            <ul className="space-y-3">
              {order.files.map((file, idx) => (
                <li key={idx} className="flex items-center justify-between text-sm group">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center text-zinc-400 hover:text-white transition-colors truncate"
                  >
                    <span className="mr-3 text-lg opacity-50">📄</span>
                    <span className="truncate">{file.name}</span>
                  </a>
                  <span className="text-zinc-600 text-xs ml-4 whitespace-nowrap">{file.pages} pages</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-zinc-500 text-sm">
          Need help? <a href="#" className="text-white hover:underline">Contact Support</a>
        </p>
      </div>
    </main>
  );
};

export default OrderStatus;
