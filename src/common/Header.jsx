import { useNavigate, Link } from "react-router-dom";
import { logout } from "../lib/logout";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Header() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className='sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-border-default'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Logo */}
          <div
            className='flex-shrink-0 flex items-center cursor-pointer group'
            onClick={() => navigate("/")}
          >
            <span className='text-2xl font-bold tracking-tight text-brand-text-primary group-hover:opacity-80 transition-opacity'>
              DocDash
            </span>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex space-x-8 items-center'>
            {currentUser ? (
              <>
                <Link
                  to='/user/upload'
                  className='text-brand-text-muted hover:text-brand-text-primary font-medium transition-colors'
                >
                  New Order
                </Link>
                <Link
                  to={`/${currentUser.role}/dashboard`}
                  className='text-brand-text-muted hover:text-brand-text-primary font-medium transition-colors'
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className='px-5 py-2 rounded-full bg-btn-secondary-bg border border-btn-secondary-border text-btn-secondary-text font-medium hover:bg-btn-secondary-hover transition-all'
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className='px-5 py-2 rounded-full bg-btn-primary-bg text-btn-primary-text font-medium hover:bg-btn-primary-hover shadow-sm hover:shadow transition-all'
                >
                  Log In
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-brand-text-muted hover:text-brand-text-primary focus:outline-none p-2'
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className='md:hidden pb-4 pt-2 border-t border-border-default'>
            <div className='flex flex-col space-y-4 px-2'>
              {currentUser ? (
                <>
                  <Link
                    to='/user/upload'
                    onClick={() => setIsMenuOpen(false)}
                    className='text-brand-text-muted hover:text-brand-text-primary font-medium transition-colors py-2'
                  >
                    New Order
                  </Link>
                  <Link
                    to={`/${currentUser.role}/dashboard`}
                    onClick={() => setIsMenuOpen(false)}
                    className='text-brand-text-muted hover:text-brand-text-primary font-medium transition-colors py-2'
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className='w-full text-left py-2 text-btn-secondary-text font-medium transition-colors'
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                  className='w-full text-left py-2 text-btn-primary-bg font-bold transition-colors'
                >
                  Log In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
