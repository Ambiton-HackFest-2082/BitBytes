import "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StarBackground from "@/components/StarBackground.jsx";
import useMyContext from "@/hooks/useMyContext.jsx";

export default function Registration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });
  const { user, auth } = useMyContext();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      navigate(user.role === "student" ? "/student" : "/teacher");
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hasEmptyValues = () => {
    return Object.values(formData).some((value) => value === "");
  };

  const checkValidation = () => {
    if (hasEmptyValues()) {
      setErrorMsg("Please fill in all fields!");
      return false;
    }
    if (formData.password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long!");
      return false;
    }
    return true;
  };

  const resetValues = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkValidation()) return;

    setLoading(true);
    try {
      await auth.register(formData);
      setFormData(resetValues(formData));
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.statusText === "Conflict"
          ? "User with same email/username already exists!"
          : "Registration failed. Try again.";
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }

    setTimeout(() => setErrorMsg(""), 3000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-indigo-100 p-4 overflow-hidden">
      {/* ✨ Background stars - positioned first so it's behind everything */}
      <StarBackground />

      {/* Background decorative elements with animation */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        {/* Large gradient orb top left with slow movement */}
        <div className="absolute top-0 left-0 w-96 h-64 bg-gradient-to-br from-teal-200/30 to-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float-slow"></div>
        {/* Medium gradient orb top right with pulsing */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200/20 to-cyan-200/20 rounded-full blur-2xl animate-pulse-slow"></div>
        {/* Small gradient orb bottom left with slow movement */}
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-teal-200/20 to-pink-200/20 rounded-full blur-xl animate-float-slower"></div>
        {/* Dot grid overlay with slow fade animation */}
        <div className="absolute inset-0 opacity-10 animate-dot-fade" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.12'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Registration form - positioned on top */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative" style={{ zIndex: 10 }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Join SikshyaSetu</h1>
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

          {errorMsg && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-green-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
