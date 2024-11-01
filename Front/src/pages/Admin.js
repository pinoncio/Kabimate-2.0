import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import '../Styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();  

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Panel de Administración</h1>
      <div className="honeycomb-grid">
        <div className="hexagon user" onClick={() => navigate('/userA')}>
          <p>Gestión de Usuarios Admin</p>
        </div>
        <div className="hexagon user" onClick={() => navigate('/userU')}>
          <p>Gestión de Usuarios</p>
        </div>
        <div className="hexagon roles" onClick={() => navigate('/rol')}>
          <p>Gestión de Roles</p>
        </div>
        <div className="hexagon delete-user" onClick={() => navigate('/institucion')}>
          <p>Gestión de Instituciones</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
