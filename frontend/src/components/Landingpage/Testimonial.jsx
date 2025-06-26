export default function Testimonial() {
  const testimonials = [
    {
      name: "Anisha Sharma",
      role: "Student, Grade 12",
      message:
        "SikshyaSetu helped me clear my doubts instantly. It's like having a classroom in my pocket!",
      image: "https://i.pravatar.cc/100?img=32",
    },
    {
      name: "Ravi Gautam",
      role: "Math Teacher",
      message:
        "Connecting with my students has never been easier. It’s an essential tool for modern education.",
      image: "https://i.pravatar.cc/100?img=13",
    },
    {
      name: "Priya Kunwar",
      role: "Parent",
      message:
        "I love seeing how engaged my daughter is. SikshyaSetu makes learning fun and accessible.",
      image: "https://i.pravatar.cc/100?img=48",
    },
  ];

  return (
    <div className="bg-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">What People Are Saying</h2>
        <p className="text-gray-600 mt-2">
          Real stories from students, teachers, and parents using SikshyaSetu.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-left hover:shadow-xl transition duration-300"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
