import useForm from "../hooks/useForm";
import { Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d{7,15}$/;

export default function FormDemo() {
  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: "", password: "", phone: "" },
    {
      email: { required: true, pattern: emailRegex, message: "Correo electrónico inválido" },
      password: { required: true, minLength: 6, message: "Mínimo 6 caracteres" },
      phone: { pattern: phoneRegex, message: "Teléfono inválido" }
    }
  );

  const onValid = async (vals) => {
    // Simula envío con delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert(`✅ Datos enviados correctamente:\n\nEmail: ${vals.email}\nTeléfono: ${vals.phone || 'No proporcionado'}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            📝 Formulario de Registro
          </h1>
          <p className="text-gray-600 text-lg">
            Demostración del hook useForm para manejo de formularios con validación
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

        {/* Demo Card */}
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
            Formulario de Registro
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onValid);
            }}
            className="space-y-6"
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                📧 Correo Electrónico *
              </label>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="tu@correo.com"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                🔒 Contraseña *
              </label>
              <input
                type="password"
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.password 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                📞 Teléfono (Opcional)
              </label>
              <input
                value={values.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+573001112233"
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:ring-indigo-200'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-white transition ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 hover:bg-indigo-600 shadow-lg'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Enviando...
                </div>
              ) : (
                '🚀 Enviar Formulario'
              )}
            </button>
          </form>

          {/* Preview */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl border">
            <h3 className="font-semibold text-gray-700 mb-2">Vista previa de datos:</h3>
            <pre className="text-sm text-gray-600 bg-white p-3 rounded border">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        </div>

      
      </div>
    </div>
  );
}
