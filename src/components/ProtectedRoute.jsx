import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, requiredRole, requiredRoles }) {
  const { usuario } = useAuth();

  // Si no hay usuario, redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles requeridos
  if (requiredRoles && Array.isArray(requiredRoles)) {
    if (!requiredRoles.includes(usuario.rol)) {
      return <Navigate to="/" replace />;
    }
  }
  
  // Si se especifica un rol requerido individual
  else if (requiredRole && usuario.rol !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}