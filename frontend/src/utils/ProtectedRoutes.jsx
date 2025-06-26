import useMyContext from "@/hooks/useMyContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, loading } = useMyContext();

  if (loading) {
    return;
  }


  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
