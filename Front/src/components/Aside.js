import React, { useState, useEffect } from "react";
import "../Styles/Aside.css";

export default function Aside({ selectedView }) {
  const [rol, setRol] = useState(sessionStorage.getItem("rol"));
  const [scrolling, setScrolling] = useState(false);
  const [showHotelSubmenu, setShowHotelSubmenu] = useState(false); // Estado para manejar el desplegable

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
      const newRol = sessionStorage.getItem("rol");
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
      <h1 class="brand-text kabimate-header">KABIMATE</h1>

      <div className="sidebar">
        {/* Muestra el campo de búsqueda solo en las vistas de Hoteles y Cabañas */}
        {(isHotelesView || isCabanasView) && (
          <div className="form-inline" style={{ marginTop: "20px" }}>
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  color: "#000000",
                  backgroundColor: "#ffffff",
                }}
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i
                    className="fas fa-search fa-fw"
                    style={{ color: "#ffffff" }}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="mt-2">
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
                      <a href="/hoteles" className="nav-link">
                        <i
                          className="nav-icon fas fa-hotel"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Hotel</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/crud-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-edit"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-calendar-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/my-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-user-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Mis Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/reservation-history" className="nav-link">
                        <i
                          className="nav-icon fas fa-history"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Historial de Reservas
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="#!"
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
                      </a>
                      {showHotelSubmenu && (
                        <ul className="nav nav-treeview">
                          <li className="nav-item">
                            <a href="/hotel" className="nav-link">
                              <i
                                className="nav-icon fas fa-hotel"
                                style={{ color: "#ffffff" }}
                              />
                              <p style={{ color: "#ffffff" }}>Hotel</p>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="/pisos" className="nav-link">
                              <i
                                className="nav-icon fas fa-layer-group"
                                style={{ color: "#ffffff" }}
                              />
                              <p style={{ color: "#ffffff" }}>Pisos</p>
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li className="nav-item">
                      <a href="/category-management" className="nav-link">
                        <i
                          className="nav-icon fas fa-tags"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Categorías
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/product-service-management"
                        className="nav-link"
                      >
                        <i
                          className="nav-icon fas fa-box"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Productos y Servicios
                        </p>
                      </a>
                    </li>
                  </>
                )}

                {/* Agregar la nueva columna para Cabañas */}
                {isCabanasView && (
                  <>
                    <li className="nav-item">
                      <a href="/hcabana" className="nav-link">
                        <i
                          className="nav-icon fas fa-home"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Cabañas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/crud-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-edit"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-calendar-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/my-reservations" className="nav-link">
                        <i
                          className="nav-icon fas fa-user-check"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Mis Reservas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/reservation-history" className="nav-link">
                        <i
                          className="nav-icon fas fa-history"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Historial de Reservas
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/cabin-management" className="nav-link">
                        <i
                          className="nav-icon fas fa-home"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>Gestión de Cabañas</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="/category-management" className="nav-link">
                        <i
                          className="nav-icon fas fa-tags"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Categorías de Cabañas
                        </p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        href="/product-service-management"
                        className="nav-link"
                      >
                        <i
                          className="nav-icon fas fa-box"
                          style={{ color: "#ffffff" }}
                        />
                        <p style={{ color: "#ffffff" }}>
                          Gestión de Productos y Servicios
                        </p>
                      </a>
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
