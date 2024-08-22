import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) {
    return <Navigate to="/client-login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
