import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
<nav className="bg-white shadow-4x2 p-4 flex justify-between items-center">
      {/* Logo on the left */}
      <Link to="/" className="text-xl font-bold text-green-600">
        SikshyaSetu
      </Link>

      {/* Center links */}
      <div className="hover:text-green-600 flex-1 flex justify-center space-x-20">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-500"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-500"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-500"
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Login on the right */}
      <div className="mr-8">
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-green-500"
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
}
