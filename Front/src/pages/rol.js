// pages/RolPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import '../Styles/rol.css';
import { useRol } from '../Hooks/useRol.js';

const RolPage = () => {
  const {
    roles,
    nombre_rol,
    setNombreRol,
    operation,
    title,
    openModal,
    validar,
    deleteRolById,
    handleToggleRol
  } = useRol();

  return (
    <div className='bg-light'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-flex justify-content-between' style={{ marginTop: '50px' }}>
              <Link
                to="/admin"
                className='btn'
                style={{ backgroundColor: '#a47551', borderColor: '#a47551', color: 'white' }}
              >
                <i className='fa fa-arrow-left'></i> Volver
              </Link>
              <button
                onClick={() => openModal(1)}
                className='btn btn-primary'
                style={{
                  backgroundColor: '#a47551',
                  borderColor: '#a47551',
                  color: 'white'
                }}
                data-bs-toggle='modal'
                data-bs-target='#modalRoles'
              >
                <i className='fa fa-plus-circle mt-2'></i> Añadir Rol
              </button>
            </div>
          </div>
        </div>

        <div className='row mt-5'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='card-container'>
              <h2 className='text-center mb-4' style={{ color: '#a47551' }}>Lista de Roles</h2>
              <div className='table-responsive'>
                <table className='table table-bordered table-custom'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>NOMBRE</th>
                      <th>ESTADO</th>
                      <th>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody className='table-group-divider'>
                    {roles.map((rol, i) => (
                      <tr key={rol.ID_ROL}>
                        <td>{i + 1}</td>
                        <td>{rol.NOMBRE_ROL}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={rol.ESTADO_ROL === true}
                              onChange={() => handleToggleRol(rol.ID_ROL, !rol.ESTADO_ROL)}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={() => openModal(2, rol.ID_ROL, rol.NOMBRE_ROL)}
                            className='btn btn-warning btn-custom'
                            data-bs-toggle='modal'
                            data-bs-target='#modalRoles'
                          >
                            <i className='fa-solid fa-edit'></i>
                          </button>
                          &nbsp;
                          <button
                            onClick={() => deleteRolById(rol.ID_ROL, rol.NOMBRE_ROL)}
                            className='btn btn-danger'
                          >
                            <i className='fa-solid fa-trash'></i>
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
        </div>

      {/* Modal para agregar/editar roles */}
      <div id='modalRoles' className='modal fade' aria-hidden='true'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <label className='h5'>{title}</label>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='close'></button>
            </div>
            <div className='modal-body'>
              <div className='input-group mb-3'>
                <span className='input-group-text'>
                  <i className='fa-solid fa-gift'></i>
                </span>
                <input
                  type='text'
                  id='nombre'
                  className='form-control'
                  placeholder='Nombre del Rol'
                  value={nombre_rol}
                  onChange={(e) => setNombreRol(e.target.value)}
                />
              </div>
              <div className='d-grid col-6 mx-auto'>
                <button onClick={() => validar()} className='btn btn-success'>
                  {operation === 1 ? 'Registrar' : 'Actualizar'}
                  <i className='fas fa-save ms-2'></i>
                </button>
                <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
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

export default RolPage;
