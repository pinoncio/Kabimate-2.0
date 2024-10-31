// pages/RolPage.js
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className='App'>
      <div className='container-fluid mt-5'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-flex justify-content-between'>
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
                  color: 'white',
                  padding: '0.5rem 4rem'
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
                            checked={rol.ESTADO_ROL === 1}
                            onChange={() =>
                              handleToggleRol(rol.ID_ROL, rol.ESTADO_ROL === 1 ? 0 : 1)
                            }
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
  );
};

export default RolPage;
