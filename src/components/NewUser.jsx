import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";

export default function NewUser({ crearUsuario }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "usuario",
    password: "",
  });

  // Maneja cambios en todos los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.password.trim()) {
      alert("⚠️ Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Crea usuario y redirige a Gestión de Usuarios
    crearUsuario(formData);
    alert("✅ Usuario creado correctamente");
    navigate("/usuarios"); // ← Cambiado de "/" a "/usuarios"
  };

  return (
    <div className="container">
      <section className="card">
        <div className="card__hdr">
          <h2>Crear nuevo usuario</h2>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej. Ana Torres"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Correo electrónico:</label>
          <input
            type="email"
            name="correo"
            placeholder="Ej. ana@email.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label>Rol:</label>
          <select name="rol" value={formData.rol} onChange={handleChange}>
            <option value="usuario">Usuario</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>

          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={FormData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn block">
            Guardar usuario
          </button>
        </form>
      </section>
    </div>
  );
}

