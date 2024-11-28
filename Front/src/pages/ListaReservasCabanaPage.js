import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import useReservaCabana from "../Hooks/useReservaCabana";
import "../Styles/ListaC.css";

const ListaCabanaReservas = () => {
  const {
    reservas,
    fecha_inicio,
    fecha_final,
    nombre1_huesped,
    nombre2_huesped,
    apellido1_huesped,
    apellido2_huesped,
    edad_huesped,
    rut_huesped,
    direccion_huesped,
    telefono_huesped,
    anticipo,
    setFechaInicio,
    setFechaFinal,
    setNombre1Huesped,
    setNombre2Huesped,
    setApellido1Huesped,
    setApellido2Huesped,
    setEdadHuesped,
    setRutHuesped,
    setDireccionHuesped,
    setTelefonoHuesped,
    setAnticipo,
    openModal,
    validar,
    deleteReservaById,
    operation,
    closeButtonRef,
  } = useReservaCabana();

  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const formatearRut = (rut) => {
    if (!rut) return "";

    // Elimina los puntos y guiones del RUT
    const soloNumeros = rut.replace(/[^\d]/g, "");

    // Separa el cuerpo del RUT y el dígito verificador
    const cuerpo = soloNumeros.slice(0, -1);
    const dv = soloNumeros.slice(-1);

    // Formatea el cuerpo del RUT con puntos
    const cuerpoFormateado = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${cuerpoFormateado}-${dv}`;
  };

  const [busqueda, setBusqueda] = useState(""); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 3; // Número de reservas por página
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

  const currentReservas = reservasFiltradas.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="lista-reservas-container">
      <h1 className="titulo-reservas">Lista de Reservas</h1>

      <div className="descripcion-reservas">
        <p>
          En esta sección puedes gestionar todas las reservas registradas.
          Puedes buscar reservas específicas usando el campo de búsqueda,
          visualizar los detalles completos de una reserva, actualizar su
          información, o eliminarla si ya no es necesaria.
        </p>
        <ul>
          <li>
            <i className="fas fa-eye "></i> <strong>Visualizar:</strong> Muestra
            los detalles completos de una reserva y agregar productos adicional
            que el cliente quiera añadir.
          </li>
          <li>
            <i className="fas fa-edit"></i> <strong>Editar:</strong> Permite
            actualizar la información de la reserva si el cliente decide cambiar
            su desición.
          </li>
          <li>
            <i className="fas fa-trash"></i> <strong>Eliminar:</strong> Borra
            permanentemente la reserva en el caso que el cliente quiera cancelar
            su reserva
          </li>
        </ul>
      </div>

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
                  <td>{formatearRut(reserva.RUT_HUESPED)}</td>
                  <td>{reserva.DIRECCION_HUESPED}</td>
                  <td>{reserva.TELEFONO_HUESPED}</td>
                  <td>${reserva.ANTICIPO}</td>
                  <td>${reserva.TOTAL}</td>
                  <td>
                    <button
                      className="btn-visualizar btn-success"
                      onClick={() =>
                        navigate(`/Creserva/${reserva.ID_RESERVA_CABANIA}`)
                      } // Navegar a la ruta con el ID de reserva
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn-actualizar btn-warning"
                      onClick={() =>
                        openModal(
                          2,
                          reserva.ID_RESERVA_CABANIA,
                          reserva.FECHA_INICIO,
                          reserva.FECHA_FINAL,
                          reserva.NOMBRE1_HUESPED,
                          reserva.NOMBRE2_HUESPED,
                          reserva.APELLIDO1_HUESPED,
                          reserva.APELLIDO2_HUESPED,
                          reserva.EDAD_HUESPED,
                          reserva.RUT_HUESPED,
                          reserva.DIRECCION_HUESPED,
                          reserva.TELEFONO_HUESPED,
                          reserva.ANTICIPO
                        )
                      }
                      data-bs-toggle="modal"
                      data-bs-target="#modalReservas"
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
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
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
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
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
      <div id="modalReservas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Reserva</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              {/* Fecha de Inicio */}
              <div className="mb-2">
                <strong>Fecha de Inicio</strong>
              </div>
              <input
                type="date"
                className="form-control"
                value={fecha_inicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />

              {/* Fecha de Finalización */}
              <div className="mb-2">
                <strong>Fecha de Finalización</strong>
              </div>
              <input
                type="date"
                className="form-control"
                value={fecha_final}
                onChange={(e) => setFechaFinal(e.target.value)}
              />

              {/* Nombre del Huesped */}
              <div className="mb-2">
                <strong>Nombre del Huesped</strong>
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Nombre 1"
                  value={nombre1_huesped}
                  onChange={(e) => setNombre1Huesped(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Nombre 2"
                  value={nombre2_huesped}
                  onChange={(e) => setNombre2Huesped(e.target.value)}
                />
              </div>

              {/* Apellido del Huesped */}
              <div className="mb-2">
                <strong>Apellido del Huesped</strong>
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mr-2"
                  placeholder="Apellido 1"
                  value={apellido1_huesped}
                  onChange={(e) => setApellido1Huesped(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido 2"
                  value={apellido2_huesped}
                  onChange={(e) => setApellido2Huesped(e.target.value)}
                />
              </div>

              {/* Edad del Huesped */}
              <div className="mb-2">
                <strong>Edad del Huesped</strong>
              </div>
              <input
                type="number"
                className="form-control"
                value={edad_huesped}
                onChange={(e) => setEdadHuesped(e.target.value)}
              />

              {/* RUT del Huesped */}
              <div className="mb-2">
                <strong>RUT del Huesped</strong>
              </div>
              <input
                type="text"
                className="form-control"
                value={rut_huesped}
                onChange={(e) => setRutHuesped(e.target.value)}
              />

              {/* Dirección del Huesped */}
              <div className="mb-2">
                <strong>Dirección del Huesped</strong>
              </div>
              <input
                type="text"
                className="form-control"
                value={direccion_huesped}
                onChange={(e) => setDireccionHuesped(e.target.value)}
              />

              {/* Teléfono del Huesped */}
              <div className="mb-2">
                <strong>Teléfono del Huesped</strong>
              </div>
              <input
                type="text"
                className="form-control"
                value={telefono_huesped}
                onChange={(e) => setTelefonoHuesped(e.target.value)}
              />

              {/* Anticipo */}
              <div className="mb-2">
                <strong>Anticipo</strong>
              </div>
              <input
                type="number"
                className="form-control"
                value={anticipo}
                onChange={(e) => setAnticipo(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeButtonRef}
              >
                Cerrar
              </button>
              <button onClick={() => validar()} className="btn btn-success">
                {operation === 1 ? "Registrar" : "Actualizar"}
                <i className="fas fa-save ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaCabanaReservas;
