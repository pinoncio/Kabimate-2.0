// pages/CabanaPage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link
import useCabana from "../Hooks/useCabana"; // Se importa el hook useCabana

const CabanaPage = () => {
  const {
    cabanas,
    descripcion_cabania,
    capacidad,
    cantidad_piezas, 
    precio_por_noche,
    ubicacion,
    servicios_incluidos,
    id_estado_cabania,
    operation,
    title,
    setDescripcionCabania,
    setCapacidad,    
    setCantidadPiezas,   
    setPrecioPorNoche,    
    setUbicacion,    
    setServiciosIncluidos,
    setIdEstadoCabania,
    openModal,
    validar,
    handleToggleCabana,
  } = useCabana();

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
                data-bs-target="#modalCabana"
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
                      <th>PRECIO POR NOCHE</th>
                      <th>UBICACIÓN</th>
                      <th>SERVICIOS INCLUIDOS</th>
                      <th>DESCRIPCIÓN</th>
                      <th>ESTADO CABAÑA</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cabanas.map((cabana, index) => (
                      <tr key={cabana.ID_CABANA}>
                        <td>{index + 1}</td>
                        <td>{cabana.CAPACIDAD}</td>
                        <td>{cabana.CANTIDAD_PIEZAS}</td>
                        <td>{cabana.PRECIO_POR_NOCHE}</td>
                        <td>{cabana.UBICACION}</td>
                        <td>{cabana.SERVICIOS_INCLUIDOS}</td>
                        <td>{cabana.DESCRIPCION_CABANIA}</td>
                        <td>{cabana.ID_ESTADO_CABANIA}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={cabana.ESTADO_CABANIA === true}
                              onChange={() =>
                                handleToggleCabana(
                                  cabana.ID_CABANA,
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
                                cabana.ID_CABANA,
                                cabana.CAPACIDAD,
                                cabana.CANTIDAD_PIEZAS,
                                cabana.PRECIO_POR_NOCHE,
                                cabana.UBICACION,
                                cabana.SERVICIOS_INCLUIDOS,
                                cabana.DESCRIPCION_CABANIA,
                                cabana.ID_ESTADO_CABANIA
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCabana"
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
          </div>
        </div>
      </div>
      {/* Modal para agregar/editar cabaña */}
      <div id="modalCabana" className="modal fade" aria-hidden="true">
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
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-cogs"></i>
                </span>
                <input
                  type="number"
                  id="capacidad"
                  className="form-control"
                  placeholder="Capacidad"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-bed"></i>
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
                  <i className="fa-solid fa-pencil-alt"></i>
                </span>
                <textarea
                  id="descripcion_cabania"
                  className="form-control"
                  placeholder="Descripción de la Cabaña"
                  value={descripcion_cabania}
                  onChange={(e) => setDescripcionCabania(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="close"
                >
                  Cancelar
                </button>
                <button
                type="button"
                className="btn btn-primary"
                onClick={validar}
              >
                {operation === 1 ? "Crear Cabaña" : "Actualizar Cabaña"}
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
