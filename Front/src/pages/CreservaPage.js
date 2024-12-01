import React, { useEffect } from "react";
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

const ReservaCabanaForm = () => {
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
    total,
    setTotal,
    validar,
    precio_por_noche,
  } = useReservaCabana();

  // Establecer la fecha de inicio con la hora actual (solo fecha, sin hora)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setFechaInicio(formatDate(now)); // Actualiza la fecha y hora en tiempo real
    }, 1000); // Actualiza cada segundo
  
    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [setFechaInicio]);
  
  

  useEffect(() => {
    if (precio_por_noche && !total) {
      setTotal(precio_por_noche);
    }
  }, [precio_por_noche, total, setTotal]);

  // Actualizar la hora cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setFechaInicio(formatDate(now)); // Actualiza solo la fecha cada minuto
    }, 60000); // 60000 ms = 1 minuto

    return () => clearInterval(interval);
  }, [setFechaInicio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Botón Enviar Reserva presionado");
  
    // Llama a la función de validación
    validar(1);
  
    // Espera 3 segundos antes de redirigir
    setTimeout(() => {
      navigate("/reservasC");
    }, 3000);
  };
  

  // Función para ir a la página /hcabana
  const handleGoBack = () => {
    navigate("/hcabana");
  };

  return (
    <div className="reserva-form-wrapper">
      <div className="reserva-form">
        <h2>Formulario para la reserva de la cabaña</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Fecha y Hora de Inicio:
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
                placeholder="Ingresa el primer nombre"
                required
              />
            </label>

            <label>
              Segundo Nombre:
              <input
                type="text"
                value={nombre2_huesped}
                onChange={(e) => setNombre2Huesped(e.target.value)}
                placeholder="Ingresa el segundo nombre"
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
                placeholder="Ingresa el primer apellido"
                required
              />
            </label>

            <label>
              Segundo Apellido:
              <input
                type="text"
                value={apellido2_huesped}
                onChange={(e) => setApellido2Huesped(e.target.value)}
                placeholder="Ingresa el segundo apellido"
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
                placeholder="Ingresa la edad"
                required
              />
            </label>

            <label>
              Dirección del cliente:
              <input
                type="text"
                value={direccion_huesped}
                onChange={(e) => setDireccionHuesped(e.target.value)}
                placeholder="Ingresa la dirección"
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
                placeholder="Ingresa el RUT"
                required
              />
            </label>

            <label>
              Teléfono del cliente:
              <input
                type="text"
                value={telefono_huesped}
                onChange={(e) => setTelefonoHuesped(e.target.value)}
                placeholder="Ingresa el teléfono"
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Anticipo ( Debe ser del 20% al 50% del total del arriendo ):
              <input
                type="number"
                value={anticipo}
                onChange={(e) => setAnticipo(e.target.value)}
                placeholder="Ingresa el anticipo"
                required
              />
            </label>

            <label>
              SubTotal ( Precio de la cabaña ):
              <input
                type="number"
                value={total}
                placeholder="Precio total de la cabaña"
                onChange={(e) => setTotal(e.target.value)} 
                required
                readOnly
              />
            </label>
          </div>{" "}
          <button type="submit">Enviar Reserva</button>
          <button className="button-Volver" onClick={handleGoBack}>
            Volver
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservaCabanaForm;
