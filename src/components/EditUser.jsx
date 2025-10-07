import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./EditUser.css";

export default function EditUser({ usuarios, actualizarUsuario }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const encontrado = usuarios.find((u) => u.id === Number(id));
    if (encontrado) {
      setUsuario(encontrado);
    }
  }, [id, usuarios]);

  if (!usuario) return <p>Usuario no encontrado.</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actualizarUsuario(usuario.id, usuario);
    navigate("/usuarios");
  };

  return (
    <div className="container">
      <section className="card">
        <h2>Editar usuario</h2>

        <form onSubmit={handleSubmit} className="form">
          <label>Nombre:</label>
          <input
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />

          <label>Correo:</label>
          <input
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
            required
          />

          <label>Rol:</label>
          <select
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
            required
          >
            <option value="usuario">Usuario</option>
            <option value="editor">Editor</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit" className="btn block">
            Guardar cambios
          </button>
        </form>
      </section>
    </div>
  );
}
