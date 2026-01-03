const steps = ["Pending", "Printing", "Ready", "Completed"];
const currentStep = 1;

export default function OrderStatusTracker() {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`p-3 rounded-lg flex justify-between ${
            index <= currentStep
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <span>{step}</span>
          {index === currentStep && <span>●</span>}
        </div>
      ))}
    </div>
  );
}
