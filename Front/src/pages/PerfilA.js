import React, { useEffect, useState } from 'react';
import { getUserA, updateUserA } from '../services/userA';
import { useNavigate } from 'react-router-dom';
import { PersonCircle, PencilSquare } from 'react-bootstrap-icons';
import { show_alerta } from '../functions'; // Importa la función para mostrar alertas
import '../Styles/PerfilA.css';

export default function PerfilA() {
  const [user, setUser] = useState({
    nombre1_usuario: '',
    nombre2_usuario: '',
    apellido1_usuario: '',
    apellido2_usuario: '',
    rut_usuario: '',
    email_usuario: '',
  });

  const [isEditable, setIsEditable] = useState({
    nombre1_usuario: false,
    nombre2_usuario: false,
    apellido1_usuario: false,
    apellido2_usuario: false,
    rut_usuario: false,
    email_usuario: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const idUsuario = sessionStorage.getItem('idUsuario');
    getUserA(idUsuario).then((userData) => {
      console.log('Datos del usuario:', userData.data);
      setUser({
        nombre1_usuario: userData.data.NOMBRE1_USUARIO || '',
        nombre2_usuario: userData.data.NOMBRE2_USUARIO || '',
        apellido1_usuario: userData.data.APELLIDO1_USUARIO || '',
        apellido2_usuario: userData.data.APELLIDO2_USUARIO || '',
        rut_usuario: userData.data.RUT_USUARIO || '',
        email_usuario: userData.data.EMAIL_USUARIO || '',
      });
    }).catch((error) => {
      console.error('Error al obtener usuario:', error);
    });
  }, []);

  const handleEditToggle = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const updateExistingUser = async (id_usuario, user) => {
    console.log("Actualizando usuario con ID:", id_usuario, "Datos:", user);

    try {
      await updateUserA(id_usuario, user);
      show_alerta('El usuario fue editado con éxito.'); // Usar la función para mostrar alertas
      setUser(user); // Actualiza el estado con los nuevos datos
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      show_alerta('Error al actualizar el usuario');
    }
  };

  const handleSave = () => {
    const idUsuario = sessionStorage.getItem('idUsuario');
    updateExistingUser(idUsuario, {
      nombre1_usuario: user.nombre1_usuario,
      nombre2_usuario: user.nombre2_usuario,
      apellido1_usuario: user.apellido1_usuario,
      apellido2_usuario: user.apellido2_usuario,
      rut_usuario: user.rut_usuario,
      email_usuario: user.email_usuario,
    });
  };

  return (
    <div className='perfil-wrapper mt'>
      <div className="container-perfil text-center ">
        <PersonCircle size={100} className="mb-5" />
        <form>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="nombre1_usuario" className="form-label">Primer Nombre</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre1_usuario"
                  value={user.nombre1_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['nombre1_usuario']}
                  placeholder="Primer Nombre"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('nombre1_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="nombre2_usuario" className="form-label">Segundo Nombre</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre2_usuario"
                  value={user.nombre2_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['nombre2_usuario']}
                  placeholder="Segundo Nombre"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('nombre2_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="apellido1_usuario" className="form-label">Primer Apellido</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="apellido1_usuario"
                  value={user.apellido1_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['apellido1_usuario']}
                  placeholder="Primer Apellido"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('apellido1_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="apellido2_usuario" className="form-label">Segundo Apellido</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="apellido2_usuario"
                  value={user.apellido2_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['apellido2_usuario']}
                  placeholder="Segundo Apellido"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('apellido2_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="rut_usuario" className="form-label">Mi RUT</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="rut_usuario"
                  value={user.rut_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['rut_usuario']}
                  placeholder="RUT"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('rut_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="email_usuario" className="form-label">Correo Electrónico</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="email_usuario"
                  value={user.email_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable['email_usuario']}
                  placeholder="Correo Electrónico"
                />
                <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => handleEditToggle('email_usuario')}>
                  <PencilSquare />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={() => navigate('/admin')}
            >
              Volver
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
