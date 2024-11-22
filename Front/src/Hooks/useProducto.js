import { useState, useEffect } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
  activarProducto,
} from "../services/producto.js";
import { getCategorias } from "../services/Categoria.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../functions";

export const useProducto = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [id_producto, setIdProducto] = useState("");
  const [nombre_producto, setNombreProducto] = useState("");
  const [descripcion_producto, setDescripcionProducto] = useState("");
  const [precio_producto, setPrecioProducto] = useState("");
  const [id_categoria, setIdCategoria] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");
  const MySwal = withReactContent(Swal);
  const id_usuario = localStorage.getItem("idUsuario");

  useEffect(() => {
    if (id_usuario) {
      fetchAllProductos(id_usuario);
      getAllCategorias(id_usuario);
    } else {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  }, [id_usuario]);

  const fetchAllProductos = async (id_usuario) => {
    try {
      const productosData = await getProductos(id_usuario);
      const sortedProductos = productosData.sort(
        (a, b) => a.ID_PRODUCTO - b.ID_PRODUCTO
      );
      setProductos(sortedProductos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const getAllCategorias = async (id_usuario) => {
    try {
      const categoriaData = await getCategorias(id_usuario);
      setCategorias(categoriaData);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  const obtenerNombreC = (id_categoria) => {
    const categoria = categorias.find(
      (cat) => cat.ID_CATEGORIA === id_categoria
    );
    return categoria ? categoria.NOMBRE_CATEGORIA : "Sin categoría";
  };

  const openModal = (
    op,
    id_producto = "",
    nombre_producto = "",
    descripcion_producto = "",
    precio_producto = "",
    id_categoria = ""
  ) => {
    const id_usuario = localStorage.getItem("idUsuario");

    setIdProducto(id_producto);
    setNombreProducto(nombre_producto);
    setDescripcionProducto(descripcion_producto);
    setPrecioProducto(precio_producto);
    setIdCategoria(id_categoria);
    setOperation(op);
    setTitle(op === 1 ? "Registrar Producto" : "Editar Producto");

    if (!id_usuario) {
      show_alerta(
        "No se encontró el ID de usuario. Por favor, inicie sesión.",
        "error"
      );
    }
  };

  const validar = async () => {
    const id_usuario = localStorage.getItem("idUsuario");
    const IdCategoria = String(id_categoria).trim();

    const validarCreacion = () => {
      return (
        nombre_producto.trim() === "" ||
        descripcion_producto.trim() === "" ||
        precio_producto === "" ||
        IdCategoria === ""
      );
    };

    const validarActualizacion = () => {
      return (
        nombre_producto.trim() === "" ||
        descripcion_producto.trim() === "" ||
        precio_producto === "" ||
        IdCategoria === ""
      );
    };

    if (operation === 1) {
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        nombre_producto: nombre_producto.trim(),
        descripcion_producto: descripcion_producto.trim(),
        precio_producto: precio_producto,
        id_categoria: id_categoria,
      };
      saveNewProducto(id_usuario, parametros);
    } else {
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        nombre_producto: nombre_producto.trim(),
        descripcion_producto: descripcion_producto.trim(),
        precio_producto: precio_producto,
        id_categoria: id_categoria,
      };
      updateExistingProducto(id_producto, parametross);
    }
  };

  const saveNewProducto = async (id_usuario, productoData) => {
    try {
      const response = await createProducto(id_usuario, productoData);
      show_alerta(response.msg, "success");
      document.getElementById("btnCerrar").click();
      fetchAllProductos(id_usuario); // Pasa id_usuario aquí
    } catch (error) {
      show_alerta("Error al crear el producto", "error");
    }
  };

  const updateExistingProducto = async (id_producto, productoData) => {
    try {
      await updateProducto(id_producto, productoData);
      show_alerta("El producto fue editado con éxito.", "success");
      document.getElementById("btnCerrar").click();
      fetchAllProductos(id_usuario); // Pasa id_usuario aquí también
      setProductos((prevProductos) =>
        prevProductos.map((item) =>
          item.ID_PRODUCTO === id_producto
            ? { ...item, NOMBRE_PRODUCTO: nombre_producto.nombre_producto }
            : item
        )
      );
    } catch (error) {
      show_alerta("Error al actualizar el producto", "error");
    }
  };

  const deleteProductoById = async (id_producto, nombre_producto) => {
    MySwal.fire({
      title: `¿Está seguro/a de eliminar el producto ${nombre_producto}?`,
      icon: "question",
      text: "No se podrá dar marcha atrás",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProducto(id_producto);
          setProductos((prevProductos) =>
            prevProductos.filter(
              (producto) => producto.ID_PRODUCTO !== id_producto
            )
          );
          await MySwal.fire({
            title: "Producto eliminado",
            text: `El producto ${nombre_producto} ha sido eliminado con éxito.`,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          await MySwal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar el producto. Inténtalo de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const handleToggleProducto = async (id_producto, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await activarProducto(id_producto, estadoNumerico);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.ID_PRODUCTO === id_producto
            ? { ...producto, ESTADO_PRODUCTO: nuevoEstado }
            : producto
        )
      );
      const mensaje = nuevoEstado
        ? "Producto activado con éxito"
        : "Producto desactivado con éxito";
      show_alerta(mensaje, "success");
    } catch (error) {
      console.error("Error al activar/desactivar el producto:", error);
      show_alerta("Error al cambiar el estado del producto", "error");
    }
  };

  return {
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
    id_producto,
    setIdProducto,
    operation,
    setOperation,
    title,
    openModal,
    validar,
    saveNewProducto,
    updateExistingProducto,
    deleteProductoById,
    handleToggleProducto,
    obtenerNombreC,
  };
};
