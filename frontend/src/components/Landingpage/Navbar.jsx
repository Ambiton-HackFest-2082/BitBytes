import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg' 
        : 'bg-white/80 backdrop-blur-md border-b border-transparent'
    }`}>
      <div className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <Link to="/" className="text-2xl font-black text-gray-900">
            Siksya<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Setu</span>
          </Link>

          {/* Center links */}
          <div className="hidden md:flex flex-1 justify-center space-x-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive 
                    ? "text-purple-600 font-semibold" 
                    : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive 
                    ? "text-purple-600 font-semibold" 
                    : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive 
                    ? "text-purple-600 font-semibold" 
                    : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive 
                    ? "text-purple-600 font-semibold" 
                    : "text-gray-700 hover:text-purple-600"
                }`
              }
            >
              Courses
            </NavLink>
          </div>

          {/* Right side - Login button */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/auth"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
