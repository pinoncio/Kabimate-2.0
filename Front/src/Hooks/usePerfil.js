// usePerfil.js
import { useEffect, useState } from "react";
import { getUserA, updateUserA } from "../services/userA";
import { show_alerta } from "../functions";

export default function usePerfil() {
  const [user, setUser] = useState({
    nombre1_usuario: "",
    nombre2_usuario: "",
    apellido1_usuario: "",
    apellido2_usuario: "",
    rut_usuario: "",
    email_usuario: "",
  });

  const [isEditable, setIsEditable] = useState({
    nombre1_usuario: false,
    nombre2_usuario: false,
    apellido1_usuario: false,
    apellido2_usuario: false,
    rut_usuario: false,
    email_usuario: false,
  });

  useEffect(() => {
    const idUsuario = localStorage.getItem("idUsuario");
    getUserA(idUsuario)
      .then((userData) => {
        setUser({
          nombre1_usuario: userData.data.NOMBRE1_USUARIO || "",
          nombre2_usuario: userData.data.NOMBRE2_USUARIO || "",
          apellido1_usuario: userData.data.APELLIDO1_USUARIO || "",
          apellido2_usuario: userData.data.APELLIDO2_USUARIO || "",
          rut_usuario: userData.data.RUT_USUARIO || "",
          email_usuario: userData.data.EMAIL_USUARIO || "",
        });
      })
      .catch((error) => {
        console.error("Error al obtener usuario:", error);
      });
  }, []);

  const handleEditToggle = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const idUsuario = localStorage.getItem("idUsuario");
    try {
      await updateUserA(idUsuario, user);
      show_alerta("El usuario fue editado con éxito.");
      setUser(user);
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      show_alerta("Error al actualizar el usuario");
    }
  };

  return {
    user,
    isEditable,
    handleEditToggle,
    handleInputChange,
    handleSave,
  };
}
