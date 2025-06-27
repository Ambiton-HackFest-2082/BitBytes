import { Star, Quote } from "lucide-react";

export default function Testimonial() {
  const testimonials = [
    {
      name: "Anisha Sharma",
      role: "Grade 12 Student",
      company: "Kathmandu Model College",
      message:
        "SikshyaSetu helped me clear my doubts instantly. The interactive learning environment and instant feedback from teachers have significantly improved my understanding of complex topics.",
      image: "https://i.pravatar.cc/100?img=32",
      rating: 5,
      badge: "Top Performer"
    },
    {
      name: "Ravi Gautam",
      role: "Mathematics Teacher",
      company: "Sunshine Secondary School",
      message:
        "Connecting with my students has never been easier. The platform's collaborative features allow me to provide personalized guidance and track each student's progress effectively.",
      image: "https://i.pravatar.cc/100?img=13",
      rating: 5,
      badge: "Verified Educator"
    },
    {
      name: "Priya Kunwar",
      role: "Parent & Education Advocate",
      company: "Parent Community Leader",
      message:
        "I love seeing how engaged my daughter is with her studies now. SikshyaSetu makes learning fun and accessible, and I can monitor her progress in real-time.",
      image: "https://i.pravatar.cc/100?img=48",
      rating: 5,
      badge: "Verified Parent"
    },
    {
      name: "Dipesh Thapa",
      role: "Science Teacher",
      company: "Modern English School",
      message:
        "The platform's resource sharing and discussion features have revolutionized how I conduct my classes. Students are more engaged and collaborative than ever before.",
      image: "https://i.pravatar.cc/100?img=25",
      rating: 5,
      badge: "Verified Educator"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Testimonials
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Success Stories
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Hear from our students and teachers who have transformed their careers through our platform.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 mb-8">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-blue-600" />
              </div>
              
              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {testimonial.rating}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative italic">
                "{testimonial.message}"
              </blockquote>

              {/* Rating and Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {testimonials.slice(2, 4).map((testimonial, index) => (
            <div
              key={index + 2}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-16 h-16 text-teal-600" />
              </div>
              
              {/* Profile Section */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-teal-100"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-teal-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {testimonial.rating}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-teal-600 font-medium text-sm mb-1">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 text-sm mb-3">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 relative italic">
                "{testimonial.message}"
              </blockquote>

              {/* Rating and Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}