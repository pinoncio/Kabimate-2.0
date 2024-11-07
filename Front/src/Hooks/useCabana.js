import { useEffect, useState } from "react";
import { show_alerta } from "../functions";
import {
  getCabanas,
  createCabana,
  updateCabana,
  activateCabana,
} from "../services/Cabana";
import "../Styles/cabana.css";

const useCabana = () => {
  const [cabanas, setCabanas] = useState([]);
  const [id_cabania, setIdCabana] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [cantidad_piezas, setCantidadPiezas] = useState("");
  const [precio_por_noche, setPrecioPorNoche] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [servicios_incluidos, setServiciosIncluidos] = useState("");
  const [descripcion_cabania, setDescripcionCabania] = useState("");
  const [estado_cabania, setEstadoCabania] = useState(true);
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  // Obtén el id del usuario desde sessionStorage
  const id_usuario_cabania = sessionStorage.getItem("idUsuario");

  useEffect(() => {
   getAllCabanas(id_usuario_cabania);
  }, []);

  // Función para obtener todas las cabañas del usuario
  const getAllCabanas = async (idUsuario) => {
    try {
      const cabanasData = await getCabanas(idUsuario);
      setCabanas(cabanasData);
    } catch (error) {
      console.error("Error al obtener cabañas:", error);
    }
  };

  // Función para abrir el modal y pre-cargar los valores según la operación
  const openModal = (
    op,
    id_cabania = "",
    capacidad = "",
    cantidad_piezas = "",
    precio_por_noche = "",
    ubicacion = "",
    servicios_incluidos = "",
    descripcion_cabania = "",
    id_usuario_cabania = sessionStorage.getItem("idUsuario")
  ) => {
    setIdCabana(id_cabania);
    setCapacidad(capacidad);
    setCantidadPiezas(cantidad_piezas);
    setPrecioPorNoche(precio_por_noche);
    setUbicacion(ubicacion);
    setServiciosIncluidos(servicios_incluidos);
    setDescripcionCabania(descripcion_cabania);
    setEstadoCabania(true);
    setOperation(op);
    setTitle(op === 1 ? "Crear cabaña" : "Actualizar cabaña");

    if (!id_usuario_cabania) {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  };

  // Validación de datos de la cabaña
  const validar = async () => {
    const id_usuario_cabania = sessionStorage.getItem("idUsuario"); // Obtener id_usuario_cabania de sessionStorage

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
      // Crear
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
      // Actualizar
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
      };
      updateExistingCabana(id_cabania, parametross);
    }
  };

  // Crear una nueva cabaña
  const createNewCabana = async (id_usuario_cabania, cabanaData) => {
    try {
      const response = await createCabana(id_usuario_cabania, cabanaData);

      if (response && response.msg) {
        show_alerta(response.msg, "success");
        document.getElementById("btnCerrar").click();
        getAllCabanas(id_usuario_cabania); 

        // Agregar la nueva cabaña a la lista sin perder la anterior
        setCabanas((prevCabanas) => [
          ...prevCabanas,
          { 
            ...cabanaData, 
            ID_CABANIA: response.id_cabania 
          }
        ]);
      } else {
        show_alerta("Error desconocido al crear la cabaña", "error");
      }
    } catch (error) {
      console.error("Error al crear cabaña:", error);
      show_alerta("Error al crear la cabaña", "error");
    }
};


  // Actualizar cabaña existente
  const updateExistingCabana = async (id_cabania, cabanaData) => {
    try {
      await updateCabana(id_cabania, cabanaData);
      show_alerta('La cabaña fue editada con éxito.', 'success');

      // Actualizar solo la cabaña modificada en la lista de manera ordenada
      setCabanas((prevCabanas) =>
        prevCabanas.map((cabana) =>
          cabana.ID_CABANIA === id_cabania 
            ? {
                ...cabana, 
                capacidad: cabanaData.capacidad,
                cantidad_piezas: cabanaData.cantidad_piezas,
                precio_por_noche: cabanaData.precio_por_noche,
                ubicacion: cabanaData.ubicacion,
                servicios_incluidos: cabanaData.servicios_incluidos,
                descripcion_cabania: cabanaData.descripcion_cabania,
              }
            : cabana
        )
      );
      document.getElementById('btnCerrar').click();
    } catch (error) {
      console.error('Error al actualizar cabaña:', error);
      show_alerta('Error al actualizar la cabaña', 'error');
    }
};


  // Activar/desactivar cabaña
  const handleToggleCabanaStatus = async (id_cabania, nuevoEstado) => {
    try {
      await activateCabana(id_cabania, nuevoEstado);

      // Actualizar el estado de la cabaña en la lista
      setCabanas((prevCabanas) =>
        prevCabanas.map((cabana) =>
          cabana.ID_CABANIA === id_cabania
            ? { 
                ...cabana, 
                estado_cabania: nuevoEstado 
              }
            : cabana
        )
      );

      const mensaje = nuevoEstado
        ? "Cabaña habilitada con éxito"
        : "Cabaña deshabilitada con éxito";
      show_alerta(mensaje, "success");

      // Recargar cabañas tras el cambio de estado
      await getAllCabanas(sessionStorage.getItem("idUsuario"));
    } catch (error) {
      console.error("Error al activar/desactivar cabaña:", error);
      show_alerta("Error al cambiar el estado de la cabaña", "error");
    }
};


  return {
    cabanas,
    id_cabania,
    capacidad,
    cantidad_piezas,
    precio_por_noche,
    ubicacion,
    servicios_incluidos,
    descripcion_cabania,
    estado_cabania,
    operation,
    title,
    setCapacidad,
    setCantidadPiezas,
    setPrecioPorNoche,
    setUbicacion,
    setServiciosIncluidos,
    setDescripcionCabania,
    setEstadoCabania,
    openModal,
    validar,
    getAllCabanas,
    handleToggleCabanaStatus,
  };
};

export default useCabana;
