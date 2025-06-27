import { Phone, Mail } from "lucide-react";

export default function ContactUs() {
  const handlePhoneClick = () => {
    window.open('tel:9816317861', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/9779816317861', '_blank');
  };

  const handleEmailClick = () => {
    const email = "sikshyasetusupport@gmail.com";
    const subject = encodeURIComponent("Hello from SikshyaSetu");
    const body = encodeURIComponent("Hi, I wanted to reach out to you regarding...");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleContactSupport = () => {
    const email = "sikshyasetusupport@gmail.com";
    const subject = encodeURIComponent("Support Request from Contact Page");
    const body = encodeURIComponent("Hi Team,\n\nI have a question regarding...");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-8 border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-8 text-center">
          Get in touch with our support team through any of these channels:
        </p>

        <div className="space-y-4">
          <div onClick={handlePhoneClick} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 group">
            <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700">Phone Call</h4>
              <p className="text-gray-600 text-sm">9816317861</p>
            </div>
          </div>

          <div onClick={handleWhatsAppClick} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-green-50 group">
            <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200">
              <Phone className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-green-700">WhatsApp</h4>
              <p className="text-gray-600 text-sm">9816317861</p>
            </div>
          </div>

          <div onClick={handleEmailClick} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 group">
            <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-sm group-hover:text-purple-700">Email</h4>
              <p className="text-gray-600 text-sm break-all">sikshyasetusupport@gmail.com</p>
            </div>
          </div>
        </div>

        <button onClick={handleContactSupport} className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg">
          Contact Support
        </button>
      </div>
    </div>
  );
}