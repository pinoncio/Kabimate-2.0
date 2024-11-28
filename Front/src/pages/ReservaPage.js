import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReservaById } from "../services/ReservaCabaña";
import useReservaProductos from "../Hooks/useReservaProducto";
import "../Styles/ReservaProducto.css";

export default function ReservaPage() {
  const [reserva, setReserva] = useState(null); // Estado para almacenar los datos de la reserva
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null); // Para manejar errores
  const { id_reserva } = useParams(); // Obtener el ID de la reserva desde la URL

  const {
    productos,
    cantidad,
    setCantidad,
    id_producto,
    setIdProducto,
    agregarProducto,
    actualizarProducto,
    detalleReservas,
    obtenerNombreProducto,
  } = useReservaProductos();

  const [isModalOpen, setModalOpen] = useState(false); // Control del modal
  const [modalAction, setModalAction] = useState(""); // Acción actual (agregar o actualizar)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const toggleModal = (action, producto = null) => {
    console.log("Modal toggling with action:", action);
    setModalAction(action);
    setProductoSeleccionado(producto); // Guarda el producto que se quiere editar
    setModalOpen(!isModalOpen);
  };

  // Función para formatear las fechas de dd/mm/yyyy
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Cargar los datos de la reserva
  useEffect(() => {
    const fetchReserva = async () => {
      setLoading(true);
      setError(null);
      try {
        const reservaData = await getReservaById(id_reserva); // Obtener los datos de la reserva
        setReserva(reservaData); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error al obtener reserva:", error);
        setError("Error al obtener reserva");
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id_reserva]);

  useEffect(() => {
    if (modalAction === "actualizar" && productoSeleccionado) {
      setIdProducto(
        productoSeleccionado.ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO
      );
      setCantidad(productoSeleccionado.CANTIDAD);
    }
  }, [modalAction, productoSeleccionado, setIdProducto, setCantidad]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!reserva) return <p>No se encontró la reserva.</p>;

  // Concatenar los nombres y apellidos
  const fullName = `${reserva.NOMBRE1_HUESPED} ${reserva.NOMBRE2_HUESPED} ${reserva.APELLIDO1_HUESPED} ${reserva.APELLIDO2_HUESPED}`;

  return (
    <div className="reserva-page">
      <form className="reserva-form">
        <div className="reserva-field-container">
          <div className="reserva-field">
            <label htmlFor="fecha_inicio" className="reserva-label">
              Fecha de Inicio
            </label>
            <input
              type="text"
              id="fecha_inicio"
              value={formatFecha(reserva.FECHA_INICIO)}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="fecha_final" className="reserva-label">
              Fecha de Finalización
            </label>
            <input
              type="text"
              id="fecha_final"
              value={formatFecha(reserva.FECHA_FINAL)}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="nombre_huesped" className="reserva-label">
              Nombre del Huésped
            </label>
            <input
              type="text"
              id="nombre_huesped"
              value={fullName}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="edad_huesped" className="reserva-label">
              Edad del Huésped
            </label>
            <input
              type="number"
              id="edad_huesped"
              value={reserva.EDAD_HUESPED}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>
        </div>

        <div className="reserva-field-container">
          <div className="reserva-field">
            <label htmlFor="rut_huesped" className="reserva-label">
              RUT del Huésped
            </label>
            <input
              type="text"
              id="rut_huesped"
              value={reserva.RUT_HUESPED}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="direccion_huesped" className="reserva-label">
              Dirección del Huésped
            </label>
            <input
              type="text"
              id="direccion_huesped"
              value={reserva.DIRECCION_HUESPED}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="telefono_huesped" className="reserva-label">
              Teléfono del Huésped
            </label>
            <input
              type="text"
              id="telefono_huesped"
              value={reserva.TELEFONO_HUESPED}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>

          <div className="reserva-field">
            <label htmlFor="anticipo" className="reserva-label">
              Anticipo
            </label>
            <input
              type="text"
              id="anticipo"
              value={`$ ${reserva.ANTICIPO.toLocaleString()}`}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>
        </div>

        <div className="reserva-field-container">
          <div className="reserva-field">
            <label htmlFor="total" className="reserva-label">
              Total
            </label>
            <input
              type="text"
              id="total"
              value={`$ ${reserva.TOTAL.toLocaleString()}`}
              readOnly
              className="reserva-input readonly-input"
            />
          </div>
        </div>
        <h3>Productos en la Reserva</h3>
        <table className="reserva-table-detalle-producto">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalleReservas.map((detalle) => (
              <tr key={detalle.ID_DETALLE_RESERVA_CABANIA_PRODUCTO}>
                <td>
                  {obtenerNombreProducto(
                    detalle.ID_PRODUCTO_DETALLE_RESERVA_CABANIA_PRODUCTO
                  )}
                </td>
                <td>{detalle.CANTIDAD}</td>
                <td>{`$ ${detalle.TOTAL.toLocaleString()}`}</td>
                <td>
                  <button
                    type="button"
                    className="reserva-button"
                    onClick={() => toggleModal("actualizar", detalle)}
                  >
                    Actualizar Producto Adicional
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="reserva-actions">
          <Link to="/reservasC">
            <button type="button" className="reserva-button volver-button">
              Volver
            </button>
          </Link>
          <button
            type="button"
            className="reserva-button"
            onClick={() => toggleModal("agregar")}
          >
            Agregar Producto Adicional
          </button>
        </div>
      </form>
      {isModalOpen && (
        <div className={`modal-producto ${isModalOpen ? "show" : ""}`}>
          <div className="modal-content-producto">
            <h3>
              {modalAction === "agregar"
                ? "Agregar Producto"
                : "Actualizar Producto"}
            </h3>
            <div className="modal-field-producto">
              <label htmlFor="producto">Producto</label>
              <select
                id="producto"
                value={id_producto || ""}
                onChange={(e) => setIdProducto(Number(e.target.value))}
              >
                <option value="">Seleccionar producto</option>
                {productos.map((producto) => (
                  <option
                    key={producto.ID_PRODUCTO}
                    value={producto.ID_PRODUCTO}
                  >
                    {producto.NOMBRE_PRODUCTO}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-field-producto">
              <label htmlFor="cantidad">Cantidad</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad || ""}
                onChange={(e) => setCantidad(Number(e.target.value))}
                min="1"
              />
            </div>
            <div className="modal-actions-producto">
              <button
                type="button"
                className="modal-button-producto"
                onClick={() => {
                  modalAction === "agregar"
                    ? agregarProducto()
                    : actualizarProducto();
                  toggleModal();
                }}
              >
                {modalAction === "agregar" ? "Agregar" : "Actualizar"}
              </button>
              <button
                type="button"
                className="modal-button-producto modal-button-cancel-producto"
                onClick={toggleModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
