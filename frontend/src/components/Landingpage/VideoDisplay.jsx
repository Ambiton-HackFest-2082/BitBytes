// src/components/VideoDisplay.jsx

import React from "react";

export default function VideoDisplay({ title = "How SikshyaSetu Works", videoId }) {
  return (
    <section className="relative w-full mx-auto mt-10 py-10 px-4 bg-gray-50 rounded-2xl flex items-center justify-center flex-col overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Large orb top-left */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-200/30 to-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Medium orb top-right */}
        <div className="absolute top-10 right-10 w-56 h-56 bg-gradient-to-br from-green-200/20 to-cyan-200/20 rounded-full blur-2xl" />
        {/* Small orb bottom-left */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-green-200/20 rounded-full blur-xl" />
      </div>

      {/* Section Title */}
      <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500 text-center mb-4 tracking-wide uppercase">
        How SikshyaSetu Works
      </h3>

      {/* Optional subtitle */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
      )}

      {/* Responsive YouTube Embed */}
      <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
