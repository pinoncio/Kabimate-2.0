import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  
  // Estado para guardar el rol del usuario
  const [role, setRole] = useState(sessionStorage.getItem("rol")); 

  const handleLogout = () => {
    // Borrar el token y el rol de sessionStorage
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("rol");

    // Actualizar el estado del rol para forzar re-render
    setRole(null);

    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  // useEffect para actualizar el rol cuando haya cambios en sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(sessionStorage.getItem("rol"));
    };

    // Escuchar eventos de cambio en sessionStorage
    window.addEventListener("storage", handleStorageChange);

    // Limpieza del event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ backgroundColor: "#a47551" }}>
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" style={{ color: "#ffffff" }} />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link to="/" className="nav-link" style={{ color: "#ffffff" }}>
            Home
          </Link>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {role ? (
          <>
            {/* Mostrar Perfil si hay rol */}
            <li className="nav-item">
              <Link to="/perfil" className="nav-link" style={{ color: "#ffffff" }}>
                <i className="fas fa-user" /> Perfil
              </Link>
            </li>
            {/* Opción para Cerrar Sesión */}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout} style={{ color: "#ffffff" }}>
                <i className="fas fa-sign-out-alt" /> Cerrar sesión
              </a>
            </li>
          </>
        ) : (
          // Mostrar Iniciar Sesión si no hay rol
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={{ color: "#ffffff" }}>
              <i className="fas fa-sign-in-alt" /> Iniciar sesión
            </Link>
          </li>
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
