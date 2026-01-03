import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { listenToUserOrders } from "../lib/orders";

const STATUS_COLORS = {
  pending: "text-amber-500",
  printing: "text-blue-500",
  ready: "text-green-500",
  completed: "text-zinc-500",
  failed: "text-red-500",
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenToUserOrders(currentUser.uid, (data) => {
      setOrders(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center text-zinc-500">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-white">My Orders</h2>
        <Link
          to="/upload"
          className="bg-white text-zinc-950 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors"
        >
          New Order
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <p className="text-zinc-500 mb-4">You haven't placed any orders yet.</p>
          <Link to="/upload" className="text-white underline underline-offset-4 hover:text-zinc-300">
            Start printing now
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/order/${order.id}`}
              className="group block bg-zinc-900/30 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">Order #{order.id.slice(0, 8)}...</p>
                  <p className="text-xs text-zinc-500">
                    {order.createdAt?.seconds
                      ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                      : "Just now"}
                    {' '}&bull; {order.files?.length || 0} files
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-medium capitalize ${STATUS_COLORS[order.status] || "text-zinc-500"}`}>
                    {order.status}
                  </p>
                  <p className="text-zinc-400 text-sm">₹{order.totalPrice}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default Dashboard;