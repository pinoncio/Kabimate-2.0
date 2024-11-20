// pages/Categoria.js
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importa Link
import "../Styles/Crud.css";
import { useCategoria } from "../Hooks/useCategoria.js";

const CategoriaPage = () => {
  const {
    categorias,
    nombre_categoria,
    setNombreCategoria,
    operation,
    title,
    openModal,
    validar,
    deleteCategoriaById,
    handleToggleCategoria,
  } = useCategoria();

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de pisos por página
  const totalPages = categorias ? Math.ceil(categorias.length / itemsPerPage) : 0; // Total de páginas (con verificación de pisos)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategoria = categorias.slice(startIndex, startIndex + itemsPerPage); // Corregido el cálculo de slice

  const changePage = (pageNumber) => {
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
                className="btn btn-primary"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalCategorias"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Categoría
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Categorías
              </h2>
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NOMBRE</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {currentCategoria.map((categoria, i) => (
                      <tr key={categoria.ID_CATEGORIA}>
                        <td>{startIndex + i + 1}</td>
                        <td>{categoria.NOMBRE_CATEGORIA}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={categoria.ESTADO_CATEGORIA === true}
                              onChange={() =>
                                handleToggleCategoria(
                                  categoria.ID_CATEGORIA,
                                  !categoria.ESTADO_CATEGORIA
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
                                categoria.ID_CATEGORIA,
                                categoria.NOMBRE_CATEGORIA
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalCategorias"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          &nbsp;
                          <button
                            onClick={() =>
                              deleteCategoriaById(
                                categoria.ID_CATEGORIA,
                                categoria.NOMBRE_CATEGORIA
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
        </div>
      </div>

      {/* Modal para agregar/editar categorías */}
      <div id="modalCategorias" className="modal fade" aria-hidden="true">
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
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre_categoria"
                  className="form-control"
                  placeholder="Nombre de la Categoría"
                  value={nombre_categoria}
                  onChange={(e) => {setNombreCategoria(e.target.value);
                  }}
                />
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

export default CategoriaPage;
