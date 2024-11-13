import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

export default function Header() {
  const [rol, setRol] = useState(null);  // Estado local para rol
  const [idUsuario, setIdUsuario] = useState(null);  // Estado local para idUsuario
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Sincroniza el estado con sessionStorage al montar el componente
  useEffect(() => {
    // Lee los datos de sessionStorage al montar el componente
    const storedRol = sessionStorage.getItem('rol');
    const storedIdUsuario = sessionStorage.getItem('idUsuario');
    
    if (storedRol && storedIdUsuario) {
      setRol(storedRol);
      setIdUsuario(storedIdUsuario);
    }

    // Intervalo para verificar cambios en el rol y el idUsuario
    const interval = setInterval(() => {
      const newRol = sessionStorage.getItem('rol');
      const newIdUsuario = sessionStorage.getItem('idUsuario');
      if (newRol !== rol || newIdUsuario !== idUsuario) {
        setRol(newRol);  // Actualiza el rol si cambió
        setIdUsuario(newIdUsuario);  // Actualiza el idUsuario si cambió
      }
    }, 1000); // Verifica cada segundo (puedes ajustar este valor)

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [rol, idUsuario]);  // Dependencias para detectar cambios en rol y idUsuario

  const handleLogout = () => {
    logout();  // Llama a la función de cierre de sesión
    sessionStorage.removeItem('rol');  // Elimina los datos de sessionStorage
    sessionStorage.removeItem('idUsuario');
    setRol(null);  // Limpia el estado local
    setIdUsuario(null);
    navigate("/");  // Redirige al inicio o página de login
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
            <Link to={rol === "1" ? "/admin" : "/home"} className="nav-link" style={{ color: "#ffffff" }}>
              {rol === "1" ? "Administración" : "Home"}
            </Link>
          </li>
        )}
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {rol && (
          <>
            <li className="nav-item">
              <Link to={`/perfil/${idUsuario}`} className="nav-link" style={{ color: "#ffffff" }}>
                <i className="fas fa-user" /> Perfil
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleLogout} style={{ color: "#ffffff" }}>
                <i className="fas fa-sign-out-alt" /> Cerrar sesión
              </a>
            </li>
          </>
        )}
        {/* Iconos adicionales */}
        <li className="nav-item">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button" style={{ color: "#ffffff" }}>
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
