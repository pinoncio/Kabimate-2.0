import React, { useState, useEffect } from "react";
import '../Styles/Aside.css';

export default function Aside() {
  // Estado para el rol y si el usuario está logueado
  const [rol, setRol] = useState(sessionStorage.getItem('rol'));
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('rol') !== null); // Verifica si hay un rol

  useEffect(() => {
    // Intervalo para verificar cambios en el rol en sessionStorage
    const interval = setInterval(() => {
      const newRol = sessionStorage.getItem('rol');
      if (newRol !== rol) {
        setRol(newRol);  // Actualiza el rol si cambió
        setIsLoggedIn(newRol !== null); // Verifica si el usuario está logueado
      }
    }, 1000); // Verifica cada segundo (puedes ajustar este valor)

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, [rol]);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: '#a47551' }}>
      <h1
        className="brand-text font-weight-light"
        style={{
          padding: "10px",
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#ffffff",
          margin: 0,
        }}
      >
        KABIMATE
      </h1>
      <div className="sidebar">
        {/* Muestra el campo de búsqueda solo si el usuario está logueado */}
        {isLoggedIn && (
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
                  <i className="fas fa-search fa-fw" style={{ color: "#ffffff" }} />
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
            {rol === '2' && (
              <>
                <li className="nav-item">
                  <a href="/hotels" className="nav-link">
                    <i className="nav-icon fas fa-hotel" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Hoteles</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/Hcabana" className="nav-link">
                    <i className="nav-icon fas fa-home" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Cabañas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/crud-reservations" className="nav-link">
                    <i className="nav-icon fas fa-edit" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/reservations" className="nav-link">
                    <i className="nav-icon fas fa-calendar-check" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Reservas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/my-reservations" className="nav-link">
                    <i className="nav-icon fas fa-user-check" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Mis Reservas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/reservation-history" className="nav-link">
                    <i className="nav-icon fas fa-history" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Historial de Reservas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/hotel-management" className="nav-link">
                    <i className="nav-icon fas fa-building" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Hoteles</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/gcabana" className="nav-link">
                    <i className="nav-icon fas fa-home" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Cabañas</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/category-management" className="nav-link">
                    <i className="nav-icon fas fa-tags" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Categorías</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/product-service-management" className="nav-link">
                    <i className="nav-icon fas fa-box" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Productos y Servicios</p>
                  </a>
                </li>
              </>
            )}
            {/* Mostrar para usuarios con rol 1 */}
            {rol === '1' && (
              <>
                <li className="nav-item">
                  <a href="/userU" className="nav-link">
                    <i className="nav-icon fas fa-user" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Usuarios</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/userA" className="nav-link">
                    <i className="nav-icon fas fa-user-shield" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Admin</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/rol" className="nav-link">
                    <i className="nav-icon fas fa-user-tag" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Roles</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/institucion" className="nav-link">
                    <i className="nav-icon fas fa-school" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Gestión de Instituciones</p>
                  </a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
