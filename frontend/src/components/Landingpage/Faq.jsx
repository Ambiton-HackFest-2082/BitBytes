import { useState } from "react";
import { HelpCircle } from "lucide-react";

const faqData = {
  "Getting Started": [
    
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
    },
  ],
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("Getting Started");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const tabs = [
    { name: "Getting Started", icon: "🚀" },
    { name: "Platform Features", icon: "📚" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f4ff] flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            FAQ
          </div>
          <h1 className="text-4xl font-bold text-teal-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-teal-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about SikshyaSetu platform
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
                setOpenIndex(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab.name
                  ? "bg-green-100 shadow-lg"
                  : "bg-white text-teal-600 hover:bg-teal-50 shadow-sm"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="w-full max-w-4xl mx-auto space-y-4">
          {faqData[activeTab].map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-teal-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left p-6 hover:bg-teal-50 transition-colors duration-200"
              >
                <span className="font-semibold text-teal-800 pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full border-2 border-teal-300 flex items-center justify-center transition-all duration-200 ${
                      openIndex === index
                        ? "bg-green-500 border-green-500 rotate-45"
                        : "hover:border-green-400"
                    }`}
                  >
                    <span
                      className={`text-xl font-light ${
                        openIndex === index ? "text-white" : "text-teal-500"
                      }`}
                    >
                      +
                    </span>
                  </div>
                </span>
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-6 max-h-[300px] overflow-y-auto transition-all duration-300 ease-in-out">
                  <div className="h-px bg-teal-100 mb-4"></div>
                  <p className="text-teal-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}