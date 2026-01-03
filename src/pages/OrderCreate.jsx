import FileUploadCard from "../components/FileUploadCard";
import PriceCard from "../components/PriceCard";

export default function OrderCreate() {
  return (
    <div className="max-w-md w-full space-y-4">
      <FileUploadCard />
      <PriceCard />

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
        Place Order
      </button>
    </div>
  );
}

