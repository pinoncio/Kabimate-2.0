import React, { useState } from "react";
import { Link } from "react-router-dom";
import useHabitacion from "../Hooks/useHabitacion";
import { show_alerta } from "../functions";
import "../Styles/Crud.css";

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
    id_piso,
    id_estado,
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
  const itemsPerPage = 4;
  const totalPages = habitaciones
    ? Math.ceil(habitaciones.length / itemsPerPage)
    : 0;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentHabitaciones = habitaciones.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showHelp = () => {
    show_alerta(
      " Guía de Gestión de Habitaciones\n\n" +
        "En este apartado puedes gestionar las habitaciones del sistema. A continuación, te explicamos las acciones disponibles y qué hace cada botón:\n\n" +
        "<b>1. <i class='fas fa-plus-circle'></i> Añadir Habitación:</b>\n" +
        "   - Este botón te permite agregar una nueva habitación al sistema. Antes de crear una habitación, verifica si el piso en el que se encuentra ya está registrado. Si no es así, deberás crear el piso primero. Al hacer clic, se abrirá un formulario donde podrás ingresar los detalles de la habitación, incluyendo el piso en el que se encuentra.\n\n" +
        "<b>2. <i class='fas fa-edit'></i> Editar Habitación:</b>\n" +
        "   - Cuando quieras modificar los detalles de una habitación existente, selecciona la opción de editar. Podrás cambiar el nombre, tipo, capacidad y otros atributos de la habitación.\n\n" +
        "<b>3. <i class='fas fa-toggle-on'></i> Activar/Desactivar Estado:</b>\n" +
        "   - Este botón te permite activar o desactivar la habitación según su disponibilidad. Si una habitación está inactiva, no estará disponible para los usuarios del sistema.\n\n" +
        "<b>¿Qué debes hacer?</b>\n" +
        "   - Antes de añadir una habitación, asegúrate de que el piso en el que se encuentra esté registrado. Si no existe, crea el piso antes de añadir la habitación. Luego, podrás gestionar las habitaciones añadiendo nuevas, editando detalles y activando o desactivando su disponibilidad según lo necesites para la gestión de reservas en el sistema.",
      "info",
      "",
      "1200px",
      "14px"
    );
  };

  return (
    <div className="bg-light">
      <div className="background">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div
                className="d-flex justify-content-between"
                style={{ marginTop: "50px" }}
              >
                <Link
                  to="/homeH"
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
                  <i className="fa fa-plus-circle "></i> Añadir Habitación
                </button>
                <button onClick={showHelp} class="btn-circle btn-danger">
                  <i class="fa fa-question-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
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
                            {obtenerNombreTipo(
                              habitacion.ID_TIPO_HABITACION_HABITACION
                            )}
                          </td>
                          <td>
                            {obtenerNombrePiso(habitacion.ID_PISO_HABITACION)}
                          </td>
                          <td>
                            {obtenerNombreEstado(
                              habitacion.ID_ESTADO_HABITACION
                            )}
                          </td>
                          <td>
                            <label className="switch">
                              <input
                                type="checkbox"
                                checked={habitacion.ESTADO_HABITACION === true}
                                onChange={() =>
                                  handleToggleHotelStatus(
                                    habitacion.ID_HABITACION,
                                    !habitacion.ESTADO_HABITACION
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
                                  habitacion.ID_TIPO_HABITACION_HABITACION,
                                  habitacion.ID_PISO_HABITACION,
                                  habitacion.ID_ESTADO_HABITACION
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
                {/* Paginación */}
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
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
                  <label className="form-label">Piso</label>
                  <p>(Recuerde si no existe el piso, debe registrarlo )</p>
                  <select
                    className="form-control"
                    name="id_piso"
                    value={id_piso}
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
                  <label className="form-label">Número de Habitación</label>
                  <input
                    type="text"
                    className="form-control"
                    value={numero_habitacion}
                    onChange={(e) => setNumeroHabitacion(e.target.value)}
                    placeholder="Ejemplo: 101, 102."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Capacidad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={capacidad}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow positive numbers greater than 0
                      if (value > 0) {
                        setCapacidad(value);
                      }
                    }}
                    placeholder="Indique el número máximo de personas."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Precio por Noche</label>
                  <input
                    type="number"
                    className="form-control"
                    value={precio_por_noche}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow positive numbers greater than 0
                      if (value > 0) {
                        setPrecioPorNoche(value);
                      }
                    }}
                    placeholder="50000 por noche."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Servicios Incluidos</label>
                  <textarea
                    className="form-control"
                    value={servicios_incluidos}
                    onChange={(e) => setServiciosIncluidos(e.target.value)}
                    placeholder="Wi-Fi, Aire acondicionado, TV por cable, etc."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    value={descripcion_habitacion}
                    onChange={(e) => setDescripcionHabitacion(e.target.value)}
                    placeholder="Describa brevemente las características de la habitación."
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tipo de Habitación</label>
                  <select
                    className="form-control"
                    name="id_tipo"
                    value={id_tipo_habitacion}
                    onChange={(e) => setIdTipoHabitacion(e.target.value)}
                  >
                    <option value="">Seleccione un Tipo de habitación</option>
                    {tipos.map((tipo) => (
                      <option
                        key={tipo.ID_TIPO_HABITACION}
                        value={tipo.ID_TIPO_HABITACION}
                      >
                        {tipo.NOMBRE_TIPO_HABITACION}
                      </option>
                    ))}
                  </select>
                </div>
                {operation === 2 && (
                  <div className="col-md-6">
                    <label className="form-label">Estado Habitación</label>
                    <select
                      className="form-control"
                      name="id_estado"
                      value={id_estado}
                      onChange={(e) => setIdEstadoHabitacion(e.target.value)}
                      style={{ color: "black" }}
                    >
                      <option value="">Seleccione un Estado</option>
                      {estados.map((estado) => (
                        <option key={estado.ID_ESTADO} value={estado.ID_ESTADO}>
                          {estado.NOMBRE_ESTADO}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="d-grid col-4 mx-auto">
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
  );
};
export default HabitacionPage;
