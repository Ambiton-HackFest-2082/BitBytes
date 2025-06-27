export default function VideoDisplay({ title, videoId }) {
  return (
    <section className="relative w-full max-w-4xl mx-auto my-10 py-10 px-4 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Background decorative elements (match Hero.jsx) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        {/* Large gradient orb top left */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-blue-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        {/* Medium gradient orb top right */}
        <div className="absolute top-10 right-10 w-56 h-56 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-2xl"></div>
        {/* Small gradient orb bottom left */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-xl"></div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
        }}></div>
      </div>

      {/* Section Title */}
      <h3 className="text-3xl font-extrabold text-purple-600 text-center mb-4 tracking-wide uppercase">How SiksyaSetu Works</h3>

      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {title}
        </h2>
      )}

      {/* Responsive YouTube embed */}
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-gray-50">
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
