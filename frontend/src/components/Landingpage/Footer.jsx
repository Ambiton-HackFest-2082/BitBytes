import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-green-600 to-teal-600 text-white-700 py-10 mt-0 shadow-inner overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Large gradient orb bottom left */}
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-teal-100/40 to-blue-100/30 rounded-full blur-2xl -translate-x-1/3 translate-y-1/3"></div>
        {/* Small gradient orb top right */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100/30 to-cyan-100/20 rounded-full blur-xl translate-x-1/3 -translate-y-1/3"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
        }}></div>
      </div>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center relative z-10">
        {/* Left side */}
        <p className="text-sm mb-2 md:mb-0 text-white">&copy; {new Date().getFullYear()} SikshyaSetu. All rights reserved.</p>

        {/* Center links */}
        <div className="flex flex-col space-y-4 p-4">
          {/* Nav Links */}
          <nav className="flex flex-col space-y-2">
            <a href="#hero-section" className="text-white hover:text-gray-300 transition-colors">Home</a>
            <a href="#about-section" className="text-white hover:text-gray-300 transition-colors">About</a>
            <a href="#feature-section" className="text-white hover:text-gray-300 transition-colors">Features</a>
            <a href="#testimonial-section" className="text-white hover:text-gray-300 transition-colors">Testimonials</a>
            <a href="#faq-section" className="text-white hover:text-gray-300 transition-colors">FAQ</a>
            <a href="#contact-section" className="text-white hover:text-gray-300 transition-colors">Contact</a>
          </nav>
        </div>
        <div className="flex flex-col space-y-4 p-4">
  <div>
    <p className="font-semibold text-white mb-1">Team Members</p>
    <ul className="space-y-1 text-white">
      <li>
        <a
          href="https://github.com/shivchandarsah" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-white"
        >
          Shivchandar Sah
        </a>
      </li>
      <li>
        <a
          href="https://github.com/yadavsantu" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-white"
        >
          Santu Yadav
        </a>
      </li>
      <li>
        <a
          href="https://github.com/Sworoop05" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-white"
        >
          Sworoop Bhandari
        </a>
      </li>
      <li>
        <a
          href="hhttps://github.com/durlavdeo" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline text-white"
        >
          Durlav Deo
        </a>
      </li>
    </ul>
  </div>
</div>
        {/* Right side (optional social or credit) */}
        <p className="text-sm mt-2 text-white md:mt-0">Empowering Education Through Collaboration</p>
      </div>
    </footer>
  );
}
