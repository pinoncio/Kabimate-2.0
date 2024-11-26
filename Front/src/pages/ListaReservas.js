import React, { useState } from "react";
import useReservaCabana from "../Hooks/useReservaCabana";
import { show_alerta } from "../functions";
import "../Styles/ListaC.css";

const ListaReservas = () => {
  const { 
    reservas, 
    deleteReservaById,
  } = useReservaCabana();

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de reservas por página
  const totalPages = reservas ? Math.ceil(reservas.length / itemsPerPage) : 0; // Total de páginas

  const startIndex = (currentPage - 1) * itemsPerPage;

  // Filtrar reservas según la búsqueda
  const reservasFiltradas = reservas.filter((reserva) =>
    (
      `${reserva.NOMBRE1_HUESPED} ${reserva.NOMBRE2_HUESPED} ` +
      `${reserva.APELLIDO1_HUESPED} ${reserva.APELLIDO2_HUESPED}`
    )
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const currentReservas = reservasFiltradas.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="lista-reservas-container">
      <h1 className="titulo-reservas">Lista de Reservas</h1>

      <div className="campo-busqueda">
        <input
          type="text"
          className="input-busqueda"
          placeholder="🔍 Buscar por nombre del cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {reservasFiltradas.length === 0 ? (
        <p className="sin-reservas">No hay reservas disponibles.</p>
      ) : (
        <div className="tabla-reservas-container">
          <table className="tabla-reservas">
            <thead>
              <tr>
                <th>#</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Nombre del Huesped</th>
                <th>Edad del Huesped</th>
                <th>RUT del Huesped</th>
                <th>Dirección del Huesped</th>
                <th>Teléfono del Huesped</th>
                <th>Anticipo</th>
                <th>Total Nuevo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentReservas.map((reserva, i) => (
                <tr key={reserva.ID_RESERVA_CABANIA}>
                  <td>{startIndex + i + 1}</td>
                  <td>{formatearFecha(reserva.FECHA_INICIO)}</td>
                  <td>{formatearFecha(reserva.FECHA_FINAL)}</td>
                  <td>
                    {reserva.NOMBRE1_HUESPED} {reserva.NOMBRE2_HUESPED}{" "}
                    {reserva.APELLIDO1_HUESPED} {reserva.APELLIDO2_HUESPED}
                  </td>
                  <td>{reserva.EDAD_HUESPED} años</td>
                  <td>{reserva.RUT_HUESPED}</td>
                  <td>{reserva.DIRECCION_HUESPED}</td>
                  <td>{reserva.TELEFONO_HUESPED}</td>
                  <td>${reserva.ANTICIPO}</td>
                  <td>${reserva.TOTAL}</td>
                  <td>
                    <button
                      className="btn-visualizar btn-success"
                      onClick={() => reserva.ID_RESERVA_CABANIA}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn-editar btn-warning"
                      onClick={() => reserva.ID_RESERVA_CABANIA}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => 
                        deleteReservaById(reserva.ID_RESERVA_CABANIA)
                      }
                      className="btn-eliminar btn-danger"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => changePage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ListaReservas;
