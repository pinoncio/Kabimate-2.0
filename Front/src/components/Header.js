import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../services/AuthContext";

export default function Header({ setSelectedView, setDataVisible }) {
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Obtener rol e idUsuario desde sessionStorage cuando el componente se monta
  useEffect(() => {
    const storedRol = sessionStorage.getItem("rol");
    const storedIdUsuario = sessionStorage.getItem("idUsuario");

    if (storedRol && storedIdUsuario) {
      setRol(storedRol);
      setIdUsuario(storedIdUsuario);
    }

    // Verificar cada segundo si los valores en sessionStorage cambian
    const interval = setInterval(() => {
      const newRol = sessionStorage.getItem("rol");
      const newIdUsuario = sessionStorage.getItem("idUsuario");
      if (newRol !== rol || newIdUsuario !== idUsuario) {
        setRol(newRol);
        setIdUsuario(newIdUsuario);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rol, idUsuario]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    sessionStorage.removeItem("rol");
    sessionStorage.removeItem("idUsuario");
    setRol(null);
    setIdUsuario(null);
    navigate("/");
  };

  // Cambiar vista entre Hoteles y Cabañas
  const handleViewChange = (view) => {
    setSelectedView(view);
    navigate(`/home${view === "hoteles" ? "H" : "C"}`);
  };

  return (
    <nav
      className="main-header navbar navbar-expand navbar-white navbar-light"
      style={{ backgroundColor: "#a47551" }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" style={{ color: "#ffffff" }} />
          </a>
        </li>
        {rol && (
          <>
            <li className="nav-item d-none d-sm-inline-block">
              <Link
                to={rol === "1" ? "/admin" : "/home"}
                className="nav-link"
                style={{ color: "#ffffff" }}
                onClick={handleViewChange}
              >
                {rol === "1" ? "Administración" : "Home"}
              </Link>
            </li>

            {/* Mostrar solo si el rol no es 1 */}
            {rol !== "1" && (
              <>
                <li className="nav-item d-none d-sm-inline-block">
                  <a
                    href="#"
                    className="nav-link"
                    style={{ color: "#ffffff" }}
                    onClick={() => handleViewChange("hoteles")}
                  >
                    Hotel
                  </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <a
                    href="#"
                    className="nav-link"
                    style={{ color: "#ffffff" }}
                    onClick={() => handleViewChange("cabanas")}
                  >
                    Cabañas
                  </a>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      <ul className="navbar-nav ml-auto">
        {rol && (
          <>
            <li className="nav-item">
              <Link
                to={
                  rol === "1"
                    ? `/perfilA/${idUsuario}`
                    : `/perfilU/${idUsuario}`
                }
                className="nav-link"
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-user" /> Perfil
              </Link>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onClick={handleLogout}
                style={{ color: "#ffffff" }}
              >
                <i className="fas fa-sign-out-alt" /> Cerrar sesión
              </a>
            </li>
          </>
        )}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="#"
            role="button"
            style={{ color: "#ffffff" }}
          >
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
