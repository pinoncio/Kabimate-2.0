import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCabanas from "../Hooks/useCabana";
import "../Styles/cabana.css";

const CabanaPage = () => {
  const {
    cabanas,
    id_estado_cabania,
    capacidad,
    cantidad_piezas,
    precio_por_noche,
    ubicacion,
    servicios_incluidos,
    descripcion_cabania,
    estados,
    operation,
    title,
    setCapacidad,
    setCantidadPiezas,
    setPrecioPorNoche,
    setUbicacion,
    setServiciosIncluidos,
    setDescripcionCabania,
    setIdEstadoCabania,
    openModal,
    validar,
    handleToggleCabanaStatus,
    obtenerNombreEstado,
  } = useCabanas();


  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de cabañas por página
  const totalPages = Math.ceil(cabanas.length / itemsPerPage); // Total de páginas

  // Cálculo de las cabañas a mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCabanas = cabanas.slice(startIndex, startIndex + itemsPerPage);


  // Cambiar la página actual
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
                to="/admin"
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
                data-bs-target="#modalCabanas"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Cabaña
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Cabañas
              </h2>
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>CAPACIDAD</th>
                      <th>CANTIDAD PIEZAS</th>
                      <th>PRECIO/NOCHE</th>
                      <th>UBICACIÓN</th>
                      <th>SERVICIOS INCLUIDOS</th>
                      <th>DESCRIPCIO CABANIA</th>
                      <th>ESTADO CABAÑA</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {currentCabanas.map((cabana, i) => (
                      <tr key={cabana.ID_CABANIA}>
                        <td>{startIndex + i + 1}</td>
                        <td>{cabana.CAPACIDAD}</td>
                        <td>{cabana.CANTIDAD_PIEZAS}</td>
                        <td>{cabana.PRECIO_POR_NOCHE}</td>
                        <td>{cabana.UBICACION}</td>
                        <td>{cabana.SERVICIOS_INCLUIDOS}</td>
                        <td>{cabana.DESCRIPCION_CABANIA}</td>
                        <td>{obtenerNombreEstado(cabana.ID_ESTADO_CABANIA)}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={cabana.ESTADO_CABANIA === true}
                              onChange={() =>
                                handleToggleCabanaStatus(
                                  cabana.ID_CABANIA,
                                  !cabana.ESTADO_CABANIA
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
                                cabana.ID_CABANIA,
                                cabana.CAPACIDAD,
                                cabana.CANTIDAD_PIEZAS,
                                cabana.PRECIO_POR_NOCHE,
                                cabana.UBICACION,
                                cabana.SERVICIOS_INCLUIDOS,
                                cabana.DESCRIPCION_CABANIA,
                                cabana.ESTADO_CABANIA
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCabanas"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Paginación */}
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>


      {/* Modal para agregar o editar Cabañas */}
      <div id="modalCabanas" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-bed"></i>
                </span>
                <input
                  type="number"
                  id="capacidad"
                  className="form-control"
                  placeholder="Capacidad de la Cabaña"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-couch"></i>
                </span>
                <input
                  type="number"
                  id="cantidad_piezas"
                  className="form-control"
                  placeholder="Cantidad de Piezas"
                  value={cantidad_piezas}
                  onChange={(e) => setCantidadPiezas(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-dollar-sign"></i>
                </span>
                <input
                  type="number"
                  id="precio_por_noche"
                  className="form-control"
                  placeholder="Precio por Noche"
                  value={precio_por_noche}
                  onChange={(e) => setPrecioPorNoche(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  id="ubicacion"
                  className="form-control"
                  placeholder="Ubicación"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-concierge-bell"></i>
                </span>
                <input
                  type="text"
                  id="servicios_incluidos"
                  className="form-control"
                  placeholder="Servicios Incluidos"
                  value={servicios_incluidos}
                  onChange={(e) => setServiciosIncluidos(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-info-circle"></i>
                </span>
                <input
                  type="text"
                  id="descripcion_cabania"
                  className="form-control"
                  placeholder="Descripción de la Cabaña"
                  value={descripcion_cabania}
                  onChange={(e) => setDescripcionCabania(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <select
                  className="form-control"
                  name="id_institucion"
                  value={id_estado_cabania}
                  onChange={(e) => {
                    setIdEstadoCabania(e.target.value); 
                  }}
                  style={{ color: "black" }}
                >
                  <option value="">Seleccione un estado</option>
                  {estados.map((estado) => (
                    <option key={estado.ID_ESTADO} value={estado.ID_ESTADO}>
                      {estado.NOMBRE_ESTADO}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid col-6 mx-auto">
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
  );
};

export default CabanaPage;
