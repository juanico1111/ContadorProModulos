// src/services/authService.js

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Maneja la respuesta de una solicitud HTTP y lanza un error si la respuesta no es OK.
 * 
 * @param {Response} response - La respuesta de la solicitud HTTP.
 * @returns {Promise<Object>} - Los datos de la respuesta en formato JSON.
 * @throws {Error} - Si la respuesta no es OK, lanza un error con el mensaje de la respuesta.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }
  return response.json();
};

/**
 * Realiza una solicitud de inicio de sesión a la API.
 * 
 * @param {Object} credentials - Las credenciales del usuario para el inicio de sesión.
 * @param {string} credentials.username - El nombre de usuario del usuario.
 * @param {string} credentials.password - La contraseña del usuario.
 * @returns {Promise<Object>} - La respuesta de la API en formato JSON.
 */
export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
};

/**
 * Realiza una solicitud de registro a la API.
 * 
 * @param {Object} userData - Los datos del usuario para el registro.
 * @param {string} userData.username - El nombre de usuario del usuario.
 * @param {string} userData.email - El correo electrónico del usuario.
 * @param {string} userData.password - La contraseña del usuario.
 * @returns {Promise<Object>} - La respuesta de la API en formato JSON.
 */
export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return handleResponse(response);
};
