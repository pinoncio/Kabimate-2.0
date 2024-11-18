import { useEffect, useState } from "react";
import { show_alerta } from "../functions";
import {
  getHabitaciones,
  createHabitacion,
  updateHabitacion,
  activateHabitacion,
} from "../services/Habitacion";
import { getTipos } from "../services/TipoHabitacion";
import { getPisos } from "../services/Pisos";
import { getEstados } from "../services/Estados";

const useHabitacion = () => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [pisos, setPisos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [id_habitacion, setIdHabitacion] = useState("");
  const [numero_habitacion, setNumeroHabitacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [precio_por_noche, setPrecioPorNoche] = useState("");
  const [servicios_incluidos, setServiciosIncluidos] = useState("");
  const [descripcion_habitacion, setDescripcionHabitacion] = useState("");
  const [estado_habitacion, setEstadoHabitacion] = useState(true);
  const [id_tipo_habitacion_habitacion, setIdTipoHabitacion] = useState("");
  const [id_piso_habitacion, setIdPisoHabitacion] = useState("");
  const [id_estado_habitacion, setIdEstadoHabitacion] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  const id_usuario_habitacion = sessionStorage.getItem("idUsuario");

  useEffect(() => {
    if (id_usuario_habitacion) {
      getAllHabitaciones(id_usuario_habitacion);
      getAllTipos();
      getAllPisos(id_usuario_habitacion);
      getAllEstados();
    } else {
      show_alerta("No se encontró el ID de usuario. Por favor, inicie sesión.", "error");
    }
  }, [id_usuario_habitacion]);

  const getAllHabitaciones = async (id_usuario) => {
    try {
      const habitacionesData = await getHabitaciones(id_usuario);
      setHabitaciones(habitacionesData.sort((a, b) => a.ID_HABITACION - b.ID_HABITACION));
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    }
  };

  const getAllTipos = async () => {
    try {
      const tiposData = await getTipos();
      setTipos(tiposData);
    } catch (error) {
      console.error("Error al obtener tipos de habitación:", error);
    }
  };

  const getAllPisos = async (id_usuario) => {
    try {
      const pisosData = await getPisos(id_usuario);
      setPisos(pisosData);
    } catch (error) {
      console.error("Error al obtener pisos:", error);
    }
  };

  const getAllEstados = async () => {
    try {
      const estadosData = await getEstados();
      setEstados(estadosData);
    } catch (error) {
      console.error("Error al obtener estados:", error);
    }
  };

  const obtenerNombreEstado = (id_estado) => {
    const estado = estados.find((e) => e.ID_ESTADO === id_estado);
    return estado ? estado.NOMBRE_ESTADO : "Sin Estado";
  };

  const obtenerNombrePiso = (id_piso) => {
    const piso = pisos.find((e) => e.ID_PISO === id_piso);
    return piso ? piso.NOMBRE_PISO : "Sin Piso";
  };

  const obtenerNombreTipo = (id_tipo) => {
    const tipo = tipos.find((e) => e.ID_TIPO === id_tipo);
    return tipo ? tipo.NOMBRE_TIPO_HABITACION : "Sin Tipo de Habitación";
  };

  const openModal = (op, id_habitacion = "", numero_habitacion = "", capacidad = "", precio_por_noche = "", servicios_incluidos = "", descripcion_habitacion = "", id_tipo_habitacion = "", id_piso_habitacion = "", id_estado_habitacion = "") => {
    setIdHabitacion(id_habitacion);
    setNumeroHabitacion(numero_habitacion);
    setCapacidad(capacidad);
    setPrecioPorNoche(precio_por_noche);
    setServiciosIncluidos(servicios_incluidos);
    setDescripcionHabitacion(descripcion_habitacion);
    setIdTipoHabitacion(id_tipo_habitacion);
    setIdPisoHabitacion(id_piso_habitacion);
    setIdEstadoHabitacion(id_estado_habitacion);
    setOperation(op);
    setTitle(op === 1 ? "Crear habitación" : "Actualizar habitación");
  };

  const validar = async () => {
    const validarCampos = () => {
      return (
        numero_habitacion === "" ||
        capacidad === "" ||
        precio_por_noche === "" ||
        servicios_incluidos === "" ||
        descripcion_habitacion === "" ||
        id_tipo_habitacion_habitacion === "" ||  // Validar id tipo habitación
        id_piso_habitacion === "" ||               // Validar id piso
        id_estado_habitacion === ""                // Validar id estado
      );
    };

    if (validarCampos()) {
      show_alerta("Completa los campos requeridos", "warning");
      return;
    }

    const parametros = {
      numero_habitacion,
      capacidad,
      precio_por_noche,
      servicios_incluidos,
      descripcion_habitacion,
      id_tipo_habitacion_habitacion,  // Incluir el tipo
      id_piso_habitacion,              // Incluir el piso
      id_estado_habitacion,            // Incluir el estado
    };

    if (operation === 1) {
      createNewHabitacion(id_usuario_habitacion, parametros);
    } else {
      updateExistingHabitacion(id_habitacion, parametros);
    }
  };

  const createNewHabitacion = async (id_usuario, habitacionData) => {
    try {
      const response = await createHabitacion(id_usuario, habitacionData);
      show_alerta(response.msg, "success");
      getAllHabitaciones(id_usuario);
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al crear habitación:", error);
      show_alerta("Error al crear la habitación", "error");
    }
  };

  const updateExistingHabitacion = async (id_habitacion, habitacionData) => {
    try {
      await updateHabitacion(id_habitacion, habitacionData);
      show_alerta("Habitación actualizada con éxito.", "success");
      getAllHabitaciones(id_usuario_habitacion);
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al actualizar habitación:", error);
      show_alerta("Error al actualizar la habitación", "error");
    }
  };

  const handleToggleHotelStatus = async (id_habitacion, nuevoEstado) => {
    try {
      await activateHabitacion(id_habitacion, nuevoEstado);
      setHabitaciones(prevHabitaciones =>
        prevHabitaciones.map(habitacion =>
          habitacion.ID_HABITACION === id_habitacion
            ? { ...habitacion, ESTADO_HABITACION: nuevoEstado }
            : habitacion
        )
      );
      show_alerta(nuevoEstado ? "Habitación habilitada con éxito" : "Habitación deshabilitada con éxito", "success");
    } catch (error) {
      console.error("Error al cambiar estado de la habitación:", error);
      show_alerta("Error al cambiar el estado de la habitación", "error");
    }
  };

  return {
    habitaciones,
    tipos,
    pisos,
    estados,
    openModal,
    validar,
    title,
    operation,
    numero_habitacion,
    capacidad,
    precio_por_noche,
    servicios_incluidos,
    descripcion_habitacion,
    estado_habitacion,
    id_tipo_habitacion_habitacion,
    id_piso_habitacion,
    id_estado_habitacion,
    setNumeroHabitacion,
    setCapacidad,
    setPrecioPorNoche,
    setServiciosIncluidos,
    setDescripcionHabitacion,
    setIdTipoHabitacion,
    setIdPisoHabitacion,
    setIdEstadoHabitacion,
    handleToggleHotelStatus,
    obtenerNombreEstado,
    obtenerNombreTipo,
    obtenerNombrePiso,
  };
};

export default useHabitacion;
