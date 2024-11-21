import { useEffect, useState } from "react";
import { show_alerta } from "../functions";
import {
  getPisos,
  createPiso,
  updatePiso,
  activatePiso,
} from "../services/Pisos";

const usePisos = () => {
  const [pisos, setPisos] = useState([]);
  const [id_piso, setIdPiso] = useState("");
  const [nombre_piso, setNombrePiso] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const id_usuario_piso = localStorage.getItem("idUsuario");

  useEffect(() => {
    getAllPisos(id_usuario_piso);
  }, [id_usuario_piso]);

  const getAllPisos = async (idUsuario) => {
    try {
      const pisosData = await getPisos(idUsuario);
      // Ordenar pisos por ID_PISO antes de actualizar el estado
      const sortedPisos = pisosData.sort((a, b) => a.ID_PISO - b.ID_PISO);
      setPisos(sortedPisos);
    } catch (error) {
      console.error("Error al obtener los pisos:", error);
    }
  };

  const openModal = (
    op,
    id_piso = "",
    nombre_piso = "",
    id_usuario_piso = localStorage.getItem("idUsuario")
  ) => {
    setIdPiso(id_piso);
    setNombrePiso(nombre_piso);
    setOperation(op);
    setTitle(op === 1 ? "Crear piso" : "Actualizar piso");

    if (!id_usuario_piso) {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  };

  const validar = async () => {
    const id_usuario_piso = localStorage.getItem("idUsuario");

    const validarCreacion = () => {
      return nombre_piso.trim() === "";
    };

    const validarActualizacion = () => {
      return nombre_piso.trim() === "";
    };

    if (operation === 1) {
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        nombre_piso: nombre_piso.trim(),
      };
      createNewPiso(id_usuario_piso, parametros);
    } else {
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        nombre_piso: nombre_piso.trim(),
      };
      updateExistingPiso(id_piso, parametross);
    }
  };

  const createNewPiso = async (id_usuario_piso, pisoData) => {
    try {
      const response = await createPiso(id_usuario_piso, pisoData);
      show_alerta(response.msg, "success");
      // Recargar la lista de pisos después de la creación
      getAllPisos(id_usuario_piso);
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al crear el piso:", error);
      show_alerta("Error al crear el piso", "error");
    }
  };

  const updateExistingPiso = async (id_piso, pisoData) => {
    try {
      await updatePiso(id_piso, pisoData);
      show_alerta("El piso fue editado con éxito.", "success");
      // Recargar la lista de pisos después de la actualización y ordenarla
      const id_usuario_piso = localStorage.getItem("idUsuario");
      getAllPisos(id_usuario_piso);
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al actualizar el piso:", error);
      show_alerta("Error al actualizar el piso", "error");
    }
  };

  const handleTogglePisoStatus = async (id_piso, nuevoEstado) => {
    try {
      await activatePiso(id_piso, nuevoEstado);

      setPisos((prevPisos) =>
        prevPisos.map((piso) =>
          piso.ID_PISO === id_piso
            ? { ...piso, ESTADO_PISO: nuevoEstado }
            : piso
        )
      );

      const mensaje = nuevoEstado
        ? "Piso habilitado con éxito"
        : "Piso deshabilitado con éxito";
      show_alerta(mensaje, "success");
    } catch (error) {
      console.error("Error al cambiar el estado del piso:", error);
      show_alerta("Error al cambiar el estado del piso", "error");
    }
  };

  return {
    pisos,
    id_piso,
    nombre_piso,
    title,
    operation,
    getAllPisos,
    openModal,
    validar,
    handleTogglePisoStatus,
    setIdPiso,
    setNombrePiso,
  };
};

export default usePisos;
