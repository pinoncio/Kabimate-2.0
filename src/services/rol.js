// services/Insti.js
import axios from 'axios';

const url = 'http://localhost:3001/api/roles';

export const getRoles = async () => {
  try {
    const respuesta = await axios.get(`${url}/list`);
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener roles:', error);
    throw error;
  }
};

export const createRol = async (rol) => {
  try {
    const response = await axios.post(url, rol);
    return response.data;
  } catch (error) {
    console.error('Error al crear la rol:', error);
    throw error;
  }
};

export const updateRol = async (id_rol, rol) => {
  try {
    const response = await axios.put(`${url}/update/${id_rol}`, rol);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    throw error;
  }
};

export const deleteRol = async (id_rol) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_rol}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    throw error;
  }
};
