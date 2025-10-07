import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

export default function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="hdr">
      <div className="hdr__inner">
        <h1 className="brand">Proyecto de CRUD</h1>

        <nav className={`nav ${!usuario ? "nav--center" : ""}`}>
          {usuario ? (
            <>
              {/* 👤 Información del usuario logueado */}
              <span className="user-info">
                👤 {usuario.nombre} <small>({usuario.rol})</small>
              </span>

              {/* 🏠 Enlace al Home */}
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `link ${isActive ? "active" : ""}`
                }
              >
                Inicio
              </NavLink>

              {/* 🧭 Panel de Hooks */}
              <NavLink
                to="/panel-hooks"
                className={({ isActive }) =>
                  `link ${isActive ? "active" : ""}`
                }
              >
                Panel de Hooks
              </NavLink>

              {/* 👥 Gestión de usuarios */}
              <NavLink
                to="/usuarios"
                className={({ isActive }) =>
                  `link ${isActive ? "active" : ""}`
                }
              >
                Gestión de Usuarios
              </NavLink>

              {/* Crear usuario (solo admin) */}
              {usuario.rol === "admin" && (
                <NavLink
                  to="/nuevo-usuario"
                  className={({ isActive }) =>
                    `link ${isActive ? "active" : ""}`
                  }
                >
                  Crear usuario
                </NavLink>
              )}

              {/* 🔓 Cerrar sesión */}
              <button onClick={handleLogout} className="btn logout">
                Cerrar sesión
              </button>
            </>
          ) : (
            // 🔹 Cuando no hay sesión iniciada
            <span className="login-text">Iniciar sesión</span>
          )}
        </nav>
      </div>
    </header>
  );
}




