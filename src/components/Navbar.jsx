import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
    const { usuario, hasRole, logout } = useAuth();

    return (
        <header className="navbar">
            <nav className="nav-row">

                <Link to="/" className="brand">Demo Context Auth</Link>

                <div className="spacer" />

                <Link to="/">Home</Link>
                <Link to="/panel-usuario">Usuario</Link>

                {/*hasRole("editor") && <Link to="/panel-editor">Editor</Link>*/}
                {/*hasRole("admin") && <Link to="/panel-admin">Admin</Link>*/}

                <Link to="/panel-editor">Editor</Link>
                <Link to="/panel-admin">Admin</Link>
                
                {!usuario && <Link to="/login" className="btn">Login</Link>}
                {usuario && (
                    <div className="user-box">
                        <span className="user-name">Hola, {usuario.nombre}</span>
                        <button className="btn-outline" onClick={logout}>Salir</button>
                    </div>
                )}

            </nav>
        </header>
    );
}
