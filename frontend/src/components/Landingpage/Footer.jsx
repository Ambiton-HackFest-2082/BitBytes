import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-0 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <p className="text-sm mb-2 md:mb-0">&copy; {new Date().getFullYear()} SikshyaSetu. All rights reserved.</p>

        {/* Center links */}
       <div className="flex flex-col space-y-4 p-4 bg-gray-100 ">
  {/* Nav Links */}
  <nav className="flex flex-col space-y-2">
    <Link to="/" className="hover:text-blue-600">Home</Link>
    <Link to="/about" className="hover:text-blue-600">About</Link>
    <Link to="/contact" className="hover:text-blue-600">Contact</Link>
    <Link to="/auth/login" className="hover:text-blue-600">Login</Link>
  </nav>

  {/* Team Members */}
  
</div>
<div className="flex flex-col space-y-4 p-4 bg-gray-100 ">
    <div>
    <p className="font-semibold text-gray-800 mb-1">Team Members</p>
    <ul className=" space-y-1 text-gray-700">
      <li>Shivchandar Sah</li>
      <li>Santu Yadav</li>
      <li>Sworoop Bhandari</li>
      <li>Durlav Deo</li>
    </ul>
  </div>
</div>


        {/* Right side (optional social or credit) */}
        <p className="text-sm mt-2 md:mt-0">Made with MERN for education</p>
      </div>
    </footer>
  );
}
