import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducto } from "../Hooks/useProducto";
import { show_alerta } from "../functions";
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
  const currentProductos = productos.slice(
    startIndex,
    startIndex + itemsPerPage
  ); // Corregido el cálculo de slice

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const showHelp = () => {
    show_alerta(
      " Guía de Gestión de Productos para Hoteles y Cabañas\n\n" +
        "En este apartado podrás gestionar los productos de tu sistema para hoteles y cabañas. A continuación, te explicamos las acciones disponibles y cómo utilizar cada opción:\n\n" +
        "<b>1. <i class='fas fa-plus-circle'></i> Añadir Producto:</b>\n" +
        "   - Este botón te permitirá agregar un nuevo producto al sistema. Antes de crear un producto, verifica si la categoría a la que pertenece ya existe. Si no es así, deberás crearla primero para poder asignarla al producto. Al hacer clic, se abrirá un formulario donde podrás ingresar los detalles del producto, como su nombre, tipo, categoría y cantidad.\n\n" +
        "<b>2. <i class='fas fa-edit'></i> Editar Producto:</b>\n" +
        "   - Si deseas modificar la información de un producto que ya está registrado, selecciona la opción de editar. Podrás actualizar su nombre, tipo, precio y otros detalles según sea necesario.\n\n" +
        "<b>3. <i class='fas fa-toggle-on'></i> Activar/Desactivar Producto:</b>\n" +
        "   - Este botón te permite activar o desactivar un producto, indicando si está disponible para los clientes. Si un producto está desactivado, no será visible para los usuarios del sistema.\n\n" +
        "<b>¿Cómo gestionar los productos?</b>\n" +
        "   - Primero, verifica si la categoría del producto ya existe en el sistema. Si no existe, créala antes de añadir el producto. Luego, podrás añadir los productos necesarios al sistema. Después de esto, podrás editar sus detalles y activar o desactivar su disponibilidad según lo requieras para la gestión de reservas y servicios en el hotel o cabaña.",
      "info",
      "",
      "1200px",
      "14px"
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
              <button onClick={showHelp} class="btn-circle btn-danger">
                <i class="fa fa-question-circle"></i>
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
                        <td>
                          {obtenerNombreC(producto.ID_CATEGORIA_PRODUCTO)}
                        </td>
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
                            Editar
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
                           Eliminar
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
              <div className="mb-2">
                <strong>Categoría del Producto</strong>
                <p>(Recuerde si no existe la categoria, debe registrarla)</p>
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
                  <option value="">Seleccione una categoría</option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.ID_CATEGORIA}
                      value={categoria.ID_CATEGORIA}
                    >
                      {categoria.NOMBRE_CATEGORIA}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <strong>Nombre del Producto</strong>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre_producto"
                  className="form-control"
                  placeholder="Toallas, Ropa de cama, Artículos de tocador, etc."
                  value={nombre_producto}
                  onChange={(e) => setNombreProducto(e.target.value)}
                />
              </div>

              {/* Mini Título para Descripción del Producto */}
              <div className="mb-2">
                <strong>Descripción del Producto</strong>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-align-left"></i>
                </span>
                <textarea
                  id="descripcion_producto"
                  className="form-control"
                  placeholder="Describa el producto: tamaño, material, uso, etc."
                  value={descripcion_producto}
                  onChange={(e) => setDescripcionProducto(e.target.value)}
                ></textarea>
              </div>

              {/* Mini Título para Precio del Producto */}
              <div className="mb-2">
                <strong>Precio del Producto</strong>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-dollar-sign"></i>
                </span>
                <input
                  type="number"
                  id="precio_producto"
                  className="form-control"
                  value={precio_producto}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value > 0) {
                      setPrecioProducto(value);
                    }
                  }}
                  placeholder="10000 (precio por unidad)"
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

export default ProductoPage;
