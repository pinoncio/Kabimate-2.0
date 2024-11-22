// PerfilA.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { PersonCircle, PencilSquare } from "react-bootstrap-icons";
import usePerfil from "../Hooks/usePerfil";
import "../Styles/PerfilA.css";

export default function PerfilA() {
  const { user, isEditable, handleEditToggle, handleInputChange, handleSave } =
    usePerfil();

  const navigate = useNavigate();

  return (
    <div className="perfil-wrapper mt">
      <div className="container-perfil text-center ">
        <PersonCircle size={100} className="mb-5" />
        <form>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label htmlFor="nombre1_usuario" className="form-label">
                Primer Nombre
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre1_usuario"
                  value={user.nombre1_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["nombre1_usuario"]}
                  placeholder="Primer Nombre"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("nombre1_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="nombre2_usuario" className="form-label">
                Segundo Nombre
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="nombre2_usuario"
                  value={user.nombre2_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["nombre2_usuario"]}
                  placeholder="Segundo Nombre"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("nombre2_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="apellido1_usuario" className="form-label">
                Primer Apellido
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="apellido1_usuario"
                  value={user.apellido1_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["apellido1_usuario"]}
                  placeholder="Primer Apellido"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("apellido1_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="apellido2_usuario" className="form-label">
                Segundo Apellido
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="apellido2_usuario"
                  value={user.apellido2_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["apellido2_usuario"]}
                  placeholder="Segundo Apellido"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("apellido2_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="rut_usuario" className="form-label">
                Mi RUT
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="rut_usuario"
                  value={user.rut_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["rut_usuario"]}
                  placeholder="RUT"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("rut_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label htmlFor="email_usuario" className="form-label">
                Correo Electrónico
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="email_usuario"
                  value={user.email_usuario}
                  onChange={handleInputChange}
                  disabled={!isEditable["email_usuario"]}
                  placeholder="Correo Electrónico"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleEditToggle("email_usuario")}
                >
                  <PencilSquare />
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="btn btn-secondary me-3"
              onClick={() => navigate("/admin")}
            >
              Volver
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
