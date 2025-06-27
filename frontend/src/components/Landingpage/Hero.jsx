import { Link } from "react-router-dom";
import HeroImage from "../../assets/hero.svg";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white mb-8">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Large gradient orb top left */}
        <div className="absolute top-0 left-0 w-96 h-64 bg-gradient-to-br from-purple-200/30 to-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Medium gradient orb top right */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
        
        {/* Small gradient orb bottom left */}
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        
        {/* Grid pattern overlay */}
        
      </div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 p relative z-10 mt-24">
        {/* Left Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-none">
              Sikshya<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Setu</span>
            </h1>
          </div>

          {/* Tagline */}
          <div className="inline-block bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            We'll rise together
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Unlock Your Potential with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
              Nepal's Leading
            </span>{" "}
            Edu-Tech Platform!
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-lg mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Interactive courses, expert mentorship, and a future-ready education—
            all in one place!
          </p>

          {/* Buttons */}
          <div className="flex flex-col w-100 justify-center text-center mb-8">
            <Link
              to="/auth/register"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              Start Learning Now →
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-xl">📘</span>
              <span>Learn Smarter</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-xl">💡</span>
              <span>Grow Faster</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200">
              <span className="text-xl">🎯</span>
              <span>Succeed Anywhere</span>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 relative">
          {/* Image container with gradient border */}
              <img
                src={HeroImage}
                alt="Student holding a laptop, smiling"
                className="w-full max-w-lg mx-auto rounded-xl drop-shadow-2xl object-cover"
              />
          
          
          {/* Floating elements around the image */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full blur-sm"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-sm"></div>
        </div>
      </div>

    </div>
  );
}
