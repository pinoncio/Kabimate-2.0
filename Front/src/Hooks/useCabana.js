// hooks/useCabana.js
import { useEffect, useState } from 'react';
import { show_alerta } from '../functions';
import { getCabanas, createCabana, activarCabana, updateCabanas } from '../services/Cabana';

const useCabana = () => {
  const [cabanas, setCabanas] = useState([]);
  const [id_cabana, setIdCabana] = useState('');
  const [capacidad, setCapacidad] = useState('');
  const [cantidad_piezas, setCantidadPiezas] = useState('');
  const [precio_por_noche, setPrecioPorNoche] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [servicios_incluidos, setServiciosIncluidos] = useState('');
  const [descripcion_cabania, setDescripcionCabania] = useState('');
  const [estado_cabania, setEstadoCabania] = useState(true);
  const [id_estado_cabania, setIdEstadoCabania] = useState('');
  const [id_usuario_cabania, setIdUsuarioCabania] = useState('');
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getAllCabanas();
  }, []);

  const getAllCabanas = async () => {
    const idUsuario = sessionStorage.getItem('idUsuario'); // Obtener el id del usuario desde sessionStorage
    if (!idUsuario) {
      show_alerta('No se encuentra el id del usuario', 'warning');
      return;
    }
  
    try {
      const cabanasData = await getCabanas(idUsuario); // Pasar idUsuario al servicio
      console.log('Datos recibidos:', cabanasData); // Mostrar datos de la respuesta
  
      if (Array.isArray(cabanasData)) { // Verificar que los datos recibidos sean un array
        setCabanas(cabanasData); // Si es un array, se guarda en el estado
      } else {
        console.error('Los datos recibidos no son un array:', cabanasData);
        show_alerta('Error al obtener las cabañas. Los datos no son válidos.', 'error');
      }
    } catch (error) {
      console.error('Error al obtener cabañas:', error);
      show_alerta('Error al obtener las cabañas', 'error');
    }
  };
  
  
  const openModal = (op, id_cabana = '', capacidad = '', cantidad_piezas = '',
    precio_por_noche = '', ubicacion = '', servicios_incluidos = '', descripcion_cabania = '',
    estado_cabania = true, id_estado_cabania = '1', id_usuario_cabania = 'idUsuario') => {

    setIdCabana(id_cabana);
    setCapacidad(capacidad);
    setCantidadPiezas(cantidad_piezas);
    setPrecioPorNoche(precio_por_noche);
    setUbicacion(ubicacion);
    setServiciosIncluidos(servicios_incluidos);
    setDescripcionCabania(descripcion_cabania);
    setEstadoCabania(estado_cabania);
    setIdEstadoCabania(id_estado_cabania);
    setIdUsuarioCabania(id_usuario_cabania);
    setOperation(op);
    setTitle(op === 1 ? 'Registrar Cabaña' : 'Editar Cabaña');
  };

  const validar = async () => {

    const validarCreacion = () => {
      return (
        capacidad.trim() === '' ||
        cantidad_piezas.trim() === '' ||
        precio_por_noche.trim() === '' ||
        ubicacion.trim() === '' ||
        servicios_incluidos.trim() === '' ||
        descripcion_cabania.trim() === ''

      );
    };
    const validarActualizacion = () => {
      return (
        capacidad.trim() === '' ||
        cantidad_piezas.trim() === '' ||
        precio_por_noche.trim() === '' ||
        ubicacion.trim() === '' ||
        servicios_incluidos.trim() === '' ||
        descripcion_cabania.trim() === ''

      )
    }
    if (operation === 1) { // Crear
      if (validarCreacion()) {
        show_alerta('Completa los campos requeridos', 'warning');
        return;
      }
      const parametros = {
        capacidad: capacidad.trim(),
        cantidad_piezas: cantidad_piezas.trim(),
        precio_por_noche: precio_por_noche.trim(),
        ubicacion: ubicacion.trim(),
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_cabania: descripcion_cabania.trim(),
        id_estado_cabania: id_estado_cabania.trim(),
        id_usuario_cabania: id_usuario_cabania.trim(),
      };
      createCabana(parametros);
      console.log("Datos de la cabaña a crear/actualizar:", parametros);
    } else { 
      if (validarActualizacion()) {
        show_alerta('Completa los campos requeridos', 'warning');
        return;
      }
      const parametross = {
        capacidad: capacidad.trim(),
        cantidad_piezas: cantidad_piezas.trim(),
        precio_por_noche: precio_por_noche.trim(),
        ubicacion: ubicacion.trim(),
        servicios_incluidos: servicios_incluidos.trim(),
        descripcion_cabania: descripcion_cabania.trim(),
        id_estado_cabania: id_estado_cabania.trim(),
    };
    updateCabana(id_cabana, parametross);    
    
    }
  };


  const createNewCabana = async (cabana) => {
    try {
      const response = await createCabana(cabana);
      show_alerta(response.msg, 'suaccess');
      document.getElementById('btnCerrar').click();
      getCabanas();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      show_alerta('Error al crear el usuario', 'error');
    }
  };

  const updateCabana = async (id_cabana, cabana) => {
    console.log("Actualizando Cabaña con ID:", id_cabana, "Datos:", cabana);
    
    try {
        await updateCabanas(id_cabana, cabana);
        show_alerta('El usuario fue editado con éxito.', 'success');
        
        // Actualiza el estado de los usuarios manteniendo el orden
        setCabanas((prevCabanas) =>
            prevCabanas.map((cabana) =>
                cabana.ID_CABANA === id_cabana
                    ? { 
                        ...cabana, 
                        CAPACIDAD: cabana.capacidad,
                        CANTIDAD_PIEZAS: cabana.cantidad_piezas,
                        PRECIO_POR_NOCHE: cabana.precio_por_noche,
                        UBICACION: cabana.ubicacion,
                        SERVICIOS_INCLUIDOS: cabana.servicios_incluidos,
                        DESCRIPCION_CABANIA: cabana.descripcion_cabania,
                        ID_ESTADO_CABANIA: cabana.id_estado_cabania
                      }
                    : cabana
            )
        );

        // Cierra el modal
        document.getElementById('btnCerrar').click();
    } catch (error) {
        console.error('Error al actualizar cabaña:', error);
        show_alerta('Error al actualizar el cabaña', 'error');
    }
};

  const handleToggleEstadoCabana = async (id_cabana, nuevoEstado) => {
    try {
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await activarCabana(id_cabana, estadoNumerico);
      setCabanas((prevCabanas) =>
        prevCabanas.map((cabana) =>
          cabana.ID_CABANA === id_cabana ? { ...cabana, ESTADO_CABANIA: nuevoEstado } : cabana
        )
      );
      show_alerta(nuevoEstado ? 'Cabaña activada' : 'Cabaña desactivada', 'success');
    } catch (error) {
      console.error('Error al cambiar el estado de la cabaña:', error);
      show_alerta('Error al cambiar el estado de la cabaña', 'error');
    }
  };

  return {
    cabanas,
    id_cabana,
    capacidad,
    cantidad_piezas,
    precio_por_noche,
    ubicacion,
    servicios_incluidos,
    descripcion_cabania,
    estado_cabania,
    id_usuario_cabania,
    operation,
    title,
    setCapacidad,
    setCantidadPiezas,
    setPrecioPorNoche,
    setUbicacion,
    setServiciosIncluidos,
    setDescripcionCabania,
    setEstadoCabania,
    setIdUsuarioCabania,
    openModal,
    createNewCabana,
    handleToggleEstadoCabana,
    getAllCabanas,
  };
};

export default useCabana;
