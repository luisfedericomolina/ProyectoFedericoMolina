import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Home.css";

export default function Home() {
  const { usuario } = useAuth();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Bienvenido al Proyecto de CRUD</h1>

        {usuario && (
          <p className="home-subtitle">
            Hola, <strong>{usuario.nombre}</strong> — Rol: <em>{usuario.rol}</em> 
          </p>
        )}

        <div className="home-links">
          {/* 🔹 Corregido: ahora apunta a /panel-hooks */}
          <NavLink to="/panel-hooks" className="home-link">
            Panel de Hooks
          </NavLink>

          <NavLink to="/usuarios" className="home-link">
            Gestión de Usuarios
          </NavLink>

          {usuario?.rol === "admin" && (
            <NavLink to="/nuevo-usuario" className="home-link">
              Crear Usuario
            </NavLink>
          )}
        </div>

        <p className="home-footer">
          Sistema CRUD con autenticación y roles — desarrollado con React + Context API
        </p>
      </div>
    </div>
  );
}
