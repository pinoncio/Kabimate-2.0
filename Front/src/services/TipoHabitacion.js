import axios from "axios";

const baseURL = "http://localhost:3001/api/tipohabitacion";

// Obtener todos los tipos de habitación
export const getTipos = async () => {
  try {
    const response = await axios.get(`${baseURL}/list`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la lista de tipos de habitación:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Obtener un tipo de habitación por su ID
export const getTipo = async (id_tipo_habitacion) => {
  try {
    const response = await axios.get(`${baseURL}/${id_tipo_habitacion}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener el tipo de habitación con ID ${id_tipo_habitacion}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};
