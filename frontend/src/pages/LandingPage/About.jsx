import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/hero-image.jpg"; // Use your own image or a placeholder

// About Us Q&A prompts for SikshyaSetu
const codeQA = [
  {
    question: "What makes SikshyaSetu different from other online learning platforms?",
    answer: "SikshyaSetu combines the best of discussion forums and virtual classrooms, creating a space where students and teachers can connect, share, and grow together."
  },
  {
    question: "How does SikshyaSetu support collaborative learning?",
    answer: "Our platform encourages real-time interaction, resource sharing, and topic-based discussions, making learning a truly collaborative experience."
  },
  {
    question: "Who can benefit from SikshyaSetu?",
    answer: "Students eager to learn, teachers passionate about mentoring, and institutions aiming to enhance digital education all find value in our inclusive ecosystem."
  },

  {
    question: "Why was SikshyaSetu created?",
    answer: "Inspired by the need for accessible, engaging, and collaborative education, SikshyaSetu was built to bridge the gap between curiosity and mentorship in the digital age."
  }
];

export default function About() {
  const navigate = useNavigate();
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="relative min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center py-16 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Large gradient orb top left */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-200/30 to-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        {/* Medium gradient orb top right */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
        {/* Small gradient orb bottom left */}
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
        }}></div>
      </div>
      <div className="max-w-6xl w-full mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* Left: Image and badge */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-teal-100"></div>
            <img src={HeroImage} alt="Students collaborating" className="w-full h-full object-cover rounded-full shadow-xl" />
            {/* Play button overlay */}
            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-teal-200">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#A78BFA"/><polygon points="13,10 23,16 13,22" fill="#fff"/></svg>
            </button>
            {/* Enrolled badge */}
            <div className="absolute left-4 bottom-4 bg-white rounded-xl shadow-lg px-4 py-2 flex flex-col items-start">
              <span className="text-sm font-bold text-teal-700">36K+ Enrolled Students</span>
              <div className="flex mt-2 -space-x-2">
                {/* Avatars (use placeholder images or initials) */}
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                <img src="https://randomuser.me/api/portraits/women/46.jpg" alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="w-8 h-8 rounded-full bg-teal-200 flex items-center justify-center text-xs font-bold text-teal-700 border-2 border-white">+5</span>
              </div>
            </div>
          </div>
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col items-start justify-center">
          {/* Badge */}
          <span className="inline-block mb-4 px-6 py-2 rounded-full bg-teal-100 text-teal-700 font-medium text-base shadow-sm">Get More About Us</span>
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Thousand Of Top <span className="bg-green-300 px-2 rounded text-gray-900">Courses</span> Now<br />In One Place
          </h2>
          {/* Subheading */}
          <p className="text-lg text-gray-500 mb-6 max-w-xl">
            Groove's intuitive shared inbox makes it easy for team members to organize, prioritize, and share knowledge. Join us to elevate your learning experience.
          </p>
          {/* Code Q&A List as Accordion */}
          <ul className="mb-8 space-y-4 w-full">
            {codeQA.map((item, idx) => (
              <li key={idx} className="w-full">
                <button
                  className={`w-full flex items-center gap-3 p-4 rounded-xl bg-white shadow-md border border-green-100 transition-all duration-300 hover:bg-green-50 focus:outline-none ${openIdx === idx ? 'ring-2 ring-green-300' : ''}`}
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  aria-expanded={openIdx === idx}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-green-300 text-white text-xl">?</span>
                  <span className="font-bold text-gray-900 text-left flex-1">{item.question}</span>
                  <span className={`ml-2 text-green-500 text-xl transition-transform duration-300 ${openIdx === idx ? 'rotate-90' : ''}`}>▶</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 bg-green-50 rounded-b-xl ${openIdx === idx ? 'max-h-40 opacity-100 p-4 border-t border-green-100' : 'max-h-0 opacity-0 p-0 border-0'}`}
                  style={{ willChange: 'max-height, opacity' }}
                >
                  {openIdx === idx && (
                    <div className="text-gray-700 text-base animate-fadeIn">{item.answer}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {/* CTA Button */}
         
        </div>
      </div>
    </section>
  );
}