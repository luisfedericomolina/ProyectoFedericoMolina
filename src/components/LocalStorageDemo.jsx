import useLocalStorage from "../hooks/useLocalStorage";
import { Link } from "react-router-dom";

export default function LocalStorageDemo() {
  const [name, setName] = useLocalStorage("demo_name", "");
  const [theme, setTheme] = useLocalStorage("demo_theme", "light");
  const [notifications, setNotifications] = useLocalStorage("demo_notifications", true);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 text-lg">
            Persistencia de datos en el navegador (la información no se borra cuando el usuario cierra o recarga la página).
          </p>
        </div>

        {/* Navegación */}
        <div className="flex justify-center mb-8">
          <Link 
            to="/panel-hooks" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ← Volver al Panel
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demo Card */}
          <div className="bg-white shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
              Información para el carrito de compras
            </h2>

            <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">
                  👤 Tu Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Escribe tu nombre aquí..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
                />
                <p className="text-sm text-gray-500">
                  Este nombre se guardará automáticamente
                </p>
              </div>

              {/* Theme Selector */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">
                  🎨 Tema de Preferencia
                </label>
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
                >
                  <option value="light">🌞 Claro</option>
                  <option value="dark">🌙 Oscuro</option>
                  <option value="auto">⚙️ Automático</option>
                </select>
              </div>

              {/* Notifications Toggle */}
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold">
                  🔔 Notificaciones
                </label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border">
                  <span>Recibir notificaciones</span>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full transition ${
                      notifications ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transition-transform ${
                        notifications ? 'transform translate-x-7' : 'transform translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className={`rounded-2xl p-8 transition-all ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : theme === 'auto'
              ? 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800'
              : 'bg-white text-gray-800'
          } shadow-2xl`}>
            <h2 className="text-2xl font-bold text-center mb-6">
              🎯 Vista Previa
            </h2>

            <div className="space-y-6 text-center">
              <div className="text-4xl">
                {theme === 'dark' ? '🌙' : theme === 'auto' ? '⚙️' : '🌞'}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">¡Hola!</h3>
                <p className="text-lg">
                  {name ? `Encantado de conocerte, ${name}! 👋` : 'Por favor, escribe tu nombre ☝️'}
                </p>
              </div>

              <div className="bg-opacity-50 rounded-xl p-4">
                <h4 className="font-semibold mb-2">Configuración actual:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Nombre:</strong> {name || 'No establecido'}</p>
                  <p><strong>Tema:</strong> {
                    theme === 'light' ? 'Claro 🌞' : 
                    theme === 'dark' ? 'Oscuro 🌙' : 
                    'Automático ⚙️'
                  }</p>
                  <p><strong>Notificaciones:</strong> {notifications ? 'Activadas 🔔' : 'Desactivadas 🔕'}</p>
                </div>
              </div>

              <div className="text-xs opacity-70 mt-8">
                <p>💡 <strong>Prueba:</strong> Recarga la página y verás que tus preferencias se mantienen</p>
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
}