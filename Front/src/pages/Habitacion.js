import React, { useState } from "react";
import { Link } from "react-router-dom";
import useHabitacion from "../Hooks/useHabitacion";
import "../Styles/habitacion.css";

const HabitacionPage = () => {
  const {
    habitaciones,
    tipos,
    pisos,
    estados,
    operation,
    title,
    numero_habitacion,
    capacidad,
    precio_por_noche,
    servicios_incluidos,
    descripcion_habitacion,
    id_tipo_habitacion,
    id_piso_habitacion,
    id_estado_habitacion,
    setNumeroHabitacion,
    setCapacidad,
    setPrecioPorNoche,
    setServiciosIncluidos,
    setDescripcionHabitacion,
    setIdTipoHabitacion,
    setIdPisoHabitacion,
    setIdEstadoHabitacion,
    openModal,
    validar,
    handleToggleHotelStatus,
    obtenerNombreEstado,
    obtenerNombreTipo,
    obtenerNombrePiso,
  } = useHabitacion();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(habitaciones.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHabitaciones = habitaciones.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-light">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "50px" }}
            >
              <Link
                to="/home"
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
              >
                <i className="fa fa-arrow-left"></i> Volver
              </Link>
              <button
                onClick={() => openModal(1)}
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalHabitaciones"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Habitación
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Habitaciones
              </h2>
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NÚMERO</th>
                      <th>CAPACIDAD</th>
                      <th>PRECIO/NOCHE</th>
                      <th>SERVICIOS INCLUIDOS</th>
                      <th>DESCRIPCIÓN</th>
                      <th>TIPO</th>
                      <th>PISO</th>
                      <th>ESTADO HABITACION</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {currentHabitaciones.map((habitacion, i) => (
                      <tr key={habitacion.ID_HABITACION}>
                        <td>{startIndex + i + 1}</td>
                        <td>{habitacion.NUMERO_HABITACION}</td>
                        <td>{habitacion.CAPACIDAD}</td>
                        <td>{habitacion.PRECIO_POR_NOCHE}</td>
                        <td>{habitacion.SERVICIOS_INCLUIDOS}</td>
                        <td>{habitacion.DESCRIPCION_HABITACION}</td>
                        <td>
                          {obtenerNombreTipo(habitacion.ID_TIPO_HABITACION)}
                        </td>
                        <td>
                          {obtenerNombrePiso(habitacion.ID_PISO_HABITACION)}
                        </td>
                        <td>
                          {obtenerNombreEstado(habitacion.ID_ESTADO_HABITACION)}
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={habitacion.ESTADO_HABITACION === true} // Verifica si el estado es verdadero
                              onChange={() =>
                                handleToggleHotelStatus(
                                  habitacion.ID_HABITACION,
                                  habitacion.ESTADO_HABITACION === true
                                    ? false
                                    : true // Cambia el estado de la habitación
                                )
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              openModal(
                                2,
                                habitacion.ID_HABITACION,
                                habitacion.NUMERO_HABITACION,
                                habitacion.CAPACIDAD,
                                habitacion.PRECIO_POR_NOCHE,
                                habitacion.SERVICIOS_INCLUIDOS,
                                habitacion.DESCRIPCION_HABITACION,
                                habitacion.ID_TIPO_HABITACION,
                                habitacion.ID_PISO_HABITACION,
                                habitacion.ESTADO_HABITACION
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalHabitaciones"
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <button
                  className="btn btn-secondary"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Anterior
                </button>
                <span>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        id="modalHabitaciones"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="modalHabitacionesLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalHabitacionesLabel">
                {title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <label className="form-label">Número de Habitación</label>
                  <input
                    type="text"
                    className="form-control"
                    value={numero_habitacion}
                    onChange={(e) => setNumeroHabitacion(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Capacidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Precio por Noche</label>
                  <input
                    type="number"
                    className="form-control"
                    value={precio_por_noche}
                    onChange={(e) => setPrecioPorNoche(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Servicios Incluidos</label>
                  <textarea
                    className="form-control"
                    value={servicios_incluidos}
                    onChange={(e) => setServiciosIncluidos(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={descripcion_habitacion}
                    onChange={(e) => setDescripcionHabitacion(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tipo de Habitación</label>
                  <select
                    className="form-control"
                    name="id_tipo_habitacion"
                    value={id_tipo_habitacion}
                    onChange={(e) => setIdTipoHabitacion(e.target.value)}
                  >
                    <option value="">Seleccione...</option>
                    {tipos.map((tipo) => (
                      <option key={tipo.ID_TIPO} value={tipo.ID_TIPO}>
                        {tipo.NOMBRE_TIPO_HABITACION}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Piso</label>
                  <select
                    className="form-control"
                    name="id_habitacion"
                    value={id_piso_habitacion}
                    onChange={(e) => setIdPisoHabitacion(e.target.value)}
                    style={{ color: "black" }}
                  >
                    <option value="">Seleccione un Piso</option>
                    {pisos.map((piso) => (
                      <option key={piso.ID_PISO} value={piso.ID_PISO}>
                        {piso.NOMBRE_PISO}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
                  {operation === 2 && (
                    <select
                      className="form-control"
                      name="id_estado_habitacion"
                      value={id_estado_habitacion}
                      onChange={(e) => setIdEstadoHabitacion(e.target.value)}
                      style={{ color: "black" }}
                    >
                      <option value="">Seleccione...</option>
                      {estados.map((estado) => (
                        <option key={estado.ID_ESTADO} value={estado.ID_ESTADO}>
                          {estado.NOMBRE_ESTADO}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="d-grid col-6 mx-auto mt-5">
                  <button onClick={() => validar()} className="btn btn-success">
                    {operation === 1 ? "Registrar" : "Actualizar"}
                    <i className="fas fa-save ms-2"></i>
                  </button>
                  <button
                    id="btnCerrar"
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HabitacionPage;
