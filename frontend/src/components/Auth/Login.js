import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import './Auth.css'; // Importa el archivo CSS para estilos específicos del componente

/**
 * Componente de inicio de sesión.
 * @function
 * @returns {JSX.Element} El componente de login.
 */
const Login = () => {
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
   * @returns {Promise<void>}
   */
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await login({ username, password }); // Llama a la función de login del servicio
      console.log('Login exitoso:', response); // Registra la respuesta en la consola
      navigate('/menu'); // Redirige al menú principal en caso de éxito
    } catch (err) {
      setError('Usuario o contraseña incorrectos'); // Muestra un mensaje de error en caso de fallo
      console.error('Error al iniciar sesión:', err); // Registra el error en la consola
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si existe */}
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del nombre de usuario
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
          required
        />
        <button type="submit">Login</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

export default Login;
