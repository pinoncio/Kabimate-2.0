import axios from "axios";

const baseURL = "http://localhost:3001/api/pisos";

// Crear un nuevo piso
export const createPiso = async (id_usuario, pisoData) => {
  try {
    const response = await axios.post(`${baseURL}/${id_usuario}`, pisoData);
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear el piso:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener un piso por su ID
export const getPiso = async (id_piso) => {
  try {
    const response = await axios.get(`${baseURL}/${id_piso}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el piso:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener todos los pisos de un usuario
export const getPisos = async (id_usuario) => {
  try {
    const response = await axios.get(`${baseURL}/list/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener los pisos del usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Activar o desactivar un piso
export const activatePiso = async (id_piso, activar) => {
  try {
    const response = await axios.put(`${baseURL}/activar/${id_piso}`, {
      trigger: activar,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al activar/desactivar el piso:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Actualizar información de un piso
export const updatePiso = async (id_piso, pisoData) => {
  try {
    const response = await axios.put(`${baseURL}/update/${id_piso}`, pisoData);
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar el piso:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Eliminar un piso
export const deletePiso = async (id_piso) => {
  try {
    const response = await axios.delete(`${baseURL}/delete/${id_piso}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al eliminar el piso:",
      error.response?.data || error.message
    );
    throw error;
  }
};
