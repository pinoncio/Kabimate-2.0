
import axios from 'axios';

const url = 'http://localhost:3001/api/usuarios';

export const getUsersA = async () => {
  try {
    const respuesta = await axios.get(`${url}/list`);
    console.log(respuesta.data)
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener Usuarios:', error);
    throw error;
  }
};

export const createUserA = async (user) => {
  try {
    const response = await axios.post(url, user);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

export const updateUserA = async (id_usuario, user) => {
  try {
    const response = await axios.put(`${url}/update/${id_usuario}`, user);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUserA = async (id_usuario) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

export const getUserA = (id_usuario) => axios.get(`${url}/${id_usuario}`);


export const activateUserA = async (id_usuario, trigger) => {
  try {
    const response = await axios.put(`${url}/activar/${id_usuario}`, { trigger });
    return response.data;
  } catch (error) {
    console.error('Error al activar/desactivar el usuario:', error);
    throw error;
  }
};