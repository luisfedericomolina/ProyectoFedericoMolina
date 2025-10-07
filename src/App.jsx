// 📁 src/App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// 🧩 Componentes principales
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Users from "./pages/Users";
import NewUser from "./components/NewUser";
import EditUser from "./components/EditUser";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import PanelHooks from "./pages/PanelHooks";

import CounterDemo from './components/CounterDemo'; 
import FetchDemo from './components/FetchDemo';     
import FormDemo from './components/FormDemo';  
import LocalStorageDemo from './components/LocalStorageDemo'; 
import DetalleUsuario from './components/DetalleUsuario';

// 🔐 Contexto de autenticación
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  // 👥 Estado inicial con usuarios de ejemplo
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Admin", correo: "admin@demo.com", rol: "admin", password: "1234" },
    { id: 2, nombre: "Editor", correo: "editor@demo.com", rol: "editor", password: "1234" },
    { id: 3, nombre: "Usuario", correo: "usuario@demo.com", rol: "usuario", password: "1234" },
  ]);

  // 🔔 Estado para mensajes tipo toast
  const [toastMessage, setToastMessage] = useState("");

  // ➕ Crear nuevo usuario
  const crearUsuario = ({ nombre, correo, rol, password }) => {
    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      correo: correo.trim(),
      rol,
      password,
    };
    setUsuarios((prev) => [...prev, nuevo]);
    setToastMessage(`✅ Usuario "${nombre}" creado correctamente`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // ✏️ Actualizar usuario existente
  const actualizarUsuario = (id, { nombre, correo, rol }) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, nombre, correo, rol } : u))
    );
    setToastMessage(`✏️ Usuario "${nombre}" actualizado`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // ❌ Eliminar usuario
  const borrarUsuario = (id) => {
    const eliminado = usuarios.find((u) => u.id === id);
    if (confirm(`¿Deseas eliminar a ${eliminado?.nombre}?`)) {
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
      setToastMessage(`🗑️ Usuario "${eliminado?.nombre}" eliminado`);
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  // 🔄 Cambiar rol de usuario
  const cambiarRol = (id, nuevoRol) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (usuario) {
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u))
      );
      setToastMessage(`🎭 Rol de "${usuario.nombre}" cambiado a "${nuevoRol}"`);
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        {/* 🔝 Barra superior persistente */}
        <Header />

        {/* 🔔 Notificación visual */}
        <Toast message={toastMessage} />

        {/* 🌐 Definición de rutas */}
        <Routes>
          {/* 🔓 Ruta pública: login */}
          <Route path="/login" element={<Login />} />

          {/* 🏠 Página principal protegida */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* 🧭 Panel de Hooks */}
          <Route
            path="/panel-hooks"
            element={
              <PrivateRoute>
                <PanelHooks />
              </PrivateRoute>
            }
          />

          {/* 👥 Gestión de usuarios (TUS USUARIOS LOCALES) */}
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <Users
                  usuarios={usuarios}
                  borrarUsuario={borrarUsuario}
                  cambiarRol={cambiarRol}
                />
              </PrivateRoute>
            }
          />

          {/* 👑 Crear usuario — solo admin */}
          <Route
            path="/nuevo-usuario"
            element={
              <PrivateRoute requiredRole="admin">
                <NewUser crearUsuario={crearUsuario} />
              </PrivateRoute>
            }
          />

          {/* ✏️ Editar usuario — solo editor O admin */}
          <Route
            path="/editar-usuario/:id"
            element={
              <PrivateRoute requiredRoles={["admin", "editor"]}>
                <EditUser
                  usuarios={usuarios}
                  actualizarUsuario={actualizarUsuario}
                />
              </PrivateRoute>
            }
          />

          {/* 🎯 Demostraciones de Hooks */}
          <Route path="/counter-demo" element={<CounterDemo />} />
          <Route path="/fetch-demo" element={<FetchDemo />} />
          <Route path="/form-demo" element={<FormDemo />} />
          <Route path="/localstorage-demo" element={<LocalStorageDemo />} />
          
          {/* 👤 DETALLE USUARIO JSON PLACEHOLDER */}
          <Route path="/detalle-usuario/:id" element={<DetalleUsuario />} />

          {/* 🚫 Redirección por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}








