import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearUsuario.css";

export default function CrearUsuario({ agregarUsuario }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [rol, setRol] = useState("usuario");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos simples
    if (!nombre || !correo || !password) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre,
      correo,
      rol,
      password,
    };

    agregarUsuario(nuevoUsuario);
    navigate("/"); // vuelve al home
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Crear nuevo usuario</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre completo"
            required
          />

          <label>Correo</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />

          <label>Rol</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="usuario">Usuario</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />

          <button type="submit" className="btn block">
            Guardar usuario
          </button>
        </form>
      </div>
    </div>
  );
}
