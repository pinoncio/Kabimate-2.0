import axios from 'axios';

const url = 'http://localhost:3001/api/productos';

// Obtener todos los productos
export const getProductos = async (id_usuario) => {
  try {
    const respuesta = await axios.get(`${url}/list/${id_usuario}`);
    return respuesta.data;
  } catch (error) {
    console.error(
        'Error al obtener productos:',
        error.response?.data || error.message
    );
    throw error;
  }
};

export const getProducto = async (id_producto) => {
  try {
    const response = await axios.get(`${url}/${id_producto}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener el producto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Crear un nuevo producto
export const createProducto = async (id_usuario, productoData) => {
  try {
    const response = await axios.post(`${url}/${id_usuario}`, productoData );
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

// Actualizar un producto
export const updateProducto = async (id_producto, productoData) => {
  try {
    const response = await axios.put(`${url}/update/${id_producto}`, productoData );
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const deleteProducto = async (id_producto) => {
  try {
    const response = await axios.delete(`${url}/delete/${id_producto}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

// Activar o desactivar un producto
export const activarProducto = async (id_producto, trigger) => {
  try {
    const response = await axios.put(`${url}/activar/${id_producto}`, { trigger });
    return response.data;
  } catch (error) {
    console.error('Error al activar/desactivar el producto:', error);
    throw error;
  }
};
