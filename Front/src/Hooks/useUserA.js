// hooks/useUser.js
import { useEffect, useState } from "react";
import { show_alerta } from "../functions";
import {
  getUsersA,
  createUserA,
  updateUserA,
  activateUserA,
} from "../services/userA";
import { getRoles } from "../services/rol";
import { getInstituciones } from "../services/Insti";


const useUserA = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [instituciones, setInstitucion] = useState([]);
  const [id_usuario, setIdUsuario] = useState("");
  const [nombre1_usuario, setNombre1Usuario] = useState("");
  const [nombre2_usuario, setNombre2Usuario] = useState("");
  const [apellido1_usuario, setApellido1Usuario] = useState("");
  const [apellido2_usuario, setApellido2Usuario] = useState("");
  const [rut_usuario, setRutUsuario] = useState("");
  const [email_usuario, setEmailUsuario] = useState("");
  const [contrasenia_usuario, setContraseniaUsuario] = useState("");
  const [estado_cuenta, setEstadoCuenta] = useState(true);
  const [institucion_usuario, setIdInstitucionUsuario] = useState("");
  const [rol_usuario, setIdRolUsuario] = useState("");
  const [operation, setOperation] = useState(1);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getAllUsers();
    fetchAllRoles();
    getAllInstituciones();
  }, []);

  const getAllUsers = async () => {
    try {
      const userData = await getUsersA();
      console.log("Datos recibidos de la API:", userData); // Agrega esta línea para ver los datos

      const filteredUsers = userData.filter(
        (user) => user.ID_ROL_USUARIO === 1
      );
      console.log("Usuarios filtrados:", filteredUsers); // Agrega esta línea para ver los usuarios filtrados

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchAllRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  const getAllInstituciones = async () => {
    try {
      const instiData = await getInstituciones();
      setInstitucion(instiData);
    } catch (error) {
      console.error("Error al obtener instituciones:", error);
    }
  };

  const openModal = (
    op,
    id_usuario = "",
    nombre1_usuario = "",
    nombre2_usuario = "",
    apellido1_usuario = "",
    apellido2_usuario = "",
    rut_usuario = "",
    email_usuario = "",
    contrasenia_usuario = "",
    id_institucion_usuario = "",
    id_rol_usuario = "1"
  ) => {
    setIdUsuario(id_usuario);
    setNombre1Usuario(nombre1_usuario);
    setNombre2Usuario(nombre2_usuario);
    setApellido1Usuario(apellido1_usuario);
    setApellido2Usuario(apellido2_usuario);
    setRutUsuario(rut_usuario);
    setEmailUsuario(email_usuario);
    setContraseniaUsuario(contrasenia_usuario);
    setIdInstitucionUsuario(id_institucion_usuario);
    setIdRolUsuario(op === 1 ? "1" : id_rol_usuario);
    setOperation(op);
    setTitle(op === 1 ? "Registrar Usuario" : "Editar Usuario");
  };

  const validar = async () => {
    const IdInstitucion = String(institucion_usuario).trim();
    const IdRol = String(rol_usuario).trim();

    // Función de validación para crear usuario
    const validarCreacion = () => {
      return (
        nombre1_usuario.trim() === "" ||
        nombre2_usuario.trim() === "" ||
        apellido1_usuario.trim() === "" ||
        apellido2_usuario.trim() === "" ||
        rut_usuario.trim() === "" ||
        contrasenia_usuario.trim() === "" ||
        IdInstitucion === "" ||
        IdRol === ""
      );
    };

    // Función de validación para actualizar usuario
    const validarActualizacion = () => {
      return (
        nombre1_usuario.trim() === "" ||
        nombre2_usuario.trim() === "" ||
        apellido1_usuario.trim() === "" ||
        apellido2_usuario.trim() === "" ||
        rut_usuario.trim() === "" ||
        contrasenia_usuario.trim() === ""
      );
    };

    // Validación según la operación
    if (operation === 1) {
      // Crear
      if (validarCreacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametros = {
        nombre1_usuario: nombre1_usuario.trim(),
        nombre2_usuario: nombre2_usuario.trim(),
        apellido1_usuario: apellido1_usuario.trim(),
        apellido2_usuario: apellido2_usuario.trim(),
        rut_usuario: rut_usuario.trim(),
        email: email_usuario.trim(),
        contrasenia: contrasenia_usuario.trim(),
        institucion_usuario: institucion_usuario.trim(),
        rol_usuario: rol_usuario.trim(),
      };
      createNewUser(parametros);
      console.log("Datos del usuario a crear/actualizar:", parametros);
    } else {
      // Actualizar
      if (validarActualizacion()) {
        show_alerta("Completa los campos requeridos", "warning");
        return;
      }
      const parametross = {
        nombre1_usuario: nombre1_usuario.trim(),
        nombre2_usuario: nombre2_usuario.trim(),
        apellido1_usuario: apellido1_usuario.trim(),
        apellido2_usuario: apellido2_usuario.trim(),
        rut_usuario: rut_usuario.trim(),
        email_usuario: email_usuario.trim(),
        contrasenia_usuario: contrasenia_usuario.trim(),
      };
      updateExistingUser(id_usuario, parametross);
    }
  };

  const createNewUser = async (user) => {
    try {
      const response = await createUserA(user);
      show_alerta(response.msg, "suaccess");
      document.getElementById("btnCerrar").click();
      getAllUsers();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      show_alerta("Error al crear el usuario", "error");
    }
  };

  const updateExistingUser = async (id_usuario, user) => {
    console.log("Actualizando usuario con ID:", id_usuario, "Datos:", user);

    try {
      await updateUserA(id_usuario, user);
      show_alerta("El usuario fue editado con éxito.", "success");

      // Actualiza el estado de los usuarios manteniendo el orden
      setUsers((prevUsers) =>
        prevUsers.map((usuario) =>
          usuario.ID_USUARIO === id_usuario
            ? {
                ...usuario,
                NOMBRE1_USUARIO: user.nombre1_usuario,
                NOMBRE2_USUARIO: user.nombre2_usuario,
                APELLIDO1_USUARIO: user.apellido1_usuario,
                APELLIDO2_USUARIO: user.apellido2_usuario,
                RUT_USUARIO: user.rut_usuario,
                EMAIL_USUARIO: user.email_usuario,
              }
            : usuario
        )
      );

      // Cierra el modal
      document.getElementById("btnCerrar").click();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      show_alerta("Error al actualizar el usuario", "error");
    }
  };

  // Nueva función toggleUserStatus
  const handleToggleCuenta = async (id_usuario, nuevoEstado) => {
    try {
      // Convertimos el valor booleano a 1 o 0 para enviar al backend
      const estadoNumerico = nuevoEstado ? 1 : 0;
      await activateUserA(id_usuario, estadoNumerico);

      // Actualizamos el estado local manteniendo el orden de los usuarios
      setUsers((prevUsuarios) =>
        prevUsuarios.map((user) =>
          user.ID_USUARIO === id_usuario
            ? { ...user, ESTADO_CUENTA: nuevoEstado }
            : user
        )
      );

      // Mensaje de confirmación
      const mensaje = nuevoEstado
        ? "Cuenta Desbloqueada con éxito"
        : "Cuenta Bloqueada con éxito";
      show_alerta(mensaje, "success");
    } catch (error) {
      console.error("Error al activar/desactivar la cuenta:", error);
      show_alerta("Error al cambiar el estado de la cuenta", "error");
    }
  };

  const getRoleName = (id_rol) => {
    const role = roles.find((r) => r.ID_ROL === id_rol);
    return role ? role.NOMBRE_ROL : "Sin Rol";
  };

  const getInstitucionName = (id_institucion) => {
    const institucion = instituciones.find(
      (i) => i.ID_INSTITUCION === id_institucion
    );
    return institucion ? institucion.NOMBRE_INSTITUCION : "Sin Institución";
  };

  return {
    users,
    roles,
    instituciones,
    id_usuario,
    nombre1_usuario,
    nombre2_usuario,
    apellido1_usuario,
    apellido2_usuario,
    rut_usuario,
    contrasenia_usuario,
    email_usuario,
    estado_cuenta,
    institucion_usuario,
    rol_usuario,
    operation,
    title,
    setNombre1Usuario,
    setNombre2Usuario,
    setApellido1Usuario,
    setApellido2Usuario,
    setRutUsuario,
    setContraseniaUsuario,
    setEmailUsuario,
    setEstadoCuenta,
    setIdInstitucionUsuario,
    setIdRolUsuario,
    openModal,
    validar,
    getAllUsers,
    fetchAllRoles,
    getAllInstituciones,
    getRoleName,
    getInstitucionName,
    handleToggleCuenta,
  };
};

export default useUserA;
