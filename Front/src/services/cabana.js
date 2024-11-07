import axios from 'axios';

const url = 'http://localhost:3001/api/cabanas';

// Crear una nueva cabaña
export const createCabana = async (id_usuario, cabanaData) => {
  try {
    const response = await axios.post(`${url}/`, { ...cabanaData, id_usuario });
    return response.data;
  } catch (error) {
    console.error('Error al crear la cabaña:', error.response ? error.response.data : error.message);
    throw error;
  }
};


// Obtener una cabaña por su ID
export const getCabana = async (id_cabania) => {
  try {
    const response = await axios.get(`${url}/${id_cabania}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la cabaña:', error);
    throw error;
  }
};

// Obtener todas las cabañas de un usuario
export const getCabanas = async (id_usuario) => {
  try {
    const response = await axios.get(`${url}/list/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las cabañas del usuario:', error);
    throw error;
  }
};

// Activar o desactivar una cabaña
export const activarCabana = async (id_cabania, activar) => {
  try {
    const response = await axios.put(`${url}/activar/${id_cabania}`, { trigger: activar });
    return response.data;
  } catch (error) {
    console.error('Error al activar/desactivar la cabaña:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const updateCabanas = async (id_cabana, cabana) => {
  try {
    const response = await axios.put(`${url}/update/${id_cabana}`, cabana);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};
