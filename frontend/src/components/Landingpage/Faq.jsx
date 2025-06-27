import { useState } from "react";
import { Phone, Mail, HelpCircle } from "lucide-react";

const faqData = {
  "Getting Started": [
    {
      question: "What is SikshyaSetu?",
      answer:
        "SikshyaSetu is a collaborative platform that connects students and teachers to enhance digital learning through discussions, Q&A, and shared resources.",
    },
    {
      question: "How do I register as a teacher or student?",
      answer:
        "Click the 'Get Started' or 'Register' button and select your role during the signup process. You'll need to provide basic information and verify your email address.",
    },
    {
      question: "Is SikshyaSetu free to use?",
      answer:
        "Yes, SikshyaSetu offers a free tier with basic features. We also have premium plans with advanced features for schools and institutions.",
    },
    {
      question: "What devices can I use to access SikshyaSetu?",
      answer:
        "SikshyaSetu works on all devices - computers, tablets, and smartphones. We have web access for both Android and iOS.",
    },
  ],
  "Platform Features": [
    {
      question: "Can I ask questions and get answers from teachers?",
      answer:
        "Absolutely. You can post questions, and teachers or even peers can respond and provide solutions. Questions can include text, images, and mathematical formulas.",
    },
    {
      question: "How does the discussion forum work?",
      answer:
        "Our discussion forum allows threaded conversations where students can ask questions, share resources, and engage in academic discussions with moderation from teachers.",
    },
    {
      question: "Can I share files and resources?",
      answer:
        "Yes, you can upload and share various file types including PDFs, images, documents, and presentations. All shared resources are organized by subject and grade level.",
    },
    {
      question: "Is there a messaging system?",
      answer:
        "SikshyaSetu includes private messaging between students and teachers, group messaging for class discussions, and announcement features for important updates.",
    }
  ],
 
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Getting Started");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
    const subject = encodeURIComponent("Support Request from FAQ");
    const body = encodeURIComponent("Hi Team,\n\nI have a question regarding...");
  
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  
    window.open(gmailUrl, '_blank');
  };

  const tabs = [
    { name: "Getting Started", icon: "🚀" },
    { name: "Platform Features", icon: "📚" },
    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            FAQ
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about SikshyaSetu platform
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab.name
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {faqData[activeTab].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center transition-all duration-200 ${
                          openIndex === index
                            ? "bg-blue-500 border-blue-500 rotate-45"
                            : "hover:border-blue-400"
                        }`}
                      >
                        <span
                          className={`text-xl font-light ${
                            openIndex === index ? "text-white" : "text-gray-500"
                          }`}
                        >
                          +
                        </span>
                      </div>
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <div className="h-px bg-gray-100 mb-4"></div>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Help Center Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Need More Help?
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Get in touch with our support team through any of these channels:
              </p>

              <div className="space-y-4">
                <div 
                  onClick={handlePhoneClick}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-blue-700">
                      Phone Call
                    </h4>
                    <p className="text-gray-600 text-sm">9816317861</p>
                  </div>
                </div>

                <div 
                  onClick={handleWhatsAppClick}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-green-50 transition-colors duration-200 group"
                >
                  <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-green-700">
                      WhatsApp
                    </h4>
                    <p className="text-gray-600 text-sm">9816317861</p>
                  </div>
                </div>

                <div 
                  onClick={handleEmailClick}
                  className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors duration-200 group"
                >
                  <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm group-hover:text-purple-700">
                      Email
                    </h4>
                    <p className="text-gray-600 text-sm break-all">
                      sikshyasetusupport@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleContactSupport}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}