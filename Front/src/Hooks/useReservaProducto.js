import { useState, useEffect, useCallback } from "react";
import { getProductos } from "../services/producto";
import {
  agregarProductoReservaCabania,
  updateProductoReservaCabania, // Cambié de eliminar a actualizar
  getReservaById, // Asegúrate de que esta función está disponible en el servicio
} from "../services/ReservaCabaña";
import { show_alerta } from "../functions";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router-dom";

const useReservaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [reserva, setReserva] = useState(null);
  const { id_reserva } = useParams();
  const [cantidad, setCantidad] = useState(0);
  const [id_producto, setIdProducto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id_usuario = localStorage.getItem("idUsuario");

  // Ejecutar cuando cambia el id_usuario o id_reserva
  useEffect(() => {
      fetchReserva(id_reserva);
      fetchAllProductos(id_usuario);
  }, );

  // Cargar productos
  const fetchAllProductos = async (id_usuario) => {
    try {
      const productosData = await getProductos(id_usuario);
      setProductos(Array.isArray(productosData) ? productosData : []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setProductos([]);
    }
  };

  // Cargar los detalles de la reserva
  const fetchReserva = async (id_reserva) => {
    try {
      const reservaData = await getReservaById(id_reserva);
      setReserva(reservaData);
    } catch (error) {
      console.error("Error al obtener reserva:", error);
    }
  };

  // Agregar producto a la reserva
  const agregarProducto = async () => {
    console.log(
      "Agregando producto con id:",
      id_producto,
      "y cantidad:",
      cantidad
    );
    try {
      const parametros = { id_producto, cantidad };
      const response = await agregarProductoReservaCabania(
        id_reserva,
        parametros
      );
      show_alerta(response.msg, "success");

      // Actualizar la reserva y los productos después de agregar el producto
      fetchReserva(id_reserva);
      fetchAllProductos(id_usuario); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error al agregar producto:", error);
      show_alerta("Hubo un problema al agregar el producto.", "error");
    }
  };

  // Actualizar producto en la reserva
  const actualizarProducto = async () => {
    try {
      // Los parámetros para actualizar el producto
      const parametros = {
        id_producto,
        cantidad,
      };
      const response = await updateProductoReservaCabania(
        id_reserva,
        parametros
      );
      show_alerta(response.msg, "success");

      // Actualizar la reserva y los productos después de actualizar el producto
      fetchReserva(id_reserva);
      fetchAllProductos(id_usuario); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error al actualizar producto en la reserva:", error);
      show_alerta(
        "Hubo un problema al actualizar el producto en la reserva.",
        "error"
      );
    }
  };

  // Obtener el nombre del producto
  const obtenerNombreProducto = (id_producto) => {
    const producto = productos.find((p) => p.ID_PRODUCTO === id_producto);
    return producto ? producto.NOMBRE_PRODUCTO : "Sin categoría";
  };

  return {
    productos,
    reserva,
    cantidad,
    setCantidad,
    id_producto,
    setIdProducto,
    agregarProducto,
    actualizarProducto,
    obtenerNombreProducto,
    loading,
    error,
  };
};

export default useReservaProductos;
