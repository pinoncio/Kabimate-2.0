import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import useUser from '../Hooks/useUserHooks';
import '../Styles/user.css';

const UserPage = () => {
  const {
    users,
    roles,
    instituciones,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
    rut_usuario,
    contrasenia_usuario,
    email_usuario,
    id_institucion_usuario,
    id_rol_usuario,
    operation,
    title,
    setNombre1Usuario,
    setNombre2Usuario,
    setApellido1Usuario,
    setApellido2Usuario,
    setRutUsuario,
    setContraseniaUsuario,
    setEmailUsuario,
    setIdInstitucionUsuario,
    setIdRolUsuario,
    openModal,
    validar,
    getRoleName,
    getInstitucionName,
    toggleUserStatus,
  } = useUser();

  return (
    <div className='App'>
      <div className='container-fluid mt-5'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-flex justify-content-between'> {/* Cambia a d-flex y agrega justify-content-between */}
              <Link
                to="/admin" // Cambia esto a la ruta a la que quieras volver
                className='btn' // Clase base para el botón
                style={{ backgroundColor: '#a47551', borderColor: '#a47551', color: 'white' }}
              >
                <i className='fa fa-arrow-left'></i> Volver
              </Link>
              <button
                onClick={() => openModal(1)}
                className='btn' // Clase base para el botón
                style={{ 
                  backgroundColor: '#a47551', 
                  borderColor: '#a47551', 
                  color: 'white', 
                  padding: '0.5rem 4rem' 
                }}
                data-bs-toggle='modal'
                data-bs-target='#modalUser'
              >
                <i className='fa fa-plus-circle mt-2'></i> Añadir Usuario
              </button>
            </div>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered table-custom'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre Completo</th>
                    <th>RUT</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Institución</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {users.map((user, index) => (
                    <tr key={user.ID_USUARIO}>
                      <td>{index + 1}</td>
                      <td>{`${user.NOMBRE1_USUARIO} ${user.NOMBRE2_USUARIO} ${user.APELLIDO1_USUARIO} ${user.APELLIDO2_USUARIO}`}</td>
                      <td>{user.RUT_USUARIO}</td>
                      <td>{user.EMAIL_USUARIO}</td>
                      <td>{getRoleName(user.ID_ROL_USUARIO)}</td>
                      <td>{getInstitucionName(user.ID_INSTITUCION_USUARIO)}</td>
                      <td>
                        <label className='switch'>
                          <input 
                            type='checkbox' 
                            checked={user.ESTADO_CUENTA} 
                            onChange={() => toggleUserStatus(user.ID_USUARIO)}
                          />
                          <span className='slider round'></span>
                        </label>
                      </td>
                      <td>
                        <button 
                          onClick={() => openModal(2, user.ID_USUARIO, user.NOMBRE1_USUARIO, user.NOMBRE2_USUARIO, user.APELLIDO1_USUARIO, user.APELLIDO2_USUARIO, user.RUT_USUARIO,
                              user.EMAIL_USUARIO, user.CONTRASENIA_USUARIO, user.ID_ROL_USUARIO, user.ID_INSTITUCION_USUARIO)}
                          className='btn btn-warning btn-custom' 
                          data-bs-toggle='modal' 
                          data-bs-target='#modalUser'
                        >
                          <i className='fa-solid fa-edit'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id='modalUser' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <input type='hidden' id='id'></input>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='nombre1_usuario' className='form-control' placeholder='Primer nombre' value={nombre1_usuario}
                  onChange={(e) => setNombre1Usuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='nombre2_usuario' className='form-control' placeholder='Segundo nombre' value={nombre2_usuario}
                  onChange={(e) => setNombre2Usuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='apellido1_usuario' className='form-control' placeholder='Primer apellido' value={apellido1_usuario}
                  onChange={(e) => setApellido1Usuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='apellido2_usuario' className='form-control' placeholder='Segundo apellido' value={apellido2_usuario}
                  onChange={(e) => setApellido2Usuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='rut_usuario' className='form-control' placeholder='RUT del usuario' value={rut_usuario}
                  onChange={(e) => setRutUsuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='text' id='email_usuario' className='form-control' placeholder='Correo del Usuario' value={email_usuario}
                  onChange={(e) => setEmailUsuario(e.target.value)}></input>
              </div>
              <div className='input-group mb-3'>
                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                <input type='password' id='contrasenia_usuario' className='form-control' placeholder='Contraseña' value={contrasenia_usuario}
                  onChange={(e) => setContraseniaUsuario(e.target.value)}></input>
              </div>
              {operation === 1 && (  // Solo mostrar en creación
                <>
                  <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                    <select
                      className='form-control'
                      name='id_rol'
                      value={id_rol_usuario}
                      onChange={(e) => {
                        setIdRolUsuario(e.target.value);
                        console.log("Rol seleccionado:", e.target.value);
                      }}
                      style={{ color: 'black' }}
                    >
                      <option value=''>Seleccione un rol</option>
                      {roles.map((rol) => (
                        <option key={rol.ID_ROL} value={rol.ID_ROL}>
                          {rol.NOMBRE_ROL}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='input-group mb-3'>
                    <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                    <select
                      className='form-control'
                      name='id_institucion'
                      value={id_institucion_usuario}
                      onChange={(e) => {
                        setIdInstitucionUsuario(e.target.value);
                        console.log("Institución seleccionada:", e.target.value);
                      }}
                      style={{ color: 'black' }}
                    >
                      <option value=''>Seleccione una institución</option>
                      {instituciones.map((institucion) => (
                        <option key={institucion.ID_INSTITUCION} value={institucion.ID_INSTITUCION}>
                          {institucion.NOMBRE_INSTITUCION}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>
            <div className='modal-footer'>
              <button 
                type='button' 
                className='btn btn-secondary' 
                data-bs-dismiss='modal'
              >
                Cerrar
              </button>
              <button 
                type='button' 
                className='btn btn-primary' 
                onClick={validar}
              >
                {operation === 1 ? 'Crear Usuario' : 'Actualizar Usuario'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
