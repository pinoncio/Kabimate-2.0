import React from "react";
import "../Styles/contactos.css";

export default function ContactPage() {
  return (
    <div className="contacto-background">
      <div className="contacto-container">
        <h1>Contáctanos</h1>
        <p>¿Tienes dudas o consultas? ¡Estamos aquí para ayudarte!</p>

        <div className="contacto-section">
          <h2>Correo:</h2>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:contactokabimate@gmail.com">contactokabimate@gmail.com</a>
          </p>
        </div>

        <div className="contacto-section">
          <h2>Teléfonos:</h2>
          <ul className="contacto-contact-list">
            <li>
              <strong>Matías Marchant Quintero:</strong>{" "}
              <a href="tel:+56977513305">+56 9 7751 3305</a>
            </li>
            <li>
              <strong>Diego Pino San Martín:</strong>{" "}
              <a href="tel:+56975409834">+56 9 7540 9834</a>
            </li>
            <li>
              <strong>Nicolás Pavez Molina:</strong>{" "}
              <a href="tel:+56965036819">+56 9 6503 6819</a>
            </li>
          </ul>
        </div>

        <div className="contacto-social">
          <h2>¡Síguenos!</h2>
          <p>Muy pronto estaremos en redes sociales. 🎉</p>
        </div>
      </div>
    </div>
  );
}
