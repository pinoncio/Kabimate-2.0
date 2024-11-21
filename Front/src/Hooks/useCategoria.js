import { useState, useEffect } from 'react';
import { 
    getCategorias, 
    createCategoria, 
    updateCategoria, 
    deleteCategoria, 
    activarCategoria } from '../services/Categoria';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

export const useCategoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [id_categoria, setIdCategoria] = useState('');
  const [nombre_categoria, setNombreCategoria] = useState('');
  const [operation, setOperation] = useState(1); 
  const [title, setTitle] = useState('');
  const MySwal = withReactContent(Swal);
  const id_usuario = localStorage.getItem("idUsuario");
  
  useEffect(() => {
    fetchAllCategorias(id_usuario);
  }, [id_usuario]);

  const fetchAllCategorias = async (id_usuario) => {
    try {
      const categoriasData = await getCategorias(id_usuario);
      const sortedCategorias = categoriasData.sort((a, b) => a.ID_CATEGORIA - b.ID_CATEGORIA);
      setCategorias(sortedCategorias);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const openModal = (
    op,
    id_categoria = '', 
    nombre_categoria = '',
    id_usuario = localStorage.getItem("idUsuario")
) => {
    setIdCategoria(id_categoria);
    setNombreCategoria(nombre_categoria);
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Categoría' : 'Editar Categoría');

    if (!id_usuario) {
        show_alerta(
          "No se encontró el ID de usuario. Por favor, inicie sesión.",
          "error"
        );
      }
  };

  const validar = async () => {
    const id_usuario = localStorage.getItem("idUsuario");

    const validarCreacion = () => {
      return nombre_categoria.trim() === "";
    };

    const validarActualizacion = () => {
      return nombre_categoria.trim() === "";
    };

    if (operation === 1) {
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        nombre_categoria: nombre_categoria.trim(),
      };
      saveNewCategoria(id_usuario, parametros);
    } else {
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        nombre_categoria: nombre_categoria.trim(),
      };
      updateExistingCategoria(id_categoria, parametross);
    }
  };
   

   const saveNewCategoria = async (id_usuario, categoriaData) => {
    try {
      const response = await createCategoria(id_usuario, categoriaData);
      show_alerta(response.msg, 'success');
      document.getElementById('btnCerrar').click(); 
      fetchAllCategorias(id_usuario); // Pasa id_usuario aquí
    } catch (error) {
      show_alerta('Error al crear la categoría', 'error');
    }
 };
 
 const updateExistingCategoria = async (id_categoria, categoriaData) => {
    try {
      await updateCategoria(id_categoria, categoriaData);
      show_alerta('La categoría fue editada con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      fetchAllCategorias(id_usuario); // Pasa id_usuario aquí también
      setCategorias((prevCategorias) =>
        prevCategorias.map((item) =>
          item.ID_CATEGORIA === id_categoria ? { ...item, NOMBRE_CATEGORIA: nombre_categoria.nombre_categoria } : item
        )
      );
    } catch (error) {
      show_alerta('Error al actualizar la categoría', 'error');
    }
 };
 

  const deleteCategoriaById = async (id_categoria, nombre_categoria) => {
    MySwal.fire({
      title: `¿Está seguro/a de eliminar la categoría ${nombre_categoria}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCategoria(id_categoria);
          setCategorias((prevCategorias) => prevCategorias.filter((categoria) => categoria.ID_CATEGORIA !== id_categoria));
          await MySwal.fire({
            title: 'Categoría eliminada',
            text: `La categoría ${nombre_categoria} ha sido eliminada con éxito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } catch (error) {
          console.error('Error al eliminar la categoría:', error);
          await MySwal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar la categoría. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    });
  };

  const handleToggleCategoria = async (id_categoria, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await activarCategoria(id_categoria, estadoNumerico);
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria.ID_CATEGORIA === id_categoria ? { ...categoria, ESTADO_CATEGORIA: nuevoEstado } : categoria
        )
      );
      const mensaje = nuevoEstado ? 'Categoría activada con éxito' : 'Categoría desactivada con éxito';
      show_alerta(mensaje, 'success');
    } catch (error) {
      console.error('Error al activar/desactivar la categoría:', error);
      show_alerta('Error al cambiar el estado de la categoría', 'error');
    }
  };

  return {
    categorias,
    id_categoria,
    nombre_categoria,
    setNombreCategoria,
    title,
    openModal,
    validar,
    operation,
    deleteCategoriaById,
    handleToggleCategoria,
  };
};
