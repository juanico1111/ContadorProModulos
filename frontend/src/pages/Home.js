import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa el archivo CSS que crearemos

/**
 * Componente de la página de inicio para la aplicación ContadorPro.
 * 
 * Muestra el título y la descripción de la aplicación, y proporciona botones
 * para navegar a las páginas de inicio de sesión y registro.
 * 
 * @returns {JSX.Element} Elemento JSX que representa la página de inicio.
 */
const Home = () => {
  const navigate = useNavigate();

  /**
   * Maneja el clic en el botón de login.
   * Redirige al usuario a la página de inicio de sesión.
   */
  const handleLoginClick = () => {
    navigate('/login');
  };

  /**
   * Maneja el clic en el botón de registro.
   * Redirige al usuario a la página de registro.
   */
  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1>ContadorPro</h1>
      <p>Organizador contable</p>
      <div className="button-group">
        <button onClick={handleLoginClick} className="home-button">Login</button>
        <button onClick={handleRegisterClick} className="home-button">Register</button>
      </div>
    </div>
  );
};

export default Home;
