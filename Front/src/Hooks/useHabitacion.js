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
  const [id_tipo_habitacion, setIdTipoHabitacion] = useState("");
  const [id_piso, setIdPisoHabitacion] = useState("");
  const [id_estado, setIdEstadoHabitacion] = useState("");
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
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  }, [id_usuario_habitacion]);

  const getAllHabitaciones = async (id_usuario) => {
    try {
      const habitacionesData = await getHabitaciones(id_usuario);
      setHabitaciones(
        habitacionesData.sort((a, b) => a.ID_HABITACION - b.ID_HABITACION)
      );
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
    const piso = pisos.find((p) => p.ID_PISO === id_piso);
    return piso ? piso.NOMBRE_PISO : "Sin Piso";
  };

  const obtenerNombreTipo = (id_tipo_habitacion) => {
    const tipo = tipos.find((t) => t.ID_TIPO_HABITACION === id_tipo_habitacion);
    return tipo ? tipo.NOMBRE_TIPO_HABITACION : "Sin Tipo de Habitación";
  };

  const openModal = (
    op,
    id_habitacion = "",
    numero_habitacion = "",
    capacidad = "",
    precio_por_noche = "",
    servicios_incluidos = "",
    descripcion_habitacion = "",
    id_tipo_habitacion= "",
    id_piso = "",
    id_estado = ""
  ) => {
    // Usar el id_usuario_habitacion desde el estado
    const id_usuario_habitacion = sessionStorage.getItem("idUsuario");

    setIdHabitacion(id_habitacion);
    setNumeroHabitacion(numero_habitacion);
    setCapacidad(capacidad);
    setPrecioPorNoche(precio_por_noche);
    setServiciosIncluidos(servicios_incluidos);
    setDescripcionHabitacion(descripcion_habitacion);
    setIdTipoHabitacion(id_tipo_habitacion);
    setIdPisoHabitacion(id_piso);
    setIdEstadoHabitacion(id_estado);
    setOperation(op);
    setTitle(op === 1 ? "Crear habitación" : "Actualizar habitación");

    console.log(id_usuario_habitacion);
  };

  const validar = async () => {
    const IdPiso = String(id_piso).trim();
    const IdTipo = String(id_tipo_habitacion).trim();
    const IdEstado = String(id_estado).trim();

    const validarCreacion = () => {
      return (
        numero_habitacion === "" ||
        capacidad === "" ||
        precio_por_noche === "" ||
        servicios_incluidos.trim() === "" ||
        descripcion_habitacion.trim() === "" ||
        IdPiso === "" ||
        IdTipo === ""
      );
    };

    const validarActualizacion = () => {
      return (
        numero_habitacion === "" ||
        capacidad === "" ||
        precio_por_noche === "" ||
        servicios_incluidos.trim() === "" ||
        descripcion_habitacion.trim() === "" ||
        IdPiso === "" ||
        IdTipo === "" ||
        IdEstado === ""
      );
    };

    if (operation === 1) {
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        numero_habitacion: numero_habitacion,
        capacidad: capacidad,
        precio_por_noche: precio_por_noche,
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_habitacion: descripcion_habitacion.trim(),
        id_piso: id_piso,
        id_tipo_habitacion: id_tipo_habitacion,
      };
      createNewHabitacion(id_usuario_habitacion, parametros);
      console.log("Datos de la habitación a crear/actualizar:", parametros);
    } else {
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        numero_habitacion: numero_habitacion,
        capacidad: capacidad,
        precio_por_noche: precio_por_noche,
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_habitacion: descripcion_habitacion.trim(),
        id_piso: id_piso,
        id_tipo_habitacion: id_tipo_habitacion,
        id_estado: id_estado,
      };
      updateExistingHabitacion(id_habitacion, parametross);
      console.log("Datos de la habitación a crear/actualizar:", parametross);
    }
  };

  const createNewHabitacion = async (id_usuario, habitacionData) => {
    try {
      const response = await createHabitacion(id_usuario, habitacionData);
      show_alerta(response.msg, "success");
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
      document.getElementById("btnCerrar").click();
      getAllHabitaciones(id_usuario_habitacion);
    } catch (error) {
      console.error("Error al actualizar habitación:", error);
      show_alerta("Error al actualizar la habitación", "error");
    }
  };

  const handleToggleHotelStatus = async (id_habitacion, nuevoEstado) => {
    try {
      await activateHabitacion(id_habitacion, nuevoEstado);
      setHabitaciones((prevHabitaciones) =>
        prevHabitaciones.map((habitacion) =>
          habitacion.ID_HABITACION === id_habitacion
            ? { ...habitacion, ESTADO_HABITACION: nuevoEstado }
            : habitacion
        )
      );
      show_alerta(
        nuevoEstado
          ? "Habitación habilitada con éxito"
          : "Habitación deshabilitada con éxito",
        "success"
      );
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
    id_tipo_habitacion,
    id_piso,
    id_estado,
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
