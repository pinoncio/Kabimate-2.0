import React, { useState, useContext } from "react";
import { loginUser } from "../services/Login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";
import { show_alerta } from "../functions";
import "../Styles/Login.css";

const Login = () => {
  const [errors, setErrors] = useState({ email: false, contraseña: false });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!login) {
    console.error("AuthContext is undefined. Make sure AuthProvider is used.");
    return null;
  }

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, contraseña } = event.target.elements;

    setErrors({ email: false, contraseña: false });

    try {
      const response = await loginUser({
        email: email.value,
        contrasenia: contraseña.value,
      });

      if (response.data.token) {
        login(response.data.token, response.data.rol, response.data.idUsuario);

        if (response.data.rol === 1) {
          navigate("/admin");
        } else if (response.data.rol === 2) {
          navigate("/home");
        }
      } else {
        // Si no hay token en la respuesta, se asume que hubo un error
        setErrors({ email: true, contraseña: true });
        show_alerta(
          "Error al iniciar sesión, por favor verifique los datos.",
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      // Si el error es de tipo response (backend devuelve un error)
      if (error.response) {
        // Mostrar mensaje de error basado en el mensaje de respuesta del backend
        show_alerta(
          error.response.data.msg ||
            "Ocurrió un error al intentar iniciar sesión.",
          "error"
        );

        // Opcional: establecer errores en el formulario según el tipo de error recibido
        if (error.response.data.msg === "El email ingresado no es valido") {
          setErrors({ email: true, contraseña: false });
        } else if (error.response.data.msg === "Contraseña Incorrecta") {
          setErrors({ email: false, contraseña: true });
        } else {
          setErrors({ email: true, contraseña: true });
        }
      } else {
        // Si el error es de otro tipo (red, problemas en la conexión, etc.)
        show_alerta(
          "Hubo un problema con la conexión. Intenta más tarde.",
          "error"
        );
        setErrors({ email: true, contraseña: true });
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Bienvenido a Kabimate</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form-subtitle">Iniciar sesión</h2>
        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className={`login-input form-control ${
              errors.email ? "error-text" : ""
            }`}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && (
          <span className="error-text">
            El campo es obligatorio o incorrecto
          </span>
        )}

        <div className="form-group input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            className={`login-input form-control ${
              errors.contraseña ? "error" : ""
            }`}
            onBlur={handleBlur}
            autocomplete="on"
          />
        </div>
        {errors.contraseña && (
          <span className="error-text">
            El campo es obligatorio o incorrecto
          </span>
        )}

        <div className="button-wrapper">
          <button id = "boton" type="submit" className="button">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
