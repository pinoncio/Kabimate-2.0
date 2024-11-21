import { useEffect, useState } from "react";
import { show_alerta } from "../functions";
import {
  getCabanas,
  createCabana,
  updateCabana,
  activateCabana,
} from "../services/Cabania";
import { getEstados } from "../services/Estados";
import "../Styles/cabana.css";

const useCabana = () => {
  const [cabanas, setCabanas] = useState([]);
  const [estados, setEstados] = useState([]);

  const [id_cabania, setIdCabana] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [cantidad_piezas, setCantidadPiezas] = useState("");
  const [precio_por_noche, setPrecioPorNoche] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [servicios_incluidos, setServiciosIncluidos] = useState("");
  const [descripcion_cabania, setDescripcionCabania] = useState("");
  const [estado_cabania, setEstadoCabania] = useState(true);
  const [id_estado_cabania, setIdEstadoCabania] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const id_usuario_cabania = localStorage.getItem("idUsuario");

  useEffect(() => {
    getAllCabanas(id_usuario_cabania);
    getAllEstados();
  }, []);

  const getAllEstados = async () => {
    try {
      const estadosData = await getEstados();
      setEstados(estadosData);
    } catch (error) {
      console.error("Error al obtener los estados:", error);
    }
  };

  const obtenerNombreEstado = (id_estado) => {
    const estado = estados.find((e) => e.ID_ESTADO === id_estado);
    return estado ? estado.NOMBRE_ESTADO : "Sin Estado";
  };

  const getAllCabanas = async (idUsuario) => {
    try {
      const cabanasData = await getCabanas(idUsuario);
      setCabanas(cabanasData.sort((a, b) => a.ID_CABANIA - b.ID_CABANIA));
    } catch (error) {
      console.error("Error al obtener cabañas:", error);
    }
  };

  const openModal = (
    op,
    id_cabania = "",
    capacidad = "",
    cantidad_piezas = "",
    precio_por_noche = "",
    ubicacion = "",
    servicios_incluidos = "",
    descripcion_cabania = "",
    id_usuario_cabania = localStorage.getItem("idUsuario"),
    id_estado_cabania = ""
  ) => {
    setIdCabana(id_cabania);
    setCapacidad(capacidad);
    setCantidadPiezas(cantidad_piezas);
    setPrecioPorNoche(precio_por_noche);
    setUbicacion(ubicacion);
    setServiciosIncluidos(servicios_incluidos);
    setDescripcionCabania(descripcion_cabania);
    setEstadoCabania(true);
    setIdEstadoCabania(id_estado_cabania);
    setOperation(op);
    setTitle(op === 1 ? "Crear cabaña" : "Actualizar cabaña");

    if (!id_usuario_cabania) {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  };

  const validar = async () => {
    const id_usuario_cabania = localStorage.getItem("idUsuario");

    const validarCreacion = () => {
      return (
        capacidad === "" ||
        capacidad == null ||
        isNaN(capacidad) ||
        cantidad_piezas === "" ||
        cantidad_piezas == null ||
        isNaN(cantidad_piezas) ||
        precio_por_noche === "" ||
        precio_por_noche == null ||
        isNaN(precio_por_noche) ||
        ubicacion.trim() === "" ||
        servicios_incluidos.trim() === "" ||
        descripcion_cabania.trim() === "" ||
        !id_usuario_cabania
      );
    };

    const validarActualizacion = () => {
      return (
        capacidad === "" ||
        capacidad == null ||
        isNaN(capacidad) ||
        cantidad_piezas === "" ||
        cantidad_piezas == null ||
        isNaN(cantidad_piezas) ||
        precio_por_noche === "" ||
        precio_por_noche == null ||
        isNaN(precio_por_noche) ||
        ubicacion.trim() === "" ||
        servicios_incluidos.trim() === "" ||
        descripcion_cabania.trim() === "" ||
        !id_usuario_cabania
      );
    };

    if (operation === 1) {
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        capacidad: capacidad,
        cantidad_piezas: cantidad_piezas,
        precio_por_noche: precio_por_noche,
        ubicacion: ubicacion.trim(),
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_cabania: descripcion_cabania.trim(),
      };
      createNewCabana(id_usuario_cabania, parametros);
    } else {
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        capacidad: capacidad,
        cantidad_piezas: cantidad_piezas,
        precio_por_noche: precio_por_noche,
        ubicacion: ubicacion.trim(),
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_cabania: descripcion_cabania.trim(),
        id_estado_cabania: id_estado_cabania,
      };
      updateExistingCabana(id_cabania, parametross);
    }
  };

  const createNewCabana = async (id_usuario_cabania, cabanaData) => {
    try {
      const response = await createCabana(id_usuario_cabania, cabanaData);
      show_alerta(response.msg, "sucess");
      setCabanas((prevCabanas) => {
        return [...prevCabanas, response.cabana].sort((a, b) => a.ID_CABANIA - b.ID_CABANIA);
      });
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al crear cabaña:", error);
      show_alerta("Error al crear la cabaña", "error");
    }
  };

  const updateExistingCabana = async (id_cabania, cabanaData) => {
    try {
      await updateCabana(id_cabania, cabanaData);
      show_alerta("La cabaña fue editada con éxito.", "success");
      setCabanas((prevCabanas) => {
        return prevCabanas.map((cabana) =>
          cabana.ID_CABANIA === id_cabania ? { ...cabana, ...cabanaData } : cabana
        ).sort((a, b) => a.ID_CABANIA - b.ID_CABANIA);
      });
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al actualizar cabaña:", error);
      show_alerta("Error al actualizar la cabaña", "error");
    }
  };

  const handleToggleCabanaStatus = async (id_cabania, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await activateCabana(id_cabania, estadoNumerico);

      setCabanas((prevCabanas) =>
        prevCabanas.map((cabana) =>
          cabana.ID_CABANIA === id_cabania ? { ...cabana, ESTADO_CABANIA: nuevoEstado } : cabana
        )
      );

      const mensaje = nuevoEstado ? "Cabaña habilitada con éxito" : "Cabaña deshabilitada con éxito";
      show_alerta(mensaje, "success");
    } catch (error) {
      console.error("Error al cambiar estado de cabaña:", error);
      show_alerta("Error al cambiar el estado de la cabaña", "error");
    }
  };

  return {
    cabanas,
    estados,
    getAllCabanas,
    openModal,
    validar,
    handleToggleCabanaStatus,
    title,
    operation,
    id_cabania,
    capacidad,
    cantidad_piezas,
    precio_por_noche,
    ubicacion,
    servicios_incluidos,
    descripcion_cabania,
    estado_cabania,
    id_estado_cabania,
    setIdCabana,
    setCapacidad,
    setCantidadPiezas,
    setPrecioPorNoche,
    setUbicacion,
    setServiciosIncluidos,
    setDescripcionCabania,
    setEstadoCabania,
    setIdEstadoCabania,
    obtenerNombreEstado,
  };
};

export default useCabana;
