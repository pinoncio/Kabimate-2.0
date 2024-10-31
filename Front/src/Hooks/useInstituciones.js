// hooks/useInstituciones.js
import { useEffect, useState } from 'react';
import { getInstituciones, createInstitucion, updateInstitucion, deleteInstitucion, activarInstitucion } from '../services/Insti';
import { show_alerta } from '../functions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const useInstituciones = () => {
  const [institucion, setInstitucion] = useState([]);
  const [id_instituciones, setId] = useState('');
  const [nombre_institucion, setName] = useState('');
  const [tipo_institucion, setType] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllInstituciones();
  }, []);

  const getAllInstituciones = async () => {
    try {
      const respuesta = await getInstituciones();
      setInstitucion(respuesta);
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
    }
  };

  const openModal = (op, id_instituciones, nombre_institucion, tipo_institucion) => {
    setId(id_instituciones || '');
    setName(nombre_institucion || '');
    setType(tipo_institucion || '');
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Institución' : 'Editar Institución');
    window.setTimeout(() => {
      document.getElementById('nombre').focus();
    }, 500);
  };

  const validar = () => {
    if (nombre_institucion.trim() === '') {
      show_alerta('Escribe el nombre de la institución', 'warning');
      return;
    } else if (tipo_institucion.trim() === '') {
      show_alerta('Escribe el tipo de institución', 'warning');
      return;
    }

    const parametros = { 
      nombre_institucion: nombre_institucion.trim(), 
      tipo_institucion: tipo_institucion.trim() 
    };
    if (operation === 1) {
      createNewInstitucion(parametros);
    } else {
      updateExistingInstitucion(id_instituciones, parametros);
    }
  };

  const createNewInstitucion = async (institucion) => {
    try {
      const response = await createInstitucion(institucion);
      show_alerta(response.msg, 'success'); 
      document.getElementById('btnCerrar').click();
      getAllInstituciones();
    } catch (error) {
      console.error('Error al crear la institución:', error);
      show_alerta('Error al crear la institución', 'error');
    }
  };

  const updateExistingInstitucion = async (id_institucion, institucion) => {
    try {
      const response = await updateInstitucion(id_institucion, institucion);
      show_alerta('La institución fue editada con éxito.', 'success');
      document.getElementById('btnCerrar').click();
      
      // Actualiza la institución en el estado local sin reordenar
      setInstitucion((prevInstituciones) =>
        prevInstituciones.map((item) =>
          item.ID_INSTITUCION === id_institucion 
            ? { ...item, NOMBRE_INSTITUCION: institucion.nombre_institucion, TIPO_INSTITUCION: institucion.tipo_institucion }
            : item
        )
      );
    } catch (error) {
      console.error('Error al actualizar la institución:', error); 
      show_alerta('Error al actualizar la institución', 'error');
    }
  };

  const deleteExistingInstitucion = (id_institucion, nombre_institucion) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Está seguro/a de eliminar la Institución ${nombre_institucion}?`,
      icon: 'question',
      text: 'No se podrá dar marcha atrás',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteInstitucion(id_institucion); 
          show_alerta('La institución fue eliminada con éxito.', 'success');
          
          // Actualiza la lista de instituciones eliminando la institución específica
          setInstitucion((prevInstituciones) => prevInstituciones.filter((inst) => inst.ID_INSTITUCION !== id_institucion));
        } catch (error) {
          console.error('Error al eliminar la institución:', error); 
          show_alerta('Error al eliminar la institución', 'error');
        }
      } else {
        show_alerta('La institución NO fue eliminada', 'info');
      }
    });
  };

  const handleToggleInstitucion = async (id_institucion, trigger) => {
    try {
      await activarInstitucion(id_institucion, trigger);
      console.log(`Institución ${id_institucion} ${trigger === 1 ? 'activado' : 'desactivado'}`);
    } catch (error) {
      console.error('Error al activar/desactivar la institución:', error);
    }
  };

  return {
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
  };
};

export default useInstituciones;
