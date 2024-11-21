import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../Styles/Ayuda.css";

export default function Ayuda() {
  
  // Función para mostrar la alerta
  const showAlert = (message, icon) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: message,
      icon: icon,
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <div className="ayuda-background">
      <div className="ayuda-container">
        <h1>Centro de Soporte</h1>
        <p>¿Tienes alguna duda? Aquí te ofrecemos soluciones a las preguntas más comunes.</p>

        <section className="faq">
          <h2>Preguntas Frecuentes (FAQ)</h2>
          <ul>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("No puedes cambiar tu contraseña. Por favor, comunícate con el administrador.", "info")}
              >
                ¿Puedo cambiar mi contraseña?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Las reservas se hacen a través de la plataforma en línea, en el apartado Habitaciones o Cabañas.", "info")}
              >
                ¿Cómo puedo hacer una reserva?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Aceptamos pagos en efectivo y pagos a través de tarjeta.", "info")}
              >
                ¿Qué métodos de pago puedo usar?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Sí, puedes cancelar tu reserva en el apartado Reservas en la barra lateral de la plataforma.", "info")}
              >
                ¿Puedo cancelar mi reserva?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Ingresa a tu perfil y modifica los datos que desees actualizar, como tu dirección.", "info")}
              >
                ¿Cómo puedo actualizar mis datos?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Sí, nuestra plataforma es completamente responsive y puedes acceder desde tu dispositivo móvil.", "info")}
              >
                ¿Puedo acceder al sistema desde mi móvil?
              </button>
            </li>
            <li>
              <button
                className="faq-question"
                onClick={() => showAlert("Si tienes problemas para iniciar sesión, asegúrate de que tu correo y contraseña sean correctos. Si aún así no puedes ingresar, contáctanos.", "warning")}
              >
                ¿Qué hago si tengo problemas al iniciar sesión?
              </button>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
