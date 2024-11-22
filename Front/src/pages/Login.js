import React, { useState, useContext } from "react";
import { loginUser } from "../services/Login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Routes/AuthContext";
import { show_alerta } from "../functions";
import "../Styles/Login.css";

const Login = () => {
  const [errors, setErrors] = useState({ email: false, contraseña: false });
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña
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
        setErrors({ email: true, contraseña: true });
        show_alerta(
          "Error al iniciar sesión, por favor verifique los datos.",
          "error"
        );
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        show_alerta(
          error.response.data.msg ||
            "Ocurrió un error al intentar iniciar sesión.",
          "error"
        );

        if (error.response.data.msg === "El email ingresado no es valido") {
          setErrors({ email: true, contraseña: false });
        } else if (error.response.data.msg === "Contraseña Incorrecta") {
          setErrors({ email: false, contraseña: true });
        } else {
          setErrors({ email: true, contraseña: true });
        }
      } else {
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

        <div
          className="form-group input-group"
          style={{ position: "relative" }}
        >
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
          </div>
          <input
            type={showPassword ? "text" : "password"} // Alternar entre texto y contraseña
            name="contraseña"
            placeholder="Contraseña"
            className={`login-input form-control ${
              errors.contraseña ? "error" : ""
            }`}
            onBlur={handleBlur}
            autoComplete="on"
            style={{ paddingRight: "35px" }} // Añadir espacio para el ícono
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)} // Cambiar visibilidad
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: "100", // Mayor z-index para garantizar que esté sobre el input
              pointerEvents: "auto", // Asegura que el ícono sea interactuable
            }}
          >
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
        </div>
        {errors.contraseña && (
          <span className="error-text">
            El campo es obligatorio o incorrecto
          </span>
        )}

        <div className="button-wrapper">
          <button id="boton" type="submit" className="button">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
