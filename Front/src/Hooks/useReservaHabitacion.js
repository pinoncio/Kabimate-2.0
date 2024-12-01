import { useEffect, useState, useRef } from "react";
import { show_alerta } from "../functions";
import { useParams } from "react-router-dom";
import MySwal from "sweetalert2";
import {
  getReservasByUsuario,
  createReserva,
  updateReserva,
  finalizarReservaHabitacion,
} from "../services/ReservaHabitacion";
import { getHabitacion } from "../services/Habitacion";
import { getEstadosPago } from "../services/EstadoPago";

const useReservaHabitacion = () => {
  const [reservas, setReservas] = useState([]);
  const [estados, setEstados] = useState([]);
  const [id_reserva, setIdReserva] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_final, setFechaFinal] = useState("");
  const [nombre1_huesped, setNombre1Huesped] = useState("");
  const [nombre2_huesped, setNombre2Huesped] = useState("");
  const [apellido1_huesped, setApellido1Huesped] = useState("");
  const [apellido2_huesped, setApellido2Huesped] = useState("");
  const [edad_huesped, setEdadHuesped] = useState("");
  const [rut_huesped, setRutHuesped] = useState("");
  const [direccion_huesped, setDireccionHuesped] = useState("");
  const [telefono_huesped, setTelefonoHuesped] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [total, setTotal] = useState(0);
  const { id_habitacion } = useParams();
  const [precio_por_noche, setPrecioPorNoche] = useState(null);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const id_usuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    getAllEstadosPago();
    if (id_usuario) {
      getAllReservas(id_usuario);
    } else {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  }, [id_usuario]);

  useEffect(() => {
    if (id_habitacion) {
      fetchHabitacionData(id_habitacion);
    }
  }, [id_habitacion]);

  const getAllReservas = async (id_usuario) => {
    try {
      const reservasData = await getReservasByUsuario(id_usuario);
      setReservas(
        reservasData.sort((a, b) => a.ID_RESERVA_HABITACION - b.ID_RESERVA_HABITACION)
      );
    } catch (error) {
      console.error("Error al obtener las reservas:", error);
    }
  };

  const getAllEstadosPago = async () => {
    try {
      const estadosData = await getEstadosPago();
      setEstados(estadosData);
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  const obtenerNombreEstado = (id_estado_pago) => {
    const estado = estados.find((e) => e.ID_ESTADO_PAGO === id_estado_pago);
    return estado ? estado.NOMBRE_ESTADO_PAGO : "Sin Estado";
  };

  const fetchHabitacionData = async (id_habitacion) => {
    try {
      const habitacionData = await getHabitacion(id_habitacion);
      if (habitacionData && habitacionData.PRECIO_POR_NOCHE) {
        setPrecioPorNoche(habitacionData.PRECIO_POR_NOCHE);
      } else {
        show_alerta("No se pudo obtener el precio por noche", "error");
      }
    } catch (error) {
      console.error("Error al obtener los datos de la habitación:", error);
      show_alerta("Error al obtener los datos de la habitación", "error");
    }
  };

  const openModal = (
    op,
    id_reserva = "",
    fecha_inicio = "",
    fecha_final = "",
    nombre1_huesped = "",
    nombre2_huesped = "",
    apellido1_huesped = "",
    apellido2_huesped = "",
    edad_huesped = "",
    rut_huesped = "",
    direccion_huesped = "",
    telefono_huesped = "",
    anticipo = "",
    total = ""
  ) => {
    setIdReserva(id_reserva);
    setFechaInicio(new Date(fecha_inicio).toISOString().split("T")[0]);
    setFechaFinal(new Date(fecha_final).toISOString().split("T")[0]);
    setNombre1Huesped(nombre1_huesped);
    setNombre2Huesped(nombre2_huesped);
    setApellido1Huesped(apellido1_huesped);
    setApellido2Huesped(apellido2_huesped);
    setEdadHuesped(edad_huesped);
    setRutHuesped(rut_huesped);
    setDireccionHuesped(direccion_huesped);
    setTelefonoHuesped(telefono_huesped);
    setAnticipo(anticipo);
    setTotal(total);
    setOperation(op);
    setTitle(op === 1 ? "Crear Reserva" : "Actualizar Reserva");
  };

  const validar = async () => {
    const commonFields = [
      fecha_inicio,
      fecha_final,
      nombre1_huesped,
      nombre2_huesped,
      apellido1_huesped,
      apellido2_huesped,
      edad_huesped,
      rut_huesped,
      direccion_huesped,
      telefono_huesped,
    ];
  
    // Incluir anticipo solo si es una operación de creación
    const fields = operation === 1 ? [...commonFields, anticipo] : commonFields;
  
    const isEmpty = fields.some((field) => {
      if (typeof field === "string") {
        return field.trim() === ""; // Para campos de texto
      }
      return field === "" || field === 0; // Para otros campos como números
    });
  
    if (isEmpty) {
      show_alerta("Completa los campos requeridos", "warning");
      return;
    }
  
    if (operation === 1) {
      const parametros = {
        fecha_inicio,
        fecha_final,
        nombre1_huesped,
        nombre2_huesped,
        apellido1_huesped,
        apellido2_huesped,
        edad_huesped,
        rut_huesped,
        direccion_huesped,
        telefono_huesped,
        anticipo,
        total,
        id_habitacion,
      };
      createNewReserva(id_usuario, parametros);
    } else if (operation === 2) {
      const parametros = {
        fecha_inicio,
        fecha_final,
        nombre1_huesped,
        nombre2_huesped,
        apellido1_huesped,
        apellido2_huesped,
        edad_huesped,
        rut_huesped,
        direccion_huesped,
        telefono_huesped,
      };
      updateNewReserva(id_reserva, parametros);
    }
  };
  

  const createNewReserva = async (id_usuario, reservaData) => {
    try {
      await createReserva(id_usuario, reservaData);
      show_alerta("La reserva se ha creado correctamente", "success");
      await getAllReservas(id_usuario);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      show_alerta("Error al crear la reserva", "error");
    }
  };

  const closeButtonRef = useRef(null);

  const updateNewReserva = async (id_reserva, reservaData) => {
    try {
      await updateReserva(id_reserva, reservaData);
      show_alerta("La reserva fue editada con éxito.", "success");
      await getAllReservas(id_usuario);
      if (closeButtonRef.current) {
        closeButtonRef.current.click();
      }
    } catch (error) {
      console.error("Error al actualizar la reserva:", error);
      show_alerta("Error al actualizar la reserva", "error");
    }
  };


  const cancelarReserva = async (id_reserva) => {
    const estadoPago = 0; // Estado para cancelada (0)
    
    // Mostrar alerta para confirmar la acción
    MySwal.fire({
      title: "¿Está seguro/a de cancelar la reserva?",
      icon: "question",
      text: "No se podrá dar marcha atrás.",
      showCancelButton: true,
      confirmButtonText: "Sí, Confirmar",
      cancelButtonText: "No",
    }).then(async (result) => {
      console.log("Resultado de la confirmación:", result); // Agregar depuración
      if (result.isConfirmed) {
        try {
          console.log("Cancelando la reserva..."); // Depuración antes de la llamada
          // Llamada a la función de finalizar reserva con el estado de cancelación
          await finalizarReservaHabitacion(id_reserva, estadoPago);
    
          // Mostrar mensaje de éxito
          await MySwal.fire({
            title: "Éxito",
            text: "La reserva ha sido cancelada",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
    
          // Actualizar las reservas
          await getAllReservas(id_usuario);
        } catch (error) {
          console.error("Error al cancelar la reserva:", error);
          show_alerta("Error al cancelar la reserva", "error");
        }
      } else {
        console.log("Cancelación no confirmada"); // Depuración si no se confirma
      }
    });
  };
  
  const finalizarReserva = async (id_reserva) => {
    const estadoPago = 1; // Estado para finalizada (1)
  
    try {
      // Llamada a la función de finalizar reserva con el estado de finalización
      await finalizarReservaHabitacion(id_reserva, estadoPago);
  
      // Actualizar las reservas
      await getAllReservas(id_usuario);
    } catch (error) {
      console.error("Error al finalizar la reserva:", error);
      show_alerta("Error al finalizar la reserva", "error");
    }
  };

  
  return {
    reservas,
    fecha_inicio,
    fecha_final,
    nombre1_huesped,
    nombre2_huesped,
    apellido1_huesped,
    apellido2_huesped,
    edad_huesped,
    rut_huesped,
    direccion_huesped,
    telefono_huesped,
    anticipo,
    total,
    id_habitacion,
    setFechaInicio,
    setFechaFinal,
    setNombre1Huesped,
    setNombre2Huesped,
    setApellido1Huesped,
    setApellido2Huesped,
    setEdadHuesped,
    setRutHuesped,
    setDireccionHuesped,
    setTelefonoHuesped,
    setAnticipo,
    setTotal,
    openModal,
    validar,
    setTitle,
    operation,
    precio_por_noche,
    getAllReservas,
    id_usuario,
    closeButtonRef,
    cancelarReserva,
    finalizarReserva, 
    obtenerNombreEstado
  };
};

export default useReservaHabitacion;
