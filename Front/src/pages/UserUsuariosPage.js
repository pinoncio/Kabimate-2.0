import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserU from "../Hooks/useUserU";
import "../Styles/Crud.css";

const UserPageU = () => {
  const {
    users,
    instituciones,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
    rut_usuario,
    contrasenia_usuario,
    email_usuario,
    institucion_usuario,
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
    openModal,
    validar,
    getRoleName,
    getInstitucionName,
    handleToggleCuenta,
    handleExcelUpload,
  } = useUserU();

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      handleExcelUpload(file);
      console.log("Archivo enviado a handleExcelUpload:", file.name);
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  };

  return (
    <div className="bg-light">
      <div className="container-fluid-a">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <div
              className="d-flex justify-content-between"
              style={{ marginTop: "50px" }}
            >
              <Link
                to="/admin"
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
              >
                <i className="fa fa-arrow-left"></i> Volver
              </Link>
              <button
                onClick={() => openModal(1)}
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalUser"
              >
                <i className="fa fa-plus-circle mt-2"></i> Añadir Usuario
              </button>
              <button
                className="btn"
                style={{
                  backgroundColor: "#a47551",
                  borderColor: "#a47551",
                  color: "white",
                }}
                data-bs-toggle="modal"
                data-bs-target="#modalMassUpload"
              >
                <i className="fa fa-upload"></i> Subida Masiva
              </button>
            </div>
          </div>
        </div>
        {/* Lista de usuarios existente */}
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="card-container">
              <h2 className="text-center mb-4" style={{ color: "#a47551" }}>
                Lista de Usuarios
              </h2>
              {/* Tabla de usuarios */}
              <div className="table-responsive">
                <table className="table table-bordered table-custom">
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
                  <tbody className="table-group-divider">
                    {users.map((user, index) => (
                      <tr key={user.ID_USUARIO}>
                        <td>{index + 1}</td>
                        <td>{`${user.NOMBRE1_USUARIO} ${user.NOMBRE2_USUARIO} ${user.APELLIDO1_USUARIO} ${user.APELLIDO2_USUARIO}`}</td>
                        <td>{user.RUT_USUARIO}</td>
                        <td>{user.EMAIL_USUARIO}</td>
                        <td>{getRoleName(user.ID_ROL_USUARIO)}</td>
                        <td>
                          {getInstitucionName(user.ID_INSTITUCION_USUARIO)}
                        </td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={user.ESTADO_CUENTA === true}
                              onChange={() =>
                                handleToggleCuenta(
                                  user.ID_USUARIO,
                                  !user.ESTADO_CUENTA
                                )
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              openModal(
                                2,
                                user.ID_USUARIO,
                                user.NOMBRE1_USUARIO,
                                user.NOMBRE2_USUARIO,
                                user.APELLIDO1_USUARIO,
                                user.APELLIDO2_USUARIO,
                                user.RUT_USUARIO,
                                user.EMAIL_USUARIO,
                                user.CONTRASENIA_USUARIO,
                                user.ID_ROL_USUARIO,
                                user.ID_INSTITUCION_USUARIO
                              )
                            }
                            className="btn btn-warning btn-custom"
                            data-bs-toggle="modal"
                            data-bs-target="#modalUser"
                          >
                            <i className="fa-solid fa-edit"></i>
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
        <div id="modalUser" className="modal fade" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <label className="h5">{title}</label>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="hidden"
                  id="id"
                  value={operation === 2 ? institucion_usuario : ""}
                ></input>
                {[
                  {
                    id: "nombre1_usuario",
                    label: "Primer nombre",
                    value: nombre1_usuario,
                    setValue: setNombre1Usuario,
                  },
                  {
                    id: "nombre2_usuario",
                    label: "Segundo nombre",
                    value: nombre2_usuario,
                    setValue: setNombre2Usuario,
                  },
                  {
                    id: "apellido1_usuario",
                    label: "Primer apellido",
                    value: apellido1_usuario,
                    setValue: setApellido1Usuario,
                  },
                  {
                    id: "apellido2_usuario",
                    label: "Segundo apellido",
                    value: apellido2_usuario,
                    setValue: setApellido2Usuario,
                  },
                  {
                    id: "rut_usuario",
                    label: "RUT del usuario",
                    value: rut_usuario,
                    setValue: setRutUsuario,
                  },
                  {
                    id: "email_usuario",
                    label: "Correo del Usuario",
                    value: email_usuario,
                    setValue: setEmailUsuario,
                  },
                  {
                    id: "contrasenia_usuario",
                    label: "Contraseña",
                    type: "password",
                    value: contrasenia_usuario,
                    setValue: setContraseniaUsuario,
                  },
                ].map((input) => (
                  <div className="input-group mb-3" key={input.id}>
                    <span className="input-group-text">
                      <i className="fa-solid fa-gift"></i>
                    </span>
                    <input
                      type={input.type || "text"}
                      id={input.id}
                      className="form-control"
                      placeholder={input.label}
                      value={input.value}
                      onChange={(e) => input.setValue(e.target.value)}
                    />
                  </div>
                ))}
                {operation === 1 && (
                  <>
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa-solid fa-gift"></i>
                      </span>
                      <select
                        className="form-control"
                        name="id_institucion"
                        value={institucion_usuario}
                        onChange={(e) => {
                          setIdInstitucionUsuario(e.target.value);
                        }}
                        style={{ color: "black" }}
                      >
                        <option value="">Seleccione una institución</option>
                        {instituciones.map((institucion) => (
                          <option
                            key={institucion.ID_INSTITUCION}
                            value={institucion.ID_INSTITUCION}
                          >
                            {institucion.NOMBRE_INSTITUCION}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  id="btnCerrar"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={validar}
                >
                  {operation === 1 ? "Crear Usuario" : "Actualizar Usuario"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="modalMassUpload" className="modal fade" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ingreso Masivo de Usuarios</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="close"
                ></button>
              </div>
              <div
                className="modal-body"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <p>
                  Arrastra y suelta el archivo aquí o selecciona uno
                  manualmente:
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleFileChange}
                  className="form-control"
                />
                {file && <p>Archivo seleccionado: {file.name}</p>}
              </div>
              <div className="modal-footer">
                <button
                  id="btnCerrar"
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpload}
                >
                  Subir Archivo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPageU;
