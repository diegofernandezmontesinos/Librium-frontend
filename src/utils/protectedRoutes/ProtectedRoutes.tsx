import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStorage } from "../../hooks/useAuthCookies";

const ProtectedRoutes: React.FC = () => {
  const { getAuth } = useAuthStorage();
  const isAuthorized = getAuth();

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
