// src/services/EstadoService.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/estadoreservas";

// Función para obtener todos los estados
export const getEstadosPago = async () => {
    try {
      const response = await axios.get(`${API_URL}/list`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los estados de pago:", error);
      throw error;
    }
  };
  
  // Función para obtener un estado de pago por ID
  export const getEstadoPago = async (id_estado) => {
    try {
      const response = await axios.get(`${API_URL}/${id_estado}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el estado de pago con ID ${id_estado}:`, error);
      throw error;
    }
  };