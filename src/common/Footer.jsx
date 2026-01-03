export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 mt-20 py-8">
      <div className="max-w-6xl mx-auto px-6 text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} PrintGuide. All rights reserved.
      </div>
    </footer>
  );
}
