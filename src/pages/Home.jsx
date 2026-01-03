import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center">

      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
        Print Documents <br className="hidden md:block" />
        <span className="text-zinc-400">Near You</span>
      </h1>

      <p className="text-zinc-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
        Upload your PDF, get instant price calculation, and track your print
        order in real time from local print shops.
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-20">
        <Link to="/upload" className="bg-white text-zinc-950 px-8 py-3.5 rounded-full font-medium hover:bg-zinc-200 transition-colors duration-200">
          New Print Order
        </Link>

        <Link to="/dashboard" className="border border-zinc-800 text-zinc-300 px-8 py-3.5 rounded-full font-medium hover:bg-zinc-900 transition-colors duration-200">
          Track Order
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8">

        <FeatureCard
          icon=""
          title="Smart PDF Upload"
          desc="Upload your PDF and we automatically calculate page count and cost."
        />

        <FeatureCard
          icon=""
          title="Nearest Shop"
          desc="Orders are routed to the closest available print shop for pickup."
        />

        <FeatureCard
          icon=""
          title="Real-Time Tracking"
          desc="Track order status instantly from pending to completed."
        />

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700 transition-colors duration-300 text-left">
      <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">{icon}</div>
      <h3 className="font-medium text-lg text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed">
        {desc}
      </p>
    </div>
  )
}
