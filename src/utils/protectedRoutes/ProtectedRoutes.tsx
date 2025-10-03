// src/routes/ProtectedRoutes.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthCookie } from "../../hooks/useAuthCookies";

const ProtectedRoutes: React.FC = () => {
  const { getAuthCookie } = useAuthCookie();
  const isAuthorized = !!getAuthCookie();

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
