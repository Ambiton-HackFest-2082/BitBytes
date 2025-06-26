/* auth.controller.js */
import axiosInstance from "@/helper/axios";
import { toast } from "sonner";

const useAuth = ({ setUser, setLoading }) => {
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/users/get-current-user");
      setUser(response.data.data);
    } catch (error) {
      console.error(
        "Error verifying authentication",
        error.response?.data || error.message
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/users/login", { email, password });
      setUser(res.data.data);
      toast.success("Login Successful!");
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const res = await axiosInstance.post("/users/register", credentials);
      setUser(res.data.data);
      toast.success("Registration Successful!");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    checkAuthStatus,
    login,
    register,
    logout,
  };
};

export default useAuth;
