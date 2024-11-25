import React from "react";
import "../Styles/Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <h1 className="home-title">Bienvenido a Kabimate</h1>
      <p className="home-subtitle">
        La herramienta ideal para practicar la administración de Hotel y de
        cabañas.
      </p>

      {/* Descripción general */}
      <section className="description">
        <h2>¿Qué es Kabimate?</h2>
        <p className="black-text">
          <strong>Kabimate</strong> es un software de administración simulada,
          diseñado especialmente para estudiantes que desean practicar y
          aprender sobre la gestión de un hotel ficticio y cabañas.
        </p>
        <p className="black-text">
          Con nuestra plataforma, podrás administrar tanto{" "}
          <strong>Hotel</strong> como <strong>cabañas</strong>, eligiendo la
          vista que mejor se adapte a tus necesidades mediante los botones en el
          encabezado.
        </p>
        <div className="icons-container">
          <i
            className="fas fa-building"
            style={{ fontSize: "2rem", color: "#a47551" }}
          ></i>
          <i> </i>
          <i
            className="fa fa-house"
            style={{ fontSize: "2rem", color: "#a47551" }}
          ></i>
        </div>
        <p className="black-text">
          Para una mejor experiencia de usuario, selecciona entre los botones de{" "}
          <strong>Hotel</strong> o <strong>Cabañas </strong>
          en la parte superior de la página. Esto cambiará la vista y
          funcionalidades de la plataforma según tu elección.
        </p>
      </section>

      {/* Instrucciones de uso */}
      <section className="instructions">
        <h2>¿Cómo empezar?</h2>
        <p className="black-text">Al ingresar a la plataforma, podrás:</p>
        <div className="instructions-list">
          <div className="instruction-item">
            <i
              className="bi bi-list-check"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Seleccionar entre las opciones de <strong>Hotel</strong> o{" "}
              <strong>Cabañas</strong>.
            </p>
          </div>
          <div className="instruction-item">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Crear y configurar hoteles o cabañas: Añade nuevos alojamientos
              especificando nombre, ubicación, precios, etc.
            </p>
          </div>
          <div className="instruction-item">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Editar información de hoteles o cabañas: Actualiza precios,
              disponibilidad, y servicios ofrecidos.
            </p>
          </div>
          <div className="instruction-item">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Gestionar el estado de disponibilidad de los alojamientos.
            </p>
          </div>
          <div className="instruction-item">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Eliminar alojamientos de manera lógica si ya no estarán
              disponibles.
            </p>
          </div>
          <div className="instruction-item">
            <i
              className="bi bi-check-circle"
              style={{ fontSize: "1.5rem", color: "#a47551" }}
            ></i>
            <p className="black-text">
              Gestionar y visualizar reservas de forma sencilla.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios de Usar Kabimate */}
      <section className="benefits">
        <h2>Beneficios de Usar Kabimate</h2>
        <ul>
          <p className="black-text">
            <strong>Fácil de Usar:</strong> Interfaz intuitiva para gestionar
            hoteles y cabañas.
          </p>
          <p className="black-text">
            <strong>Accesibilidad:</strong> Disponible desde cualquier
            dispositivo con conexión a Internet.
          </p>
          <p className="black-text">
            <strong>Optimización:</strong> Gestiona múltiples reservas sin
            errores, mejorando la eficiencia.
          </p>
          <p className="black-text">
            <strong>Flexibilidad:</strong> Personaliza los servicios y precios
            de tus alojamientos.
          </p>
        </ul>
      </section>
    </div>
  );
};

export default Home;
