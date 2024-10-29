
import axios from 'axios';

const url = 'http://localhost:3001/api/usuarios';

export const getUsers = async () => {
  try {
    const respuesta = await axios.get(`${url}/list`);
    console.log(respuesta.data)
    return respuesta.data;
  } catch (error) {
    console.error('Error al obtener Usuarios:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const response = await axios.post(url, user);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

export const updateUser = async (id_usuario, user) => {
  try {
    const response = await axios.put(`${url}/update/${id_usuario}`, user);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

export const deleteUser = async (id_usuario) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

export const getUser = (id_usuario) => axios.get(`${url}/${id_usuario}`);


export const activateUser = async (id_usuario) => {
  try {
    const response = await axios.put(`${url}/activar/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al activar el usuario:', error);
    throw error;
  }
};

// Desactivar usuario
export const deactivateUser = async (id_usuario) => {
  try {
    const response = await axios.put(`${url}/desactivar/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al desactivar el usuario:', error);
    throw error;
  }
};