import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("smartbook_token");
  const userData = localStorage.getItem("smartbook_user");

  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem("smartbook_token");
    localStorage.removeItem("smartbook_user");

    setIsOpen(false);

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            SmartBook
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Home
            </Link>

            <Link
              to="/books"
              className="text-gray-700 hover:text-indigo-600 font-medium transition"
            >
              Discover
            </Link>

            {/* Show Recommendations only when logged in */}
            {token && (
              <Link
                to="/recommendations"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Recommendations
              </Link>
            )}

            {/* Show My Books only when logged in */}
            {token && (
              <Link
                to="/my-books"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                My Books
              </Link>
            )}

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Account
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {token && user ? (
                    <>
                      {/* User Info */}
                      <div className="px-5 py-4 border-b border-gray-200">
                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500 break-all mt-1">
                          {user.email}
                        </p>
                      </div>

                      {/* My Books */}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/my-books");
                        }}
                        className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        📚 My Books
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 border-t border-gray-200"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Login */}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/login");
                        }}
                        className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        Login
                      </button>

                      {/* Create Account */}
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/register");
                        }}
                        className="w-full text-left px-5 py-3 text-gray-700 hover:bg-gray-50"
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
