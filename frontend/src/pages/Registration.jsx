import "./Login.jsx";
import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
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
      if (user.role === "student") {
        navigate("/student");
      } else {
        navigate("/teacher");
      }
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
    const valid = checkValidation();
    if (valid) {
      setLoading(true);
      try {
        await auth.register(formData);
        setFormData(resetValues(formData));
        // navigate('/auth/verify-email')
      } catch (error) {
        console.error(error);
        const errMsg =
          error.response.statusText === "Conflict"
            ? "User with same email/username already exits!"
            : "";
        setErrorMsg(errMsg);
      } finally {
        setLoading(false);
      }
    }

    //disposing of error message fter 3s
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-indigo-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">Join SikshyaSetu</h1>
          <p className="text-gray-500 text-sm">
            Create your account as Student or Teacher
          </p>
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
            <p className="text-[12px] text-red-600 md:col-span-2">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-dark-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-green-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
