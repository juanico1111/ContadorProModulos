import React, { useEffect, useState } from 'react';
import { getTransactions } from '../../services/transactionService';
import './TransactionList.css'; // Importa los estilos

/**
 * Agrupa las transacciones por mes y año.
 * 
 * @param {Array} transactions - Array de transacciones a agrupar.
 * @returns {Object} Un objeto donde las claves son los meses (formato "mes año") y los valores son arrays de transacciones.
 */
const groupByMonth = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.fecha).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(transaction);
    return acc;
  }, {});
};

/**
 * Componente para mostrar una lista de transacciones agrupadas por mes.
 * 
 * @component
 * @example
 * return (
 *   <TransactionList />
 * )
 * @returns {JSX.Element} La lista de transacciones agrupadas por mes.
 */
const TransactionList = () => {
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        const groupedTransactions = groupByMonth(data);
        setTransactions(groupedTransactions);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="transaction-list">
      <h1>Lista de Transacciones</h1>
      {Object.keys(transactions).length === 0 ? (
        <p>No hay transacciones para mostrar.</p>
      ) : (
        Object.entries(transactions).map(([month, transactions]) => (
          <div key={month} className="transaction-month">
            <h2>{month}</h2>
            <ul>
              {transactions.map((transaction) => (
                <li key={transaction._id}>
                  <div className="transaction-item">
                    <p><strong>Descripción:</strong> {transaction.descripcion}</p>
                    <p><strong>Valor:</strong> ${transaction.valor}</p>
                    <p><strong>Tipo:</strong> {transaction.tipo === 'income' ? 'Ingreso' : 'Gasto'}</p>
                    <p><strong>Fecha:</strong> {new Date(transaction.fecha).toLocaleDateString('es-ES')}</p>
                    {transaction.nota && <p><strong>Nota:</strong> {transaction.nota}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
