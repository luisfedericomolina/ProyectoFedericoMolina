// 📁 src/pages/Users.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Users = ({ usuarios = [], borrarUsuario }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const puedeCrear = usuario?.rol === "admin";
  const puedeEditar = usuario?.rol === "admin" || usuario?.rol === "editor";
  const puedeEliminar = usuario?.rol === "admin";

  // Función para manejar el cambio de cuenta
  const handleCambiarCuenta = () => {
    if (usuario) {
      // Si hay usuario logueado, cerrar sesión primero
      if (window.confirm("¿Estás seguro de que deseas cambiar de cuenta? Se cerrará la sesión actual.")) {
        logout();
        navigate("/login");
      }
    } else {
      // Si no hay usuario, ir directamente al login
      navigate("/login");
    }
  };

  // Función para manejar el clic en Editar
  const handleEditarClick = (user) => {
    if (!usuario) {
      alert("⚠️ Debes iniciar sesión para editar usuarios.");
      navigate("/login");
    } else if (usuario.rol === "usuario") {
      alert("⚠️ No puedes editar, inicia sesión con un rol diferente.");
      navigate("/login");
    } else if (puedeEditar) {
      navigate(`/editar-usuario/${user.id}`);
    } else {
      alert("⚠️ No tienes permisos para editar usuarios.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* 🧭 Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              👥 Gestión de Usuarios
            </h1>
            <p className="text-gray-600 mt-2">
              Administra los usuarios del sistema
            </p>
          </div>

          <div className="flex flex-col items-end space-y-3">
            {/* ✅ Botón crear (solo admin) */}
            {puedeCrear && (
              <Link
                to="/nuevo-usuario"
                className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition font-semibold"
              >
                + Crear Usuario
              </Link>
            )}

            {/* 🔹 Información del usuario logueado */}
            {usuario && (
              <div className="text-sm text-gray-600 text-right">
                <p>Conectado como: <strong>{usuario.nombre}</strong></p>
                <p>Rol: <span className={`px-2 py-1 rounded text-xs ${
                  usuario.rol === "admin" ? "bg-red-100 text-red-800" :
                  usuario.rol === "editor" ? "bg-blue-100 text-blue-800" :
                  "bg-green-100 text-green-800"
                }`}>{usuario.rol}</span></p>
              </div>
            )}

            {/* 🔹 Botón único para cambiar cuenta/iniciar sesión */}
            <button
              onClick={handleCambiarCuenta}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition font-semibold"
            >
              {usuario ? "🔐 Cambiar Cuenta" : "Iniciar sesión"}
            </button>
          </div>
        </div>

        {/* 🧾 Tabla de usuarios */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-teal-600">
              Usuarios Registrados
            </h2>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {usuarios.length} usuarios
            </span>
          </div>

          {usuarios.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <p className="text-gray-500 text-xl mb-4">
                No hay usuarios registrados
              </p>
              {puedeCrear && (
                <Link
                  to="/nuevo-usuario"
                  className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition inline-block"
                >
                  Crear primer usuario
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Usuario
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Correo
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Rol
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-4">
                        <p className="font-semibold text-gray-800">{u.nombre}</p>
                        <p className="text-sm text-gray-500">ID: {u.id}</p>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{u.correo}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.rol === "admin"
                              ? "bg-red-100 text-red-800"
                              : u.rol === "editor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {u.rol}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-2">
                          {/* ✏️ Botón editar */}
                          <button
                            onClick={() => handleEditarClick(u)}
                            className={`px-4 py-2 rounded-lg transition text-sm ${
                              puedeEditar
                                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                : "bg-gray-400 text-white cursor-not-allowed"
                            }`}
                            disabled={!puedeEditar}
                          >
                            Editar
                          </button>

                          {/* 🗑️ Botón eliminar */}
                          {puedeEliminar && (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    `¿Estás seguro de eliminar a ${u.nombre}?`
                                  )
                                ) {
                                  borrarUsuario(u.id);
                                }
                              }}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm"
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ℹ️ Información de permisos */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            Información de permisos:
          </h3>
          <ul className="text-sm text-blue-700 list-disc list-inside">
            <li>
              <strong>Admin:</strong> Puede crear, editar y eliminar usuarios.
            </li>
            <li>
              <strong>Editor:</strong> Puede editar usuarios.
            </li>
            <li>
              <strong>Usuario:</strong> Solo puede ver la lista de usuarios.
            </li>
            {usuario && (
              <li className="mt-2 font-semibold">
                Tu rol actual: <span className="text-green-600">{usuario.rol}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;





