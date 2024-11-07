import axios from "axios";

const baseURL = "http://localhost:3001/api/cabanas";

// Crear una nueva cabaña
export const createCabana = async (id_usuario, cabanaData) => {
  try {
    const response = await axios.post(`${baseURL}/${id_usuario}`, cabanaData);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la cabaña:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener una cabaña por su ID
export const getCabana = async (id_cabania) => {
  try {
    const response = await axios.get(`${baseURL}/${id_cabania}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la cabaña:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener todas las cabañas de un usuario
export const getCabanas = async (id_usuario) => {
  try {
    const response = await axios.get(`${baseURL}/list/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener las cabañas del usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Activar o desactivar una cabaña
export const activateCabana = async (id_cabania, activar) => {
  try {
    const response = await axios.put(`${baseURL}/activar/${id_cabania}`, {
      trigger: activar,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al activar/desactivar la cabaña:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Actualizar información de una cabaña
export const updateCabana = async (id_cabania, cabanaData) => {
  try {
    const response = await axios.put(
      `${baseURL}/update/${id_cabania}`,
      cabanaData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la cabaña:",
      error.response?.data || error.message
    );
    throw error;
  }
};
