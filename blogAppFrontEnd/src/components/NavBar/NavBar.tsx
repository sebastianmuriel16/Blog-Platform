import { useAuth } from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="w-full border-b border-gray-200 bg-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span className="text-xl font-semibold tracking-tight text-gray-900">
          Blog<span className="text-indigo-600">Platform</span>
        </span>

        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-large font-medium transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `text-large font-medium transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/tags"
            className={({ isActive }) =>
              `text-large font-medium transition-colors ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-500 hover:text-gray-900"
              }`
            }
          >
            Tags
          </NavLink>
        </div>
        <div className="flex items-center gap-3">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Login
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink
                to="/posts/drafts"
                className="text-sm font-medium px-4 py-2 rounded-lg border border-slate-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Drafts
              </NavLink>
              <NavLink
                to="/posts/new"
                className="text-sm font-medium px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                New post
              </NavLink>

              <button
                onClick={logout}
                className="text-sm font-medium px-4 py-2 rounded-lg border-2 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
