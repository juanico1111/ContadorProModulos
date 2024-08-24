import React from 'react';
import { Link } from 'react-router-dom';
import './DocumentMenu.css'; // Importa los estilos específicos

/**
 * Componente que representa el menú de documentos.
 * Muestra enlaces para cargar nuevos documentos y ver la lista de documentos existentes.
 * 
 * @component
 * @example
 * return (
 *   <DocumentMenu />
 * )
 * @returns {JSX.Element} El componente del menú de documentos.
 */
const DocumentMenu = () => {
  return (
    <div className="document-menu">
      <h2>Documentos</h2>
      <div className="button-container">
        <Link to="/documents/upload" className="button">
          Cargar Documentos
        </Link>
        <Link to="/documents/list" className="button">
          Lista de Documentos
        </Link>
      </div>
    </div>
  );
};

export default DocumentMenu;
