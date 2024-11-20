import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importamos Link de react-router-dom
import "../Styles/Aside.css";

export default function Aside({ selectedView }) {
  const [rol, setRol] = useState(localStorage.getItem("rol"));
  const [scrolling, setScrolling] = useState(false);
  const [showHotelSubmenu, setShowHotelSubmenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRol = localStorage.getItem("rol");
      if (newRol !== rol) {
        setRol(newRol);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rol]);

  const isHotelesView = selectedView === "hoteles";
  const isCabanasView = selectedView === "cabanas";

  const toggleHotelSubmenu = () => {
    setShowHotelSubmenu(!showHotelSubmenu);
  };

  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4"
      style={{ backgroundColor: "#a47551" }}
    >
      <h1 className="brand-text kabimate-header">KABIMATE</h1>
      <hr className="kabimate-divider" />
      <div className="sidebar">
        <nav className="mt-4">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Mostrar solo para usuarios con rol 2 */}
            {rol === "2" && (
              <>
                {/* Agregar la nueva columna para Hoteles */}
                {isHotelesView && (
                  <>
                    <li className="nav-item">
                      <Link to="/Hhotel" className="nav-link">
                        <i
                          className="nav-icon fas fa-hotel"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Hotel</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/crud-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-edit"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-calendar-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/my-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-user-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Mis Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reservation-history" className="nav-link">
                        <i
                          className="nav-icon fas fa-history"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Historial de Reservas
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="#!"
                        className="nav-link"
                        onClick={toggleHotelSubmenu}
                      >
                        <i
                          className="nav-icon fas fa-building"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión del Hotel
                          <i
                            className={`right fas ${
                              showHotelSubmenu ? "fa-angle-up" : "fa-angle-down"
                            }`}
                          />
                        </p>
                      </Link>
                      {showHotelSubmenu && (
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <Link to="/ghotel" className="nav-link">
                              <i
                                className="nav-icon fas fa-hotel"
                                style={{ color: "#ffffff" }}
                              />
                              <p style={{ color: "#ffffff" }}>Habitaciones</p>
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/pisos" className="nav-link">
                              <i
                                className="nav-icon fas fa-layer-group"
                                style={{ color: "#ffffff" }}
                              />
                              <p style={{ color: "#ffffff" }}>Pisos</p>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="nav-item">
                      <Link to="/gCategory" className="nav-link">
                        <i
                          className="nav-icon fas fa-tags"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Categorías
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/gProducto"
                        className="nav-link"
                      >
                        <i
                          className="nav-icon fas fa-box"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Productos y Servicios
                        </p>
                      </Link>
                    </li>
                  </>
                )}

                {/* Agregar la nueva columna para Cabañas */}
                {isCabanasView && (
                  <>
                    <li className="nav-item">
                      <Link to="/hcabana" className="nav-link">
                        <i
                          className="nav-icon fas fa-home"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Cabañas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/crud-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-edit"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-calendar-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/my-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-user-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Mis Reservas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/reservation-history" className="nav-link">
                        <i
                          className="nav-icon fas fa-history"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Historial de Reservas
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/gcabana" className="nav-link">
                        <i
                          className="nav-icon fas fa-home"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestión de Cabañas</p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/gCategory" className="nav-link">
                        <i
                          className="nav-icon fas fa-tags"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Categorías
                        </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/gProduct"
                        className="nav-link"
                      >
                        <i
                          className="nav-icon fas fa-box"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Productos y Servicios
                        </p>
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
