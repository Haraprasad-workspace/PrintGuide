import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../lib/logout";

export default function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login/user");
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo / App Name */}
        <Link to="/" className="text-lg font-medium tracking-tight text-white cursor-pointer select-none">
          PrintGuide
        </Link>

        {/* Navigation */}
        <nav className="flex gap-8 text-sm font-medium text-zinc-400">
          {currentUser ? (
            <>
              <Link to="/upload" className="hover:text-white transition-colors duration-200">
                New Order
              </Link>
              <Link to="/dashboard" className="hover:text-white transition-colors duration-200">
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login/user" className="text-white hover:text-zinc-300 transition-colors duration-200">
              Login
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
}
