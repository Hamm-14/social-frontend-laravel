import jwtDecode from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { DecodedToken } from "./types/token";

const useAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
   return true;
  }
  return false;
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
};

export default ProtectedRoutes;
