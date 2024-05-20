import { ReactNode } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProp {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProp) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate replace to="/must-login" />;
  }

  return <>{children}</>;
}
