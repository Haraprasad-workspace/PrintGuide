export default function PriceCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold mb-2">Price Details</h3>

      <div className="text-sm space-y-1">
        <p>Pages: 12</p>
        <p>Price per page: ₹2</p>
        <hr />
        <p className="font-semibold">Total: ₹24</p>
      </div>
    </div>
  );
}
