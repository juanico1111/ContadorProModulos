// frontend/src/pages/MenuPage.js
import React from 'react';
import Menu from '../components/Layout/Menu';

/**
 * Página del menú principal de la aplicación.
 * 
 * Este componente renderiza el componente `Menu` que muestra las opciones de navegación
 * disponibles para los usuarios después de iniciar sesión.
 * 
 * @returns {JSX.Element} Elemento JSX que representa la página del menú principal.
 */
const MenuPage = () => {
  return (
    <div>
      <Menu />
    </div>
  );
};

export default MenuPage;
