import { Phone, Mail } from "lucide-react";
import contImg from "@/assets/cont.svg";

export default function ContactUs() {
  const phoneNumber = "9816317861";
  const email = "sikshyasetusupport@gmail.com";

  const handlePhoneClick = () => {
    window.open(`tel:${phoneNumber}`, "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/977${phoneNumber}`, "_blank");
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent("Hello from SikshyaSetu");
    const body = encodeURIComponent("Hi, I wanted to reach out to you regarding...");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent("Support Request from Contact Page");
    const body = encodeURIComponent("Hi Team,\n\nI have a question regarding...");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center py-5 px-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row overflow-hidden">
        
        {/* Illustration Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center p-8">
          <img
            src={contImg}
            alt="Contact Illustration"
            className="max-w-md w-full h-auto"
          />
        </div>

        {/* Contact Info Section */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Contact Us
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Reach out to our support team through any of the following methods:
          </p>

          <div className="space-y-4">
            {/* Phone Call */}
            <div
              onClick={handlePhoneClick}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-green-100 group transition"
            >
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-800 group-hover:text-green-700">
                  Phone Call
                </h4>
                <p className="text-sm text-gray-600">{phoneNumber}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div
              onClick={handleWhatsAppClick}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-green-100 group transition"
            >
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-800 group-hover:text-green-700">
                  WhatsApp
                </h4>
                <p className="text-sm text-gray-600">{phoneNumber}</p>
              </div>
            </div>

            {/* Email */}
            <div
              onClick={handleEmailClick}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-teal-100 group transition"
            >
              <div className="bg-teal-100 p-2 rounded-lg group-hover:bg-teal-200">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-800 group-hover:text-teal-700">
                  Email
                </h4>
                <p className="text-sm text-gray-600 break-all">{email}</p>
              </div>
            </div>
          </div>

          {/* Contact Support Button */}
          <button
            onClick={handleContactSupport}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-medium shadow hover:from-green-700 hover:to-teal-700 hover:shadow-lg transition"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
