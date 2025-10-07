import { useAuth } from "../contexts/AuthContext";

export default function PanelUsuario() {
  const { usuario } = useAuth();

  return (
    <div className="container">
      <div className="card">
        <h2>Panel de Usuario</h2>
        <p>Contenido visible para cualquier usuario autenticado.</p>
        <p><strong>Nombre:</strong> {usuario?.nombre}</p>
        <p><strong>Email:</strong> {usuario?.email}</p>
      </div>
    </div>
  );
}
