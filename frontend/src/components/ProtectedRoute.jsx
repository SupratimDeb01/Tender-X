import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-slate-50 text-slate-600 font-medium">Loading...</div>;
  }

  // No user -> go back to Landing Page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If role is passed, restrict by role
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
