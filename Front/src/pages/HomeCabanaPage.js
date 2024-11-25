import React from "react";
import "../Styles/HomeC.css";

const HomeC = () => {
  return (
    <div className="homec-wrapper">
      <h1 className="homec-title">Bienvenido a Kabimate</h1>
      <p className="homec-subtitle">Descubre lo que tenemos para ofrecerte.</p>

      {/* Instrucciones para el usuario */}
      <div className="instructions-cabana">
        <p>
          Para comenzar, selecciona entre las opciones de{" "}
          <strong>Cabañas</strong> en la parte superior de la página. Esto te
          llevará a una vista dedicada para gestionar tus cabañas.
        </p>
        <p>
          Luego, podrás gestionar reservas, ver tu historial, y administrar las
          cabañas desde allí. Explora las diferentes funcionalidades y encuentra
          lo que necesitas.
        </p>
      </div>

      {/* Contenedor para las cartas */}
      <div className="cards-container-cabana">
        <div className="category-description-cabana">
          <i className="fa fa-house"></i> {/* Icono de Casa para Cabañas */}
          <h2>Cabañas</h2>
          <ul>
            <li>
              Aquí puedes ver la lista completa de todas las cabañas disponibles
              en el sistema.
            </li>
            <li>
              Consulta el estado de cada cabaña: disponible, ocupada o en
              mantenimiento.
            </li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-calendar-check"></i>
          <h2>Gestionar Reservas</h2>
          <ul>
            <li>Reserva y administra tu estancia en Cabañas.</li>
            <li>Consulta tu historial de reservas pasadas.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-book"></i>
          <h2>Reservas</h2>
          <ul>
            <li>Realiza nuevas reservas para Cabañas.</li>
            <li>Consulta la disponibilidad y precios.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-list"></i>
          <h2>Mis Reservas</h2>
          <ul>
            <li>Consulta y administra tus reservas actuales.</li>
            <li>Realiza cambios o cancelaciones si es necesario.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-history"></i>
          <h2>Historial de Reservas</h2>
          <ul>
            <li>Accede a todas tus reservas pasadas.</li>
            <li>Revisa detalles y fechas anteriores.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-house-user"></i>{" "}
          {/* Icono de Casa para Cabañas */}
          <h2>Gestión de Cabañas</h2>
          <ul>
            <li>Agrega y administra cabañas.</li>
            <li>Gestiona precios y disponibilidad.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-th-large"></i>
          <h2>Gestión de Categorías</h2>
          <ul>
            <li>Organiza las cabañas en diferentes categorías.</li>
            <li>Optimiza la búsqueda para los usuarios.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-cogs"></i>
          <h2>Gestión de Productos y Servicios</h2>
          <ul>
            <li>Agrega servicios extra como Wi-Fi, desayuno, etc.</li>
            <li>Gestiona productos disponibles para los huéspedes.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeC;
