import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        {/* 🔹 Información institucional */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-100">
            Sistema de Gestión de Usuarios — Proyecto CRUD React
          </p>
          <p className="text-gray-400">
            © {new Date().getFullYear()} Desarrollado con React + Vite
          </p>
        </div>

        {/* 🔹 Enlaces rápidos */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-gray-400">
          <a
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Inicio
          </a>
          <a
            href="/usuarios"
            className="hover:text-white transition-colors duration-200"
          >
            Usuarios
          </a>
          <a
            href="/login"
            className="hover:text-white transition-colors duration-200"
          >
            Iniciar sesión
          </a>
        </div>
      </div>

      {/* 🔹 Línea inferior */}
      <div className="text-center text-xs text-gray-500 mt-4">
        Proyecto académico — Universidad / Entidad Institucional · Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;

