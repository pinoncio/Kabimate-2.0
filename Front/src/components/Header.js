import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";

export default function Header({ setSelectedView, setDataVisible }) {
  const [rol, setRol] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Obtener rol e idUsuario desde localStorage cuando el componente se monta
  useEffect(() => {
    const storedRol = localStorage.getItem("rol");
    const storedIdUsuario = localStorage.getItem("idUsuario");

    if (storedRol && storedIdUsuario) {
      setRol(storedRol);
      setIdUsuario(storedIdUsuario);
    }

    // Verificar cada segundo si los valores en localStorage cambian
    const interval = setInterval(() => {
      const newRol = localStorage.getItem("rol");
      const newIdUsuario = localStorage.getItem("idUsuario");
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
    localStorage.removeItem("authToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("selectedView")
    setRol(null);
    setIdUsuario(null);
    navigate("/");
  };

  // Cambiar vista entre Hoteles y Cabañas
  const handleViewChange = (view) => {
    setSelectedView(view);
    // Guardamos el valor de selectedView en localStorage
    localStorage.setItem("selectedView", view);

    // Navegar a la ruta correspondiente según la vista seleccionada
    navigate(`/home${view === "hoteles" ? "H" : "C"}`);
  };

  // Recuperamos el estado de selectedView de localStorage cuando el componente se monta
  useEffect(() => {
    const storedView = localStorage.getItem("selectedView");
    if (storedView) {
      setSelectedView(storedView);
    }
  }, [setSelectedView]);

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
                onClick={() => handleViewChange("home")}
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

            {/* Mostrar solo si el rol no es 1 */}
            {rol !== "1" && (
              <>
                <li className="nav-item d-none d-sm-inline-block">
                  <Link
                    to="/contactanos"
                    className="nav-link"
                    style={{ color: "#ffffff" }}
                  >
                    <i className="fas fa-envelope" /> Contáctanos
                  </Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                  <Link
                    to="/ayuda"
                    className="nav-link"
                    style={{ color: "#ffffff" }}
                  >
                    <i className="fas fa-question-circle" /> Ayuda
                  </Link>
                </li>
              </>
            )}

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

        {/* El cuadrado (ícono de pantalla completa) al final */}
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
