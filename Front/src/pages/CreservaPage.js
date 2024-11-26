import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useReservaCabana from "../Hooks/useReservaCabana";
import "../Styles/ReservaCabaña.css";

// Función para formatear la fecha sin hora (solo YYYY-MM-DD)
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const ReservaForm = () => {
  const navigate = useNavigate();
  const {
    fecha_inicio,
    fecha_final,
    setFechaInicio,
    setFechaFinal,
    nombre1_huesped,
    nombre2_huesped,
    setNombre2Huesped,
    setNombre1Huesped,
    apellido1_huesped,
    setApellido1Huesped,
    apellido2_huesped,
    setApellido2Huesped,
    edad_huesped,
    setEdadHuesped,
    direccion_huesped,
    setDireccionHuesped,
    rut_huesped,
    setRutHuesped,
    telefono_huesped,
    setTelefonoHuesped,
    anticipo,
    setAnticipo,
    nuevoTotal,
    setNuevoTotal,
    validar,
    precio_por_noche,
  } = useReservaCabana();

  // Establecer la fecha de inicio con la hora actual (solo fecha, sin hora)
  useEffect(() => {
    const now = new Date();
    setFechaInicio(formatDate(now)); // Establece solo la fecha actual
  }, [setFechaInicio]);

  // Actualizar nuevoTotal con precio_por_noche cada vez que este cambie
  useEffect(() => {
    if (precio_por_noche && !nuevoTotal) {
      setNuevoTotal(precio_por_noche);
    }
  }, [precio_por_noche, nuevoTotal, setNuevoTotal]);

  // Actualizar la hora cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setFechaInicio(formatDate(now)); // Actualiza solo la fecha cada minuto
    }, 60000); // 60000 ms = 1 minuto

    return () => clearInterval(interval);
  }, [setFechaInicio]);

  // Maneja el cambio de las fechas
  const handleDateChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Botón Enviar Reserva presionado");

    // Llama a la función de validación
    validar(1);

    // Redirigir a /reservasC después de validar
    navigate("/reservasC");
  };

  return (
    <div className="reserva-form-wrapper">
      <div className="reserva-form">
        <h2>Formulario para la reserva de la cabaña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Fecha y Hora de Inicio (Puede ser hoy o cualquier día en
              adelante):
              <input
                type="datetime-local"
                value={fecha_inicio}
                onChange={(e) => setFechaInicio(e.target.value)} // Fecha y hora
                required
              />
            </label>

            <label>
              Fecha y Hora Final de la reserva:
              <input
                type="datetime-local"
                value={fecha_final}
                onChange={(e) => setFechaFinal(e.target.value)} // Fecha y hora
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Primer Nombre:
              <input
                type="text"
                value={nombre1_huesped}
                onChange={(e) => setNombre1Huesped(e.target.value)}
                required
              />
            </label>

            <label>
              Segundo Nombre:
              <input
                type="text"
                value={nombre2_huesped}
                onChange={(e) => setNombre2Huesped(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Primer Apellido:
              <input
                type="text"
                value={apellido1_huesped}
                onChange={(e) => setApellido1Huesped(e.target.value)}
                required
              />
            </label>

            <label>
              Segundo Apellido:
              <input
                type="text"
                value={apellido2_huesped}
                onChange={(e) => setApellido2Huesped(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Edad del cliente:
              <input
                type="number"
                value={edad_huesped}
                onChange={(e) => setEdadHuesped(e.target.value)}
                required
              />
            </label>

            <label>
              Dirección del cliente:
              <input
                type="text"
                value={direccion_huesped}
                onChange={(e) => setDireccionHuesped(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              RUT del cliente:
              <input
                type="text"
                value={rut_huesped}
                onChange={(e) => setRutHuesped(e.target.value)}
                required
              />
            </label>

            <label>
              Teléfono del cliente:
              <input
                type="tel"
                value={telefono_huesped}
                onChange={(e) => setTelefonoHuesped(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Anticipo:
              <input
                type="number"
                value={anticipo}
                onChange={(e) => setAnticipo(e.target.value)}
                required
              />
            </label>

            <label>
              SubTotal (Precio de la cabaña):
              <input
                type="number"
                value={nuevoTotal} // El valor de nuevoTotal se establece aquí
                placeholder=""
                onChange={(e) => setNuevoTotal(e.target.value)} // Permite editarlo manualmente si es necesario
                required
              />
            </label>
          </div>

          <button type="submit">Enviar Reserva</button>
        </form>
      </div>
    </div>
  );
};

export default ReservaForm;
