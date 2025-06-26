import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const sectionData = [
  {
    key: "mission",
    icon: "🎯",
    title: "Our Mission",
    content: (
      <p className="text-base text-gray-700">
        To build an inclusive, interactive, and empowering educational ecosystem where every question finds an answer, and every learner finds a guide.
      </p>
    ),
  },
  {
    key: "offer",
    icon: "🚀",
    title: "What We Offer",
    content: (
      <ul className="list-disc list-inside text-gray-700  space-y-2">
        <li className="transition-colors duration-200 hover:bg-blue-100 rounded px-2 py-1"><strong>Student-Teacher Interaction:</strong> Engage in meaningful academic discussions.</li>
        <li className="transition-colors duration-200 hover:bg-blue-100 rounded px-2 py-1"><strong>Topic-Based Threads:</strong> Explore organized conversations by subject or interest.</li>
        <li className="transition-colors duration-200 hover:bg-blue-100 rounded px-2 py-1"><strong>Resource Sharing:</strong> Upload notes, study materials, and helpful links.</li>
        <li className="transition-colors duration-200 hover:bg-blue-100 rounded px-2 py-1"><strong>Classroom Features:</strong> Schedule content and manage coursework in one place.</li>
        <li className="transition-colors duration-200 hover:bg-blue-100 rounded px-2 py-1"><strong>Growth-Focused Tools:</strong> Receive feedback, track progress, and improve.</li>
      </ul>
    ),
  },
  {
    key: "serve",
    icon: "👥",
    title: "Who We Serve",
    content: (
      <p className="text-base text-gray-700">
        We support <strong>students</strong> who are eager to learn, <strong>teachers</strong> who love to mentor, and <strong>institutions</strong> that aim to enhance digital education.
      </p>
    ),
  },
  {
    key: "why",
    icon: "💡",
    title: "Why We Built This",
    content: (
      <p className="text-base text-gray-700">
        Inspired by platforms like Quora and Google Classroom, we set out to create a hybrid space where education is accessible, collaborative, and truly engaging.
      </p>
    ),
  },
];

export default function About() {
  const [openSection, setOpenSection] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-blue-200 flex items-center justify-center py-8">
      <div className="max-w-3xl w-full mx-auto px-4 py-12 bg-white rounded-lg shadow-lg border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">About Us</h1>
        <p className="text-lg mb-10 text-center text-gray-700">
          At <span className="font-semibold text-blue-600">SikshyaSetu</span>, we're reimagining the way students and teachers connect, share knowledge, and grow together.<br/>
          Our platform merges the collaborative spirit of a discussion forum with the structured guidance of a virtual classroom—creating a space where curiosity meets mentorship.
        </p>
        <div className="divide-y divide-blue-100">
          {sectionData.map((section) => (
            <div key={section.key}>
              <button
                className="w-full flex items-center justify-between py-5 px-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200 hover:bg-blue-50"
                onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
                aria-expanded={openSection === section.key}
                aria-controls={`section-content-${section.key}`}
              >
                <span className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
                  <span className="text-3xl">{section.icon}</span>
                  {section.title}
                </span>
                <span className="ml-2 text-xl text-blue-600 transition-transform duration-200">
                  {openSection === section.key ? "▲" : "▼"}
                </span>
              </button>
              <div
                id={`section-content-${section.key}`}
                className={`overflow-hidden transition-all duration-300 ${openSection === section.key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} pl-2`}
                style={{ willChange: 'max-height, opacity' }}
              >
                {openSection === section.key && (
                  <div className="py-2 animate-fadeIn">{section.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center">
          <button
            className="text-xl font-bold text-white bg-blue-600 px-10 py-2 rounded-full shadow-lg transition-transform duration-200 hover:bg-blue-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 mb-2"
            onClick={() => navigate('/registration')}
          >
            Join SikshyaSetu
          </button>
          <span className="text-gray-500 text-sm">Shape the future of learning with us!</span>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .max-w-3xl { max-width: 98vw; }
            .text-4xl { font-size: 2rem; }
            .text-xl { font-size: 1.1rem; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.4s; }
        `}</style>
      </div>
    </div>
  );
}