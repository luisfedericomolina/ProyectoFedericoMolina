// 📁 src/components/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  // ⏳ Esperar mientras se verifica autenticación (opcional)
  if (cargando) {
    return <div>Cargando...</div>;
  }

  // 🔒 No hay usuario → redirigir al login
  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🧩 Ruta con rol restringido → validar
  if (requiredRole && usuario.rol !== requiredRole) {
    // Puedes enviar un toast en lugar de un alert si tienes ese sistema
    console.warn(`Acceso denegado: se requiere rol ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

  // ✅ Si todo es correcto → renderiza el contenido protegido
  return children;
}





