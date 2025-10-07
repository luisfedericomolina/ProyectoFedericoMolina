import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const PanelHooks = () => {
  const { usuario } = useAuth();

  const hookCards = [
    {
      title: "Contador Interactivo",
      path: "/counter-demo",
      color: "blue",
      icon: "🔢"
    },
    {
      title: "Carrito de Compras",
      path: "/localstorage-demo", 
      color: "purple",
      icon: "🛒"
    },
    {
      title: "Manejo de Peticiones HTTP",
      path: "/fetch-demo",
      color: "teal",
      icon: "🌐"
    },
    {
      title: "Formulario de Registro",
      path: "/form-demo",
      color: "indigo",
      icon: "📝"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        hover: 'hover:bg-blue-100',
        button: 'bg-blue-500 hover:bg-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        hover: 'hover:bg-purple-100',
        button: 'bg-purple-500 hover:bg-purple-600'
      },
      teal: {
        bg: 'bg-teal-50',
        border: 'border-teal-200',
        text: 'text-teal-700',
        hover: 'hover:bg-teal-100',
        button: 'bg-teal-500 hover:bg-teal-600'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        text: 'text-indigo-700',
        hover: 'hover:bg-indigo-100',
        button: 'bg-indigo-500 hover:bg-indigo-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      {/* Header de la página */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Panel de Hooks Personalizados
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Explora nuestros hooks personalizados de React con demostraciones interactivas completas.
        </p>
      </div>

       {/* Grid de Hooks */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
        {hookCards.map((hook, index) => {
          const color = getColorClasses(hook.color);
          return (
            <div 
              key={index}
              className={`${color.bg} ${color.border} border-2 rounded-2xl p-8 transition-all duration-300 ${color.hover} transform hover:-translate-y-1 hover:shadow-xl`}
            >
              {/* Contenido de la card */}
              <div className="text-center">
                <div className="text-5xl mb-4">
                  {hook.icon}
                </div>
                <h2 className={`text-2xl font-bold ${color.text} mb-6`}>
                  {hook.title}
                </h2>
                
                {/* Botón de acción */}
                <Link
                  to={hook.path}
                  className={`${color.button} text-white w-full py-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-lg`}
                >
                  Entrar
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Información adicional */}
      <div className="mt-12 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 inline-block max-w-2xl">
          <p className="text-yellow-800 font-semibold">
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default PanelHooks;