import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

export default function Header() {
  const { rol, logout } = useContext(AuthContext); // Obtén `rol` y `logout` del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Llama a la función de cierre de sesión
    navigate("/");
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ backgroundColor: "#a47551" }}>
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" style={{ color: "#ffffff" }} />
          </a>
        </li>
        {rol && (
          <li className="nav-item d-none d-sm-inline-block">
            <Link to={rol === 1 ? "/admin" : "/home"} className="nav-link" style={{ color: "#ffffff" }}>
              {rol === 1 ? "Administración" : "Home"}
            </Link>
          </li>
        )}
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {rol && (
          <>
            {/* Mostrar Perfil si el rol existe */}
            <li className="nav-item">
              <Link to="/perfil" className="nav-link" style={{ color: "#ffffff" }}>
                <i className="fas fa-user" /> Perfil
              </Link>
            </li>
            {/* Opción para Cerrar Sesión */}
            <li className="nav-item">
              <a className="nav-link" href="" onClick={handleLogout} style={{ color: "#ffffff" }}>
                <i className="fas fa-sign-out-alt" /> Cerrar sesión
              </a>
            </li>
          </>
        )}
        
        {/* Fullscreen Icon */}
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button" style={{ color: "#ffffff" }}>
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>

        {/* Control Sidebar */}
        <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button" style={{ color: "#ffffff" }}>
            <i className="fas fa-th-large" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
