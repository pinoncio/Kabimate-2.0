// pages/InstiPage.js
import React from "react";
import { Link } from "react-router-dom";
import useInstituciones from "../Hooks/useInstituciones";
import "../Styles/Crud.css";

const InstiPage = () => {
  const {
    institucion,
    nombre_institucion,
    tipo_institucion,
    title,
    operation,
    openModal,
    validar,
    setName,
    setType,
    deleteExistingInstitucion,
    handleToggleInstitucion,
  } = useInstituciones();

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
                data-bs-target="#modalInstituciones"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Institución
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Instituciones
              </h2>
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NOMBRE</th>
                      <th>TIPO</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {institucion.map((inst, i) => (
                      <tr key={inst.ID_INSTITUCION}>
                        <td>{i + 1}</td>
                        <td>{inst.NOMBRE_INSTITUCION}</td>
                        <td>{inst.TIPO_INSTITUCION}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={inst.ESTADO_INSTITUCION === true}
                              onChange={() =>
                                handleToggleInstitucion(
                                  inst.ID_INSTITUCION,
                                  !inst.ESTADO_INSTITUCION
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
                                inst.ID_INSTITUCION,
                                inst.NOMBRE_INSTITUCION,
                                inst.TIPO_INSTITUCION
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalInstituciones"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          &nbsp;
                          <button
                            onClick={() =>
                              deleteExistingInstitucion(
                                inst.ID_INSTITUCION,
                                inst.NOMBRE_INSTITUCION
                              )
                            }
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i>
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
      <div id="modalInstituciones" className="modal fade" aria-hidden="true">
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
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre de la Institución"
                  value={nombre_institucion}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="tipo"
                  className="form-control"
                  placeholder="Tipo de Institución"
                  value={tipo_institucion}
                  onChange={(e) => setType(e.target.value)}
                ></input>
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

export default InstiPage;
