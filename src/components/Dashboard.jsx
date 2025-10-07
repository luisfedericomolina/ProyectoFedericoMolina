import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
    const { usuario, logout } = useAuth();
    if (!usuario) {
        return <div>Por favor inicia sesión</div>;
    }
    return (
        <div>
            <h1>Bienvenido, {usuario.nombre}!</h1>
            <p>Email: {usuario.email}</p>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}