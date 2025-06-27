import { Link, useNavigate } from "react-router-dom";
import "./Registration.jsx";
import { useEffect, useState } from "react";
import useMyContext from "@/hooks/useMyContext.jsx";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const {user, auth } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(formData.email, formData.password);
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response.statusText === "Unauthorized"
          ? "Password is incorrect!"
          : "User with such email does not exists!";
      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-teal-50 to-indigo-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">SikshyaSetu</h1>
          <p className="text-gray-500 text-sm">
            A place for Teachers & Students to grow together
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg p-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2"
            onChange={handleChange}
            required
          />
          {errorMsg && (
            <p className="text-[12px] text-red-600 md:col-span-2">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg p-2 hover:bg-green-700 transition"
            disabled={loading}
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-green-500 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
