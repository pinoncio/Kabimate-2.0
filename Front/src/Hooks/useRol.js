// hooks/useRol.js
import { useState, useEffect } from 'react';
import { getRoles, createRol, updateRol, deleteRol } from '../services/rol';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { show_alerta } from '../functions';

export const useRol = () => {
  const [roles, setRoles] = useState([]);
  const [id_rol, setIdRol] = useState('');
  const [nombre_rol, setNombreRol] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');
  const MySwal = withReactContent(Swal);
  
  
  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  const openModal = (op, id_rol = '', nombre_rol = '') => {
    setIdRol(id_rol);
    setNombreRol(nombre_rol);
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Rol' : 'Editar Rol');
  };

  const validar = async () => {
    if (nombre_rol.trim() === '') {
      show_alerta('Escribe el nombre del rol', 'warning');
      return;
    }

    const parametros = { nombre_rol: nombre_rol.trim() };
    if (operation === 1) {
      await saveNewRol(parametros);
    } else {
      await updateExistingRol(id_rol, parametros);
    }
  };

  const saveNewRol = async (rol) => {
    try {
      const response = await createRol(rol);
      show_alerta(response.msg, 'success');
      fetchAllRoles();
    } catch (error) {
      show_alerta('Error al crear el rol', 'error');
    }
  };

  const updateExistingRol = async (id_rol, rol) => {
    try {
      const response = await updateRol(id_rol, rol);
      show_alerta('El rol fue editado con éxito.', 'success');
      fetchAllRoles();
    } catch (error) {
      show_alerta('Error al actualizar el rol', 'error');
    }
  };

  const deleteRolById = async (id_rol, nombre_rol) => {
    MySwal.fire({
      title: `¿Está seguro/a de eliminar el rol ${nombre_rol}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRol(id_rol);
          setRoles((prevRoles) => prevRoles.filter((rol) => rol.ID_ROL !== id_rol));
  
          // Mensaje de confirmación después de eliminar el rol
          await MySwal.fire({
            title: 'Rol eliminado',
            text: `El rol ${nombre_rol} ha sido eliminado con éxito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        } catch (error) {
          console.error('Error al eliminar el rol:', error);
          await MySwal.fire({
            title: 'Error',
            text: 'Hubo un problema al eliminar el rol. Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        }
      }
    });
  };
  
  return {
    roles,
    id_rol,
    nombre_rol,
    setNombreRol, // Asegúrate de retornar esta función
    title,
    openModal,
    validar,
    operation,
    deleteRolById,
  };
};
