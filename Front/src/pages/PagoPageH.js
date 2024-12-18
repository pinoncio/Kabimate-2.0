import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReservaById } from "../services/ReservaHabitacion";
import "../Styles/Pago.css";
import { show_alerta } from "../functions"; // Importa la función show_alerta
import useReservaHabitacion from "../Hooks/useReservaHabitacion";

const PasarelaPagoH = () => {
  const { id_reserva } = useParams();
  const navigate = useNavigate();

  const [pago, setPago] = useState({
    tipo: "tarjeta", // tarjeta o efectivo
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    monto: 0, // Se actualizará con el total de la reserva
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { finalizarReserva } = useReservaHabitacion();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const reserva = await getReservaById(id_reserva);
        setPago((prevPago) => ({ ...prevPago, monto: reserva.TOTAL }));
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los datos de la reserva");
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id_reserva]);

  const formatCardNumber = (value) => {
    // Eliminar todo lo que no sea un número
    const cleaned = value.replace(/\D/g, "");

    // Formatear en bloques de 4 dígitos
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");

    return formatted;
  };

  const formatExpirationDate = (value) => {
    // Eliminar todo lo que no sea un número
    const cleaned = value.replace(/\D/g, "");

    // Formatear como "XX/XXXX"
    if (cleaned.length <= 2) {
      return cleaned; // Retorna los primeros 2 dígitos
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`; // Inserta la barra
    }

    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 6)}`; // Limitar a "XX/XXXX"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "numeroTarjeta") {
      setPago({ ...pago, [name]: formatCardNumber(value) });
    } else if (name === "fechaExpiracion") {
      setPago({ ...pago, [name]: formatExpirationDate(value) });
    } else {
      setPago({ ...pago, [name]: value });
    }
  };

  const handlePago = async () => {
    // Validación de campos si el tipo de pago es tarjeta
    if (pago.tipo === "tarjeta") {
      if (!pago.numeroTarjeta || !pago.fechaExpiracion || !pago.cvv) {
        // Mostrar alerta de error si falta algún dato
        show_alerta(
          "Por favor, complete todos los campos de la tarjeta.",
          "error",
          "",
          "600px"
        );
        return; // No procede con el pago
      }
    }

    try {
      // Llamar a la función finalizarReserva para finalizar la reserva
      await finalizarReserva(id_reserva, 1); // 1 para indicar que se finaliza la reserva

      // Mostrar mensaje de éxito usando SweetAlert2
      show_alerta(
        `Pago realizado con éxito.\nMonto: $${pago.monto}`,
        "success",
        "",
        "600px"
      );

      // Redirigir a la página de inicio o donde desees
      navigate("/reservasH");
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      show_alerta("Hubo un error al procesar el pago", "error", "", "600px");
    }
  };

  if (loading) {
    return <p>Cargando datos de la reserva...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="pasarela-pago-container">
      <h2 className="titulo">Pasarela de Pago</h2>

      {/* Total a pagar en grande arriba */}
      <div className="total-pago-grande">
        <h3>Total a Pagar: </h3>
        <h1>${pago.monto}</h1>
      </div>

      <div className="formulario">
        <div className="opcion-pago">
          <label>
            <input
              type="radio"
              name="tipo"
              value="tarjeta"
              checked={pago.tipo === "tarjeta"}
              onChange={handleInputChange}
            />
            Tarjeta de Crédito/Débito
          </label>
          <label>
            <input
              type="radio"
              name="tipo"
              value="efectivo"
              checked={pago.tipo === "efectivo"}
              onChange={handleInputChange}
            />
            Pago en Efectivo
          </label>
        </div>

        {pago.tipo === "tarjeta" && (
          <div className="datos-tarjeta">
            <label>
              Número de Tarjeta:
              <input
                type="text"
                name="numeroTarjeta"
                value={pago.numeroTarjeta}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19" // Máximo 19 caracteres para permitir los espacios
              />
            </label>
            <label>
              Fecha de Expiración:
              <input
                type="text"
                name="fechaExpiracion"
                value={pago.fechaExpiracion}
                onChange={handleInputChange}
                placeholder="MM/YYYY"
                maxLength="7" // 2 dígitos + 1 barra + 4 dígitos
              />
            </label>
            <label>
              CVV:
              <input
                type="text"
                name="cvv"
                value={pago.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
              />
            </label>
          </div>
        )}

        <button className="btn-pagar" onClick={handlePago}>
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PasarelaPagoH;
