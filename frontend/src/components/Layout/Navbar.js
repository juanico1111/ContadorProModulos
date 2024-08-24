import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importa los estilos específicos

/**
 * Componente que representa la barra de navegación de la aplicación.
 * Proporciona enlaces a las secciones de Inicio, Login, Registro y Documentos.
 * 
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 * @returns {JSX.Element} El componente de la barra de navegación.
 */
const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/documents">Documentos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
