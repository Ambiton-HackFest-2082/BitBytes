import './Login.jsx';
import { Link } from 'react-router-dom';

import { useState } from 'react';

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Submitted:', formData);
    // Add API call to register user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Join EduConnect</h1>
          <p className="text-gray-500 text-sm">Create your account as Student or Teacher</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">

            <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 text-gray-700"
          >
            <option value="student">👨‍🎓 Student</option>
            <option value="teacher">👩‍🏫 Teacher</option>
          </select>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border rounded-lg p-2"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-2"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700 transition"
          >
            SikshyaSetu
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-dark-600">
          Already have an account? <Link to="/auth/login" className="text-blue-500 underline">Login</Link>

        </p>
      </div>
    </div>
  );
}
