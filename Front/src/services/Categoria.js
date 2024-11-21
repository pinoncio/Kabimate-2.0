import axios from 'axios';

const url = 'http://localhost:3001/api/categorias';

// Obtener todas las categorías
export const getCategorias = async (id_usuario) => {
  try {
    const respuesta = await axios.get(`${url}/list/${id_usuario}`);
    return respuesta.data;
  } catch (error) {
    console.error(
        'Error al obtener categorías:',
        error.response?.data || error.message
    );
    throw error;
  }
};

export const getCategoria = async (id_categoria) => {
  try {
    const response = await axios.get(`${url}/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la categoria:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Crear una nueva categoría
export const createCategoria = async (id_usuario, categoriaData) => {
  try {
    const response = await axios.post(`${url}/${id_usuario}`, categoriaData );
    return response.data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw error;
  }
};

// Actualizar una categoría
export const updateCategoria = async (id_categoria, categoriaData) => {
  try {
    const response = await axios.put(`${url}/update/${id_categoria}`, categoriaData );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategoria = async (id_categoria) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    throw error;
  }
};

// Activar o desactivar una categoría
export const activarCategoria = async (id_categoria, trigger) => {
  try {
    const response = await axios.put(`${url}/activar/${id_categoria}`, { trigger });
    return response.data;
  } catch (error) {
    console.error('Error al activar/desactivar la categoría:', error);
    throw error;
  }
};
