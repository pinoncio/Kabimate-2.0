import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReservaById, deleteReserva } from "../services/ReservaCabaña";
import "../Styles/Pago.css";
import { show_alerta } from "../functions"; // Importa la función show_alerta
import { updateCabana } from "../services/Cabania";

const PasarelaPago = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "numeroTarjeta") {
      // Si el campo es 'numeroTarjeta', formateamos el valor antes de guardarlo
      setPago({ ...pago, [name]: formatCardNumber(value) });
    } else {
      // Si no es el campo 'numeroTarjeta', solo actualizamos el estado normalmente
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
      // Eliminar la reserva
      await deleteReserva(id_reserva);

      // Verificar el ID de la cabaña antes de actualizar
      const reserva = await getReservaById(id_reserva);
      const idCabania = reserva.ID_CABANIA_RESERVA_CABANIA;
      console.log("ID de la cabaña para actualización:", idCabania); // Verificar que se obtiene correctamente

      // Actualizar el estado de la cabaña
      await updateCabana(idCabania, { ID_ESTADO_CABANIA: 2 }); // Cambiar el estado a "2" (reservada)
      console.log("Estado de la cabaña actualizado exitosamente.");

      // Mostrar mensaje de éxito usando SweetAlert2
      show_alerta(
        `Pago realizado con éxito.\nReserva ID: ${id_reserva}\nMonto: $${pago.monto}`,
        "success",
        "",
        "600px"
      );

      // Redirigir a la página de inicio o donde desees
      navigate("/Hcabana");

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
                type="month"
                name="fechaExpiracion"
                value={pago.fechaExpiracion}
                onChange={handleInputChange}
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

export default PasarelaPago;
