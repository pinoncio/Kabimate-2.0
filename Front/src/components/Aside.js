import React from "react";
import '../Styles/Aside.css'; // Asegúrate de importar el archivo CSS

export default function Aside() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ backgroundColor: '#a47551' }}>
      <h1
        className="brand-text font-weight-light"
        style={{
          padding: "10px",
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#ffffff",
          margin: 0, // Eliminar margen
        }}
      >
        KABIMATE
      </h1>
      {/* Sidebar */}
      <div className="sidebar">
        {/* SidebarSearch Form */}
        <div className="form-inline" style={{ marginTop: "20px" }}> {/* Aumentar el margen superior */}
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{
                color: "#000000", // Color del texto a negro
                backgroundColor: "#ffffff", // Color de fondo a blanco
              }} 
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" style={{ color: "#ffffff" }} />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Hoteles */}
            <li className="nav-item">
              <a href="/hotels" className="nav-link">
                <i className="nav-icon fas fa-hotel" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Hoteles</p>
              </a>
            </li>
            {/* Cabañas */}
            <li className="nav-item">
              <a href="/cabins" className="nav-link">
                <i className="nav-icon fas fa-home" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Cabañas</p>
              </a>
            </li>
            {/* CRUD Reservas */}
            <li className="nav-item">
              <a href="/crud-reservations" className="nav-link">
                <i className="nav-icon fas fa-edit" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Gestionar Reservas</p>
              </a>
            </li>
            {/* Reservas */}
            <li className="nav-item">
              <a href="/reservations" className="nav-link">
                <i className="nav-icon fas fa-calendar-check" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Reservas</p>
              </a>
            </li>
            {/* Mis Reservas */}
            <li className="nav-item">
              <a href="/my-reservations" className="nav-link">
                <i className="nav-icon fas fa-user-check" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Mis Reservas</p>
              </a>
            </li>
            
            {/* Historial de Reservas */}
            <li className="nav-item">
              <a href="/reservation-history" className="nav-link">
                <i className="nav-icon fas fa-history" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Historial de Reservas</p>
              </a>
            </li>
            {/* Gestión de Hoteles */}
            <li className="nav-item">
              <a href="/hotel-management" className="nav-link">
                <i className="nav-icon fas fa-building" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>
                  Gestión de Hoteles
                  <i className="right fas fa-angle-left" style={{ color: "#ffffff" }} />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="/hotel-management/floors" className="nav-link">
                    <i className="far fa-circle nav-icon" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Pisos</p>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/hotel-management/rooms" className="nav-link">
                    <i className="far fa-circle nav-icon" style={{ color: "#ffffff" }} />
                    <p style={{ color: "#ffffff" }}>Habitaciones</p>
                  </a>
                </li>
              </ul>
            </li>
            {/* Gestión de Cabañas */}
            <li className="nav-item">
              <a href="/gcabana" className="nav-link">
                <i className="nav-icon fas fa-home" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Gestión de Cabañas</p>
              </a>
            </li>
            {/* Gestión de Categorías */}
            <li className="nav-item">
              <a href="/category-management" className="nav-link">
                <i className="nav-icon fas fa-tags" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Gestión de Categorías</p>
              </a>
            </li>
            {/* Gestión de Productos y Servicios */}
            <li className="nav-item">
              <a href="/product-service-management" className="nav-link">
                <i className="nav-icon fas fa-box" style={{ color: "#ffffff" }} />
                <p style={{ color: "#ffffff" }}>Gestión de Productos y Servicios</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
