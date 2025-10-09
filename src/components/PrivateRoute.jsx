import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  // Esperar mientras se verifica autenticación
  if (cargando) {
    return <div>Cargando...</div>;
  }

  // No hay usuario: redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && usuario.rol !== requiredRole) {
   
    console.warn(`Acceso denegado: se requiere rol ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

    return children;
}





