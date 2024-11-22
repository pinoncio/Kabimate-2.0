import React, { useState } from "react";
import "../Styles/Ayuda.css";

export default function Ayuda() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleMessage = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Puedo cambiar mi contraseña?",
      answer:
        "No puedes cambiar tu contraseña. Por favor, comunícate con el administrador.",
    },
    {
      question: "¿Cómo puedo hacer una reserva?",
      answer:
        "Las reservas se hacen a través de la plataforma en línea, en el apartado Habitaciones o Cabañas.",
    },
    {
      question: "¿Qué métodos de pago puedo usar?",
      answer: "Aceptamos pagos en efectivo y pagos a través de tarjeta.",
    },
    {
      question: "¿Puedo cancelar mi reserva?",
      answer:
        "Sí, puedes cancelar tu reserva en el apartado Reservas en la barra lateral de la plataforma.",
    },
    {
      question: "¿Cómo puedo actualizar mis datos?",
      answer:
        "Ingresa a tu perfil y modifica los datos que desees actualizar, como tu dirección.",
    },
    {
      question: "¿Puedo acceder al sistema desde mi móvil?",
      answer:
        "Sí, nuestra plataforma es completamente responsive y puedes acceder desde tu dispositivo móvil.",
    },
    {
      question: "¿Qué hago si tengo problemas al iniciar sesión?",
      answer:
        "Si tienes problemas para iniciar sesión, asegúrate de que tu correo y contraseña sean correctos. Si aún así no puedes ingresar, contáctanos.",
    },
  ];

  return (
    <div className="ayuda-background">
      <div className="ayuda-container">
        <h1>Centro de Soporte</h1>
        <p>
          ¿Tienes alguna duda? Aquí te ofrecemos soluciones a las preguntas más
          comunes.
        </p>
        <section className="faq">
          <h2>Preguntas Frecuentes (FAQ)</h2>
          <ul>
            {faqs.map((faq, index) => (
              <li key={index} className="faq-item">
                <button
                  className={`faq-question ${
                    activeQuestion === index ? "active" : ""
                  }`}
                  onClick={() => toggleMessage(index)}
                  aria-expanded={activeQuestion === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {faq.question}
                  <span className="faq-icon">{activeQuestion === index}</span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`faq-answer ${
                    activeQuestion === index ? "visible" : ""
                  }`}
                  role="region"
                  aria-hidden={activeQuestion !== index}
                >
                  <p>{faq.answer}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
