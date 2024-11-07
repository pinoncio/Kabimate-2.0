// services/Insti.js
import axios from "axios";

const url = "http://localhost:3001/api/instituciones";

export const getInstituciones = async () => {
  try {
    const respuesta = await axios.get(`${url}/list`);
    return respuesta.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener instituciones:", error);
    throw new Error("No se pudo obtener la lista de instituciones."); // Lanzar error más descriptivo
  }
};

export const createInstitucion = async (institucion) => {
  try {
    const response = await axios.post(url, institucion);
    return response.data; // Retorna los datos de la nueva institución creada
  } catch (error) {
    console.error("Error al crear la institución:", error);
    throw new Error("No se pudo crear la institución."); // Lanzar error más descriptivo
  }
};

export const updateInstitucion = async (id_institucion, institucion) => {
  try {
    const response = await axios.put(
      `${url}/update/${id_institucion}`,
      institucion
    );
    return response.data; // Retorna los datos de la institución actualizada
  } catch (error) {
    console.error("Error al actualizar la institución:", error);
    throw new Error("No se pudo actualizar la institución."); // Lanzar error más descriptivo
  }
};

export const deleteInstitucion = async (id_institucion) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_institucion}`);
    return response.data; // Retorna los datos de la institución eliminada
  } catch (error) {
    console.error("Error al eliminar la institución:", error);
    throw new Error("No se pudo eliminar la institución."); // Lanzar error más descriptivo
  }
};

export const activarInstitucion = async (id_institucion, trigger) => {
  try {
    const response = await axios.put(`${url}/activar/${id_institucion}`, {
      trigger,
    });
    return response.data;
  } catch (error) {
    console.error("Error al activar/desactivar la institucion:", error);
    throw error;
  }
};
