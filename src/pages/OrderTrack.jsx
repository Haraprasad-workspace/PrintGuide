import OrderStatusTracker from "../components/OrderStatusTracker";

export default function OrderTrack() {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Order Status</h2>
      <OrderStatusTracker />
    </div>
  );
}
