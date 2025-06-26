export default function VideoDisplay({ title, videoId }) {
  return (
    <div className="w-full max-w-4xl mx-auto my-10 p-4 bg-blue-200 rounded-lg shadow-lg mb-4">
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {title}
        </h2>
      )}

      {/* Responsive YouTube embed */}
      <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
