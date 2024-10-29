import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => {
    // Verificar que la respuesta contenga los datos necesarios
    if (response.data && response.data.token && response.data.rol && response.data.idUser) {
      const { token, rol, idUser } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol); // Aquí almacenas el rol
      localStorage.setItem('idUser', idUser); // Aquí almacenas el id de usuario
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Función para iniciar sesión
export const loginUser = (credentials) => api.post('/login', credentials);

export default api;