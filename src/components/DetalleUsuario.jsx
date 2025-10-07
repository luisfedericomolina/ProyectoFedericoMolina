import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DetalleUsuario.css";

export default function DetalleUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarUsuario = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data = await response.json();
      setUsuario(data);
    } catch (err) {
      setError("Error al cargar el usuario: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuario();
  }, [id]);

  // 💬 Acción para contactar
  const handleContactar = () => {
    if (usuario) {
      window.location.href = `mailto:${usuario.email}?subject=Contacto desde la app&body=Hola ${usuario.name}, te contacto desde nuestra aplicación.`;
    }
  };

  // 🌀 Estado de carga
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Cargando usuario...</span>
      </div>
    );

  // ⚠️ Error al cargar
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={cargarUsuario}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Reintentar
        </button>
      </div>
    );

  // ❌ Sin datos
  if (!usuario) return null;

  // ✅ Vista principal
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Aplicación de clases del CSS mejorado */}
        <article className="detail-card">
          {/* Encabezado */}
          <div className="detail-header">
            <h2>{usuario.name}</h2>
            <span className="text-gray-500">@{usuario.username}</span>
          </div>

          {/* Grilla de detalles */}
          <div className="detail-grid">
            {/* Contacto */}
            <div>
              <h4>📞 Contacto</h4>
              <p><strong>Email:</strong> {usuario.email}</p>
              <p><strong>Teléfono:</strong> {usuario.phone}</p>
              <p><strong>Sitio:</strong> {usuario.website}</p>
            </div>

            {/* Dirección */}
            <div>
              <h4>📍 Dirección</h4>
              <p>{usuario.address?.street} {usuario.address?.suite}</p>
              <p>{usuario.address?.city}, {usuario.address?.zipcode}</p>
              <p><strong>Geo:</strong> {usuario.address?.geo?.lat}, {usuario.address?.geo?.lng}</p>
            </div>

            {/* Empresa */}
            <div>
              <h4>🏢 Empresa</h4>
              <p><strong>Nombre:</strong> {usuario.company?.name}</p>
              <p><strong>Frase:</strong> {usuario.company?.catchPhrase}</p>
              <p><strong>BS:</strong> {usuario.company?.bs}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="detail-actions">
            <button onClick={handleContactar}>
              📧 Contactar a {usuario.name}
            </button>

            <a
              href={`mailto:${usuario.email}?subject=Contacto&body=Hola ${usuario.name}`}
            >
              ✉️ Enviar Email
            </a>

            <Link to="/fetch-demo" className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              ← Volver a la lista
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

