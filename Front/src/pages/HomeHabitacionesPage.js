import React from "react";
import "../Styles/HomeC.css";

const HomeH = () => {
  return (
    <div className="homec-wrapper">
      <h1 className="homec-title">Bienvenido a Kabimate</h1>
      <p className="homec-subtitle">Descubre lo que tenemos para ofrecerte.</p>

      {/* Instrucciones para el usuario */}
      <div className="instructions-cabana">
        <p>
          Hola en este apartado podrás gestionar reservas, ver tu historial, y
          administrar el hotel desde allí. Explora las diferentes
          funcionalidades y encuentra lo que necesitas.
        </p>
      </div>

      {/* Contenedor para las cartas */}
      <div className="cards-container-cabana">
        <div className="category-description-cabana">
          <i className="fas fa-hotel"></i> {/* Icono de Casa para Hoteles */}
          <h2>Hotel</h2>
          <ula>
            <li>
              Aquí puedes ver la lista completa de todos las habitaciones
              disponibles en el sistema.
            </li>
            <li>
              Consulta el estado de cada habitación: disponible, ocupado o en
              mantenimiento.
            </li>
          </ula>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-calendar-check"></i>
          <h2>Gestionar Reservas</h2>
          <ul>
            <li>Reserva y administra la estancia en el Hotel.</li>
            <li>Consulta tu historial de reservas pasadas.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-book"></i>
          <h2>Reservas</h2>
          <ul>
            <li>Realiza nuevas reservas para el Hotel.</li>
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
          <i className="fa fas fa-hotel"></i>
          <h2>Gestión del Hotel</h2>
          <ul>
            <li>Agrega y administra habitaciones.</li>
            <li>Gestiona precios y disponibilidad.</li>
          </ul>
        </div>

        <div className="category-description-cabana">
          <i className="fa fa-th-large"></i>
          <h2>Gestión de Categorías</h2>
          <ul>
            <li>Organiza los hoteles en diferentes categorías.</li>
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

export default HomeH;
