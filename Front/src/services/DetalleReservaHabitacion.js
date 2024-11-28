import axios from "axios";

const baseUrl = "http://localhost:3001/api/detallereservahabitacionproducto";


export const getDetalleReservasHabitacionByReserva = async (id_reserva) => {
    try {
      const response = await axios.get(`${baseUrl}/list/${id_reserva}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener las reservas del usuario con ID ${id_reserva}:`, error);
      throw error;
    }
  };
