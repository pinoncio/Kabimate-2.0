import axios from "axios";

const baseURL = "http://localhost:3001/api/habitaciones";

// Crear una nueva habitación
export const createHabitacion = async (id_usuario, habitacionData) => {
  try {
    const response = await axios.post(
      `${baseURL}/${id_usuario}`,
      habitacionData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al crear la habitación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Actualizar una habitación existente
export const updateHabitacion = async (id_habitacion, habitacionData) => {
  try {
    const response = await axios.put(
      `${baseURL}/update/${id_habitacion}`,
      habitacionData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error al actualizar la habitación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Activar o desactivar una habitación
export const activateHabitacion = async (id_habitacion, activar) => {
  try {
    // Realizando la solicitud PUT para activar o desactivar la habitación
    const response = await axios.put(`${baseURL}/activar/${id_habitacion}`, {
      trigger: activar, // 1 para activar, 0 para desactivar
    });

    // Retornar la respuesta si la solicitud fue exitosa
    return response.data;
  } catch (error) {
    // Captura del error y muestra de un mensaje en consola
    console.error(
      "Error al activar/desactivar la habitación:",
      error.response?.data || error.message
    );

    // Lanza el error para ser manejado por el componente que llama a la función
    throw error;
  }
};

// Obtener todas las habitaciones de un usuario
export const getHabitaciones = async (id_usuario) => {
  try {
    const response = await axios.get(`${baseURL}/list/${id_usuario}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la lista de habitaciones:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener una habitación específica
export const getHabitacion = async (id_habitacion) => {
  try {
    const response = await axios.get(`${baseURL}/${id_habitacion}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la habitación:",
      error.response?.data || error.message
    );
    throw error;
  }
};
