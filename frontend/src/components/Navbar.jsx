import { Link, useNavigate } from "react-router-dom";
import { getRoleFromToken } from "../utils/jwtUtils";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = getRoleFromToken();

  const handleDashboard = () => {
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "ORGANIZER") {
      navigate("/organizer");
    } else {
      navigate("/attendee");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-indigo-700"
        >
          EventSphere
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex gap-8 font-medium text-gray-700">

          <Link
            to="/"
            className="hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <Link
            to="/events"
            className="hover:text-indigo-600 transition"
          >
            Events
          </Link>

          <a
            href="#about"
            className="hover:text-indigo-600 transition"
          >
            About
          </a>

          <a
            href="#contact"
            className="hover:text-indigo-600 transition"
          >
            Contact
          </a>

        </div>

        {/* Right Side */}
        {!token ? (
          <div className="flex gap-4">

            <Link
              to="/login"
              className="font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                bg-gradient-to-r
                from-indigo-600
                to-purple-600
                text-white
                px-5 py-2
                rounded-full
                font-semibold
                shadow-md
                hover:scale-105
                transition
              "
            >
              Sign Up
            </Link>

          </div>
        ) : (
          <div className="flex gap-5 items-center">

            <button
              onClick={handleDashboard}
              className="font-semibold text-indigo-700"
            >
              Dashboard
            </button>

{/*             <Link */}
{/*               to="/profile" */}
{/*               className="font-semibold text-indigo-700" */}
{/*             > */}
{/*               Profile */}
{/*             </Link> */}

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                text-white
                px-4 py-2
                rounded-xl
                hover:bg-red-600
                transition
              "
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;