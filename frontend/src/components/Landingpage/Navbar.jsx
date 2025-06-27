import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Testimonial from "./Testimonial";

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg'
        : 'bg-white/80 backdrop-blur-md border-b border-transparent'
      }`}>
      <div className="container mx-auto px-6 lg:px-20 py-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <a
            href="#hero-section"
            className="text-2xl font-black text-gray-900"
          >
            Sikshya<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500">Setu</span>
          </a>

          {/* Center links */}
          <div className="hidden md:flex flex-1 justify-center space-x-12">
           <a href="#hero-section" className="transition-colors duration-200 text-gray-700 hover:text-teal-600">
            Home
           </a>
            <a
              href="#about-section"
              className=
              "transition-colors duration-200 text-gray-700 hover:text-teal-600"
            >
              About
            </a>

            <a
              href="#feature-section"
              className="transition-colors duration-200 text-gray-700 hover:text-teal-600"
            >
              Features
            </a>
            <a
              href="#testimonial-section"
              className="transition-colors duration-200 text-gray-700 hover:text-teal-600"
            >
              Testimonial
            </a>
            <a
              href="#faq-section"
              className="transition-colors duration-200 text-gray-700 hover:text-teal-600"
            >
              FAQ
            </a>

            <a
              href="#contact-section"
              className="transition-colors duration-200 text-gray-700 hover:text-teal-600"
            >
              Contact
            </a>



          </div>

          {/* Right side - Login button */}
          <div className="flex items-center space-x-4">
            <NavLink
              to="/auth"
              className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
