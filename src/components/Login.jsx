// 📁 src/components/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login, error, usuario } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [success, setSuccess] = useState(false);

  // 🔁 Redirige si ya hay un usuario autenticado
  useEffect(() => {
    if (usuario) {
      setSuccess(true);
      setMensaje("✅ Inicio de sesión exitoso");
      const timer = setTimeout(() => navigate("/home"), 1200);
      return () => clearTimeout(timer);
    }
  }, [usuario, navigate]);

  // 🧩 Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email.trim(), password);

    if (ok) {
      setSuccess(true);
      setMensaje("✅ Inicio de sesión exitoso");
    } else {
      setSuccess(false);
      setMensaje("❌ Credenciales inválidas");
    }
  };

  return (
    <div className="login-container">
      {/* 🧩 Columna izquierda - Formulario */}
      <div className="login-form-section">
        <div className="card">
          <form onSubmit={handleSubmit} className="form">
            <h1 className="form-title">Iniciar sesión</h1>

            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="usuario@demo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* 🟢/🔴 Mensajes */}
            {(mensaje || error) && (
              <div
                className={`alert ${
                  success && !error ? "success" : "error"
                }`}
              >
                {mensaje || error}
              </div>
            )}

            <button type="submit" className="btn block">
              Entrar
            </button>

            {/* 💡 Usuarios de ejemplo */}
            <div className="hint">
              <p>Usuarios de ejemplo:</p>
              <ul>
                <li>usuario@demo.com / 1234</li>
                <li>editor@demo.com / 1234</li>
                <li>admin@demo.com / 1234</li>
              </ul>
            </div>
          </form>
        </div>
      </div>

      {/* 📸 Columna derecha - Imagen */}
      <div className="login-image-section">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Ilustración de tecnología moderna"
          className="login-image"
        />
      </div>
    </div>
  );
}




