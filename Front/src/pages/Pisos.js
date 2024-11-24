import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePisos from "../Hooks/usePisos"; // Importando el hook personalizado
import { show_alerta } from "../functions";
import "../Styles/Crud.css";

const PisoPage = () => {
  const {
    pisos,
    nombre_piso,
    title,
    operation,
    openModal,
    validar,
    handleTogglePisoStatus,
    setNombrePiso,
  } = usePisos();

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 5; // Número de pisos por página
  const totalPages = pisos ? Math.ceil(pisos.length / itemsPerPage) : 0; // Total de páginas (con verificación de pisos)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPisos = pisos.slice(startIndex, startIndex + itemsPerPage); // Corregido el cálculo de slice

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showHelp = () => {
    show_alerta(
      " Guía de Gestión de Pisos\n\n" +
        "En este apartado puedes gestionar los pisos del sistema. A continuación, te explicamos las acciones disponibles y qué hace cada botón:\n\n" +
        "<b>1. <i class='fas fa-plus-circle'></i> Añadir Piso:</b>\n" +
        "   - Este botón te permite agregar un nuevo piso al sistema. Al hacer clic, se abrirá un formulario donde podrás ingresar los detalles del piso.\n\n" +
        "<b>2. <i class='fas fa-edit'></i> Editar Piso:</b>\n" +
        "   - Cuando quieras modificar los detalles de un piso existente, selecciona la opción de editar. Podrás cambiar el nombre del piso y otros atributos relevantes.\n\n" +
        "<b>3. <i class='fas fa-toggle-on'></i> Activar/Desactivar Estado:</b>\n" +
        "   - Este botón te permite activar o desactivar el piso según su disponibilidad. Si un piso está inactivo, no estará disponible para los usuarios del sistema.\n\n" +
        "<b>¿Qué debes hacer?</b>\n" +
        "   - Para gestionar los pisos correctamente, comienza añadiendo nuevos pisos si aún no están registrados. Después, podrás modificar cualquier detalle según sea necesario y asegurarte de que estén activos para que los usuarios puedan verlos y utilizarlos.",
      "info",
      "",
      "1200px", // Ajuste del ancho a 1200px
      "14px" // Ajuste del tamaño de la fuente
    );
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
                data-bs-target="#modalPisos"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Piso
              </button>
              <button onClick={showHelp} class="btn-circle btn-danger">
                <i class="fa fa-question-circle"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Pisos */}
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Pisos
              </h2>
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NUMERO</th>
                      <th>ESTADO PISO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {currentPisos.map((piso, i) => (
                      <tr key={piso.ID_PISO}>
                        <td>{startIndex + i + 1}</td>
                        <td>{piso.NOMBRE_PISO}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={piso.ESTADO_PISO === true}
                              onChange={() =>
                                handleTogglePisoStatus(
                                  piso.ID_PISO,
                                  !piso.ESTADO_PISO
                                )
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              openModal(2, piso.ID_PISO, piso.NOMBRE_PISO)
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalPisos"
                          >
                            Editar
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

      {/* Modal Piso */}
      <div id="modalPisos" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{title}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <strong>Numero del Piso</strong>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre_piso"
                  className="form-control"
                  placeholder="Ejemplo: piso (1, 2, 3), Piso Superior"
                  value={nombre_piso}
                  onChange={(e) => setNombrePiso(e.target.value)}
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

export default PisoPage;
