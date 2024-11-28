import { useState, useEffect } from "react";
import { getProductos } from "../services/producto";
import {
  agregarProductoReservaHabitacion,
  updateProductoReservaHabitacion,
  getReservaById,
} from "../services/ReservaHabitacion";
import { getDetalleReservasHabitacionByReserva } from "../services/DetalleReservaHabitacion";
import { show_alerta } from "../functions";
import { useParams } from "react-router-dom";

const useReservaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [reserva, setReserva] = useState(null);
  const [detalleReservas, setDetalleReservas] = useState([]);
  const { id_reserva } = useParams();
  const [cantidad, setCantidad] = useState(0);
  const [id_producto, setIdProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id_usuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    fetchReserva(id_reserva);
    fetchAllProductos(id_usuario);
    fetchDetalleReserva(id_reserva);
  }, []);

  const fetchAllProductos = async (id_usuario) => {
    try {
      const productosData = await getProductos(id_usuario);
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]);
    }
  };

  const fetchReserva = async (id_reserva) => {
    try {
      const reservaData = await getReservaById(id_reserva);
      setReserva(reservaData);
    } catch (error) {
      console.error("Error al obtener reserva:", error);
    }
  };

  const fetchDetalleReserva = async (id_reserva) => {
    try {
      const DetalleReservaData = await getDetalleReservasHabitacionByReserva(
        id_reserva
      );
      setDetalleReservas(
        Array.isArray(DetalleReservaData) ? DetalleReservaData : []
      );
    } catch (error) {
      console.error("Error al obtener detalle de reserva:", error);
    }
  };

  const agregarProducto = async () => {
    try {
      const parametros = { id_producto, cantidad };
      const response = await agregarProductoReservaHabitacion(
        id_reserva,
        parametros
      );
      show_alerta(response.msg, "success");

      // Actualizar reserva y detalle de reserva
      await fetchReserva(id_reserva);
      await fetchDetalleReserva(id_reserva);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      show_alerta("Hubo un problema al agregar el producto.", "error");
    }
  };

  const actualizarProducto = async () => {
    try {
      const parametros = {
        id_producto,
        cantidad,
      };
      const response = await updateProductoReservaHabitacion(
        id_reserva,
        parametros
      );
      show_alerta(response.msg, "success");

      // Actualizar reserva y detalle de reserva
      await fetchReserva(id_reserva);
      await fetchDetalleReserva(id_reserva);
    } catch (error) {
      console.error("Error al actualizar producto en la reserva:", error);
      show_alerta(
        "Hubo un problema al actualizar el producto en la reserva.",
        "error"
      );
    }
  };

  const obtenerNombreProducto = (id_producto) => {
    const producto = productos.find((p) => p.ID_PRODUCTO === id_producto);
    return producto ? producto.NOMBRE_PRODUCTO : "Sin categoría";
  };

  return {
    productos,
    reserva,
    detalleReservas,
    setDetalleReservas,
    cantidad,
    setCantidad,
    id_producto,
    setIdProducto,
    agregarProducto,
    actualizarProducto,
    obtenerNombreProducto,
    loading,
    error,
    setError,
    setLoading,
  };
};

export default useReservaProductos;
