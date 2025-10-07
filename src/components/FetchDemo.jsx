import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function FetchDemo() {
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            🌐 Manejo de peticiones HTTP
          </h1>
          <p className="text-gray-600 text-lg">
            Demostración del hook useFetch para manejar peticiones HTTP
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <Link
            to="/"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ← Volver al Home
          </Link>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-teal-600">
              Usuarios desde JSON Placeholder
            </h2>
            <button
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition font-semibold"
              onClick={refetch}
              disabled={loading}
            >
              {loading ? "🔄 Cargando..." : "🔄 Recargar"}
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
              <span className="ml-3 text-gray-600 text-lg">Cargando usuarios...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-red-500 text-4xl mb-3">⚠️</div>
              <h3 className="text-red-700 font-semibold text-lg mb-2">Error al cargar datos</h3>
              <p className="text-red-600">{error}</p>
              <button
                onClick={refetch}
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && Array.isArray(data) && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.map((user) => (
                <div
                  key={user.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-lg transition"
                >
                  <div className="flex items-start mb-3">
                    <div className="bg-teal-100 text-teal-800 rounded-full p-2 mr-3">👤</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Teléfono:</strong> {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Link
                      to={`/detalle-usuario/${user.id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm flex-1 text-center"
                    >
                      Ver Detalles
                    </Link>
                    <button
                      onClick={() =>
                        alert(`Contactando a: ${user.name}\nEmail: ${user.email}`)
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm flex-1"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && Array.isArray(data) && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 text-center">
                <strong>{data.length}</strong> usuarios cargados correctamente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
