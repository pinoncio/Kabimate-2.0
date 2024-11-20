import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducto } from "../Hooks/useProducto";
import "../Styles/Crud.css";

const ProductoPage = () => {
  const {
    productos,
    categorias,
    nombre_producto,
    setNombreProducto,
    descripcion_producto,
    setDescripcionProducto,
    precio_producto,
    setPrecioProducto,
    id_categoria,
    setIdCategoria,
    operation,
    title,
    openModal,
    validar,
    deleteProductoById,
    handleToggleProducto,
    obtenerNombreC,
  } = useProducto();

  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 4; // Número de pisos por página
  const totalPages = productos ? Math.ceil(productos.length / itemsPerPage) : 0; // Total de páginas (con verificación de pisos)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProductos = productos.slice(startIndex, startIndex + itemsPerPage); // Corregido el cálculo de slice

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
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalProductos"
              >
                <i className="fa fa-plus-circle mt-2"></i> Agregar Producto
              </button>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Productos
              </h2>
              <div className="table-responsive mt-4">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Categoría</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="table-gruop-divider">
                    {currentProductos.map((producto, i) => (
                      <tr key={producto.ID_PRODUCTO}>
                        <td>{startIndex + i + 1}</td>
                        <td>{producto.NOMBRE_PRODUCTO}</td>
                        <td>{producto.DESCRIPCION_PRODUCTO}</td>
                        <td>{producto.PRECIO_PRODUCTO}</td>
                        <td>{obtenerNombreC(producto.ID_CATEGORIA_PRODUCTO)}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={producto.ESTADO_PRODUCTO === true}
                              onChange={() =>
                                handleToggleProducto(
                                  producto.ID_PRODUCTO,
                                  !producto.ESTADO_PRODUCTO
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
                                producto.ID_PRODUCTO,
                                producto.NOMBRE_PRODUCTO,
                                producto.DESCRIPCION_PRODUCTO,
                                producto.PRECIO_PRODUCTO,
                                producto.ID_CATEGORIA
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalProductos"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              deleteProductoById(
                                producto.ID_PRODUCTO,
                                producto.NOMBRE_PRODUCTO
                              )
                            }
                          >
                            <i className="fas fa-trash-alt"></i>
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
        </div>
      </div>

      <div id="modalProductos" className="modal fade" aria-hidden="true">
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
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre_producto"
                  className="form-control"
                  placeholder="nombre del producto"
                  value={nombre_producto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-align-left"></i>
                </span>
                <textarea
                  id="descripcion_producto"
                  className="form-control"
                  placeholder="Descripción del producto"
                  value={descripcion_producto}
                  onChange={(e) => setDescripcionProducto(e.target.value)}
                ></textarea>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-dollar-sign"></i>
                </span>
                <input
                  type="number"
                  id="precio_producto"
                  className="form-control"
                  placeholder="Precio del producto"
                  value={precio_producto}
                  onChange={(e) => setPrecioProducto(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-tag"></i>
                </span>
                <select
                    className="form-control"
                    name="id_categoria"
                    value={id_categoria}
                    onChange={(e) => setIdCategoria(e.target.value)}
                    style={{ color: "black" }}
                  >
                    <option value="">Seleccione un Categoria</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>
                        {categoria.NOMBRE_CATEGORIA}
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

export default ProductoPage;
