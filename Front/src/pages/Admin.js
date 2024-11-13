import React from 'react';
import '../Styles/Admin.css';

const Admin = () => {
  const navigateTo = (path) => {
    window.location.href = path;  // Redirige a la ruta especificada
  };

  return (
    <div className="admin-wrapper">
      <h1 className="admin-title">Panel de Administración</h1>
      <p className="admin-description">
        Este panel proporciona información general sobre las principales tareas de administración.
        A continuación, se detallan las acciones y funciones disponibles.
      </p>

      <div className="info-cards">
        <div className="card" onClick={() => navigateTo('/userA')}>
          <div className="card-icon">👤</div>
          <h2>Gestión de Usuarios Admin</h2>
          <p>Permite administrar los usuarios con privilegios de administrador para gestionar la plataforma.</p>
        </div>

        <div className="card" onClick={() => navigateTo('/userU')}>
          <div className="card-icon">👥</div>
          <h2>Gestión de Usuarios</h2>
          <p>Administra los usuarios registrados, modificando sus datos y permisos según sea necesario.</p>
        </div>

        <div className="card" onClick={() => navigateTo('/rol')}>
          <div className="card-icon">🛠️</div>
          <h2>Gestión de Roles</h2>
          <p>Define y asigna roles a los usuarios para controlar el acceso y las capacidades dentro de la plataforma.</p>
        </div>

        <div className="card" onClick={() => navigateTo('/institucion')}>
          <div className="card-icon">🏢</div>
          <h2>Gestión de Instituciones</h2>
          <p>Gestiona las instituciones asociadas a la plataforma, permitiendo una correcta organización.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
