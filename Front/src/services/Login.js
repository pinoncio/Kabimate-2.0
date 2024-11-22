import axios from "axios";

const API_URL = "http://localhost:3001/api/usuarios";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => response, // Deja que el interceptor solo pase la respuesta sin almacenarla
  (error) => Promise.reject(error)
);

// Función para iniciar sesión
export const loginUser = (credentials) => api.post("/login", credentials);

export default api;
