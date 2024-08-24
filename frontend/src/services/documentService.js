// src/services/documentService.js

const API_URL = 'http://localhost:3000/documents'; // Asegúrate de que esta URL sea correcta

/**
 * Realiza una solicitud para subir un documento a la API.
 * 
 * @param {FormData} formData - Los datos del formulario que contienen el documento a subir.
 * @returns {Promise<Object>} - La respuesta de la API en formato JSON.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
const uploadDocument = (formData) => {
  return fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      // Verifica si la respuesta es JSON
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el componente
    });
};

/**
 * Realiza una solicitud para obtener la lista de documentos desde la API.
 * 
 * @returns {Promise<Object[]>} - La lista de documentos en formato JSON.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
const getDocuments = () => {
  return fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el componente
    });
};

export default { uploadDocument, getDocuments };
