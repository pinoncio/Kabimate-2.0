import React, { useState, useContext } from 'react';
import { loginUser } from '../services/Login';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext';
import '../Styles/Login.css';

const Login = () => {
  const [errors, setErrors] = useState({ email: false, contraseña: false });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Asegúrate de que login no sea undefined
  if (!login) {
    console.error('AuthContext is undefined. Make sure AuthProvider is used.');
    return null; // O un mensaje de error apropiado
  }

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === '', // Trim para evitar espacios en blanco
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, contraseña } = event.target.elements;
  
    // Resetear errores
    setErrors({ email: false, contraseña: false });
  
    try {
      const response = await loginUser({
        email: email.value,
        contrasenia: contraseña.value, // Asegúrate de que coincida con el nombre esperado en el backend
      });
  
      if (response.data.token) {
        // Aquí pasa token, rol y idUsuario al contexto
        login(response.data.token, response.data.rol, response.data.idUsuario);
  
        // Redirigir según el rol del usuario
        if (response.data.rol === 1) {
          navigate('/admin'); // Rol 1 va a /admin
        } else if (response.data.rol === 2) {
          navigate('/home'); // Rol 2 va a /
        }
      } else {
        // Si no hay token, muestra el error
        setErrors({ email: true, contraseña: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      // Manejo de errores específico del backend
      if (error.response) {
        // Error del servidor
        setErrors({ email: true, contraseña: true });
      } else {
        // Error de red o configuración
        setErrors({ email: true, contraseña: true });
      }
    }
  };
  

  return (
    <div className="login-wrapper">
      <h1 className="login-title">Bienvenido a Kabimate</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input form-control"
            onBlur={handleBlur}
          />
          {errors.email && <span className="text-danger">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="contraseña" // Verifica que esto coincida con el backend
            placeholder="Contraseña"
            className="input form-control"
            onBlur={handleBlur}
          />
          {errors.contraseña && <span className="text-danger">El campo es obligatorio o incorrecto</span>}
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Iniciar sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
