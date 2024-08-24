import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css'; // Importa el CSS del menú

/**
 * Componente que representa el menú principal de la aplicación.
 * Proporciona enlaces a las secciones de Documentos y Transacciones.
 * 
 * @component
 * @example
 * return (
 *   <Menu />
 * )
 * @returns {JSX.Element} El componente del menú principal.
 */
const Menu = () => {
  return (
    <div className="menu">
      <h1>Menú Principal</h1>
      <div className="menu-item">
        <Link to="/documents">Documentos</Link>
      </div>
      <div className="menu-item">
        <Link to="/transactions">Transacciones</Link> {/* Enlace a la lista de transacciones */}
      </div>
    </div>
  );
};

export default Menu;
