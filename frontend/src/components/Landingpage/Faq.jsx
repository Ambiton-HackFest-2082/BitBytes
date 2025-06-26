import { useState } from "react";

const faqs = [
  {
    question: "What is SikshyaSetu?",
    answer:
      "SikshyaSetu is a collaborative platform that connects students and teachers to enhance digital learning through discussions, Q&A, and shared resources.",
  },
  {
    question: "Who can use this platform?",
    answer:
      "Students, teachers, and parents can all use SikshyaSetu. It’s designed for both classroom support and independent learning.",
  },
 
  {
    question: "Can I ask questions and get answers from teachers?",
    answer:
      "Absolutely. You can post questions, and teachers or even peers can respond and provide solutions.",
  },
  {
    question: "How do I register as a teacher or student?",
    answer:
      "Click the 'Get Started' or 'Register' button and select your role during the signup process.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-blue-200 py-12 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 bg-white">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md p-2 shadow-sm hover:shadow-md transition duration-200"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left font-medium text-gray-800"
            >
              <span>{faq.question}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>

            {openIndex === index && (
              <p className="mt-3 text-gray-600 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
