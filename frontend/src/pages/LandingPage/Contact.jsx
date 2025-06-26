import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 mb-6 text-center">
          Have questions or feedback? Fill out the form below or reach us directly!
        </p>
        {submitted && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
            Thank you for reaching out! We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border rounded-lg p-2"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border rounded-lg p-2"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border rounded-lg p-2 min-h-[100px]"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition font-semibold"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center text-gray-500 text-sm">
          <div>Email: <a href="mailto:support@sikshyasetu.com" className="text-blue-600 underline">support@sikshyasetu.com</a></div>
          <div>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+977 9825808450</a></div>
        </div>
      </div>
    </div>
  );
}