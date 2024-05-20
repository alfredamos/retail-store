import { ReactNode } from "react";
import { useAuth } from "../hooks/auth/useAuth";
import { Navigate } from "react-router-dom";

interface AdminRouteProp {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProp) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate replace to="/not-allowed" />;
  }

  return <>{children}</>;
}
