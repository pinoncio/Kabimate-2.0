import axios from "axios";

const baseUrl = "http://localhost:3001/api/reservascabania";

// Función para obtener todas las reservas de un usuario
export const getReservasByUsuario = async (id_usuario) => {
  try {
    const response = await axios.get(`${baseUrl}/list/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener las reservas del usuario con ID ${id_usuario}:`, error);
    throw error;
  }
};

// Función para obtener una reserva específica por ID
export const getReservaById = async (id_reserva) => {
  try {
    const response = await axios.get(`${baseUrl}/${id_reserva}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la reserva con ID ${id_reserva}:`, error);
    throw error;
  }
};

// Función para crear una nueva reserva para un usuario
export const createReserva = async (id_usuario, reserva) => {
  try {
    const response = await axios.post(`${baseUrl}/${id_usuario}`, reserva);
    return response.data;
  } catch (error) {
    console.error(`Error al crear una reserva para el usuario con ID ${id_usuario}:`, error);
    throw error;
  }
};

// Función para actualizar una reserva por su ID
export const updateReserva = async (id_reserva, updatedReserva) => {
  try {
    const response = await axios.put(`${baseUrl}/update/${id_reserva}`, updatedReserva);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la reserva con ID ${id_reserva}:`, error);
    throw error;
  }
};

// Función para eliminar una reserva por su ID
export const deleteReserva = async (id_reserva) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete/${id_reserva}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la reserva con ID ${id_reserva}:`, error);
    throw error;
  }
};

// Función para agregar un producto a una reserva
export const agregarProductoReservaCabania = async (id_reserva, productoData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/agregarproducto/${id_reserva}`,
      productoData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al agregar el producto a la reserva con ID ${id_reserva}:`,
      error
    );
    throw error;
  }
};

// Función para actualizar un producto en una reserva
export const updateProductoReservaCabania = async (id_reserva, productoData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/updateproducto/${id_reserva}`,
      productoData
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar el producto en la reserva con ID ${id_reserva}:`,
      error
    );
    throw error;
  }
};
