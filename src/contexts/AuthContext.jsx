// 📁 src/context/AuthContext.jsx
import { createContext, useContext, useMemo, useState, useEffect } from "react";

// 🧩 Crear el contexto
const AuthContext = createContext(undefined);

// 🧠 Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
};

// 🧾 Usuarios de ejemplo (puedes reemplazarlos por una API real)
const USERS = [
  {
    email: "usuario@demo.com",
    password: "1234",
    nombre: "Usuario Básico",
    rol: "usuario",
    permisos: ["ver_contenido"],
  },
  {
    email: "editor@demo.com",
    password: "1234",
    nombre: "Editora Demo",
    rol: "editor",
    permisos: ["ver_contenido", "editar_contenido"],
  },
  {
    email: "admin@demo.com",
    password: "1234",
    nombre: "Administrador Demo",
    rol: "admin",
    permisos: ["ver_contenido", "editar_contenido", "admin_access"],
  },
];

// 🧱 Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  // ♻️ Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) setUsuario(JSON.parse(storedUser));
  }, []);

  // 💾 Guardar o limpiar usuario en localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuario");
    }
  }, [usuario]);

  // 🔐 Iniciar sesión
  const login = (email, password) => {
    setError(null);
    const found = USERS.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (found) {
      setUsuario(found);
      setError(null);
      return true;
    } else {
      setUsuario(null);
      setError("❌ Credenciales inválidas");
      return false;
    }
  };

  // 🚪 Cerrar sesión
  const logout = () => {
    setUsuario(null);
    setError(null);
    localStorage.removeItem("usuario");
  };

  // 🧮 Funciones auxiliares
  const hasRole = (role) => usuario?.rol === role;
  const hasPermission = (perm) => usuario?.permisos?.includes(perm);

  // 🧩 Memorizar valores para optimizar renderizados
  const value = useMemo(
    () => ({
      usuario,
      login,
      logout,
      hasRole,
      hasPermission,
      error,
    }),
    [usuario, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




