import { FaGraduationCap, FaChartLine, FaClock, FaUsers } from "react-icons/fa";

export default function Feature() {
  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-blue-200/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-gradient-to-br from-pink-200/40 to-purple-100/30 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 left-1/2 w-80 h-32 bg-gradient-to-r from-blue-100/30 to-purple-100/30 rounded-full blur-2xl -translate-x-1/2 -z-10"></div>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      {/* Badge */}
      <div className="flex justify-center mb-4">
        <span className="px-6 py-2 rounded-full bg-teal-100 text-teal-700 font-medium text-base shadow-sm">
          Why Choose SikshyaSetu?
        </span>
      </div>

      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center mb-4">
        Your Path to Academic Excellence
      </h2>
      <p className="text-lg text-gray-500 text-center mb-12 max-w-2xl mx-auto">
        Experience a comprehensive learning ecosystem designed for your success
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="group bg-cyan-50 rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-cyan-100">
          <div className="w-12 h-12 flex items-center justify-center bg-cyan-400 rounded-lg mb-6 shadow-md">
            <FaGraduationCap className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Expert-Led Instruction</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Learn from Nepal's top educators and mentors</li>
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Gain insights from successful past scholars</li>
          </ul>
        </div>
        {/* Card 2 */}
        <div className="group bg-purple-50 rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-purple-100">
          <div className="w-12 h-12 flex items-center justify-center bg-purple-500 rounded-lg mb-6 shadow-md">
            <FaChartLine className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Learning System</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Practice with real exam questions & solutions</li>
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Track progress with detailed analytics</li>
          </ul>
        </div>
        {/* Card 3 */}
        <div className="group bg-yellow-50 rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-yellow-100">
          <div className="w-12 h-12 flex items-center justify-center bg-yellow-400 rounded-lg mb-6 shadow-md">
            <FaClock className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Learning</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Study at your own pace and schedule</li>
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Access courses on any device, anywhere</li>
          </ul>
        </div>
        {/* Card 4 */}
        <div className="group bg-pink-50 rounded-2xl shadow-lg p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-pink-100">
          <div className="w-12 h-12 flex items-center justify-center bg-pink-400 rounded-lg mb-6 shadow-md">
            <FaUsers className="text-white text-2xl" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Active Community</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Get instant help from peers & mentors</li>
            <li className="flex items-center text-gray-700"><span className="text-green-500 mr-2">✔</span>Regular live Q&A sessions & discussions</li>
          </ul>
        </div>
      </div>
    </section>
  );
}