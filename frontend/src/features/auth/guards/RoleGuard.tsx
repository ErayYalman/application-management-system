import { Navigate, Outlet } from "react-router-dom";
import { UserResponseRoleEnum } from "../../../api/generated";
import { useAuth } from "../context/AuthContext";

interface RoleGuardProps {
  allowedRoles: UserResponseRoleEnum[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}