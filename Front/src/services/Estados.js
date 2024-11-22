// src/services/EstadoService.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/estados";

// Función para obtener todos los estados
export const getEstados = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estados:", error);
    throw error;
  }
};

// Función para obtener un estado por ID
export const getEstado = async (id_estado) => {
  try {
    const response = await axios.get(`${API_URL}/${id_estado}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el estado con ID ${id_estado}:`, error);
    throw error;
  }
};
