// services/transactionService.js

import axios from 'axios';

const apiUrl = 'http://localhost:3000/transactions';

/**
 * Crea una nueva transacción en la API.
 * 
 * @param {Object} transaction - Los datos de la transacción a crear.
 * @param {string} transaction.tipo - El tipo de transacción (por ejemplo, 'income' o 'expense').
 * @param {string} transaction.fecha - La fecha de la transacción en formato ISO.
 * @param {string} transaction.descripcion - Una descripción de la transacción.
 * @param {number} transaction.valor - El valor de la transacción.
 * @param {string} [transaction.nota] - Una nota opcional para la transacción.
 * @returns {Promise<Object>} - La respuesta de la API en formato JSON.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
export const createTransaction = async (transaction) => {
  try {
    const response = await axios.post(apiUrl, transaction);
    return response.data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

/**
 * Obtiene la lista de transacciones desde la API.
 * 
 * @returns {Promise<Object[]>} - La lista de transacciones en formato JSON.
 * @throws {Error} - Si ocurre un error durante la solicitud.
 */
export const getTransactions = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
