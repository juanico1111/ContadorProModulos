import React from 'react';
import { Link } from 'react-router-dom';
import './TransactionMenu.css'; // Importa los estilos

/**
 * Componente para mostrar el menú de transacciones.
 * 
 * @component
 * @example
 * return (
 *   <TransactionMenu />
 * )
 * @returns {JSX.Element} El menú de navegación para las transacciones.
 */
const TransactionMenu = () => {
  return (
    <div className="transaction-menu">
      <h1>Menú de Transacciones</h1>
      <nav>
        <ul>
          <li>
            <Link to="/transactions/create">Crear Transacción</Link>
          </li>
          <li>
            <Link to="/transactions/list">Lista de Transacciones</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TransactionMenu;
