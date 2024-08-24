import React, { useState } from 'react';
import { createTransaction } from '../../services/transactionService';
import './TransactionForm.css'; // Importa los estilos

/**
 * Componente para crear una nueva transacción.
 * Permite al usuario ingresar detalles de una transacción y enviarlos al servidor.
 * 
 * @component
 * @example
 * return (
 *   <TransactionForm />
 * )
 * @returns {JSX.Element} El formulario para crear una transacción.
 */
const TransactionForm = () => {
  const [tipo, setTipo] = useState('income');
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('');
  const [nota, setNota] = useState('');

  /**
   * Maneja el envío del formulario.
   * Envía los datos de la transacción al servidor y muestra una alerta de éxito o error.
   * 
   * @param {Event} event - El evento de envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    const transaction = {
      tipo,
      fecha,
      descripcion,
      valor,
      nota
    };

    try {
      await createTransaction(transaction);
      alert('Transacción creada con éxito');
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      alert('Error al crear la transacción');
    }
  };

  return (
    <div className="transaction-form">
      <h1>Crear Transacción</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="income">Ingreso</option>
            <option value="expense">Gasto</option>
          </select>
        </label>
        <label>
          Fecha:
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </label>
        <label>
          Descripción:
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>
        <label>
          Valor:
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </label>
        <label>
          Nota:
          <input
            type="text"
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          />
        </label>
        <button type="submit">Crear Transacción</button>
      </form>
    </div>
  );
};

export default TransactionForm;
