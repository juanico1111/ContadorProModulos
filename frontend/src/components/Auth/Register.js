import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/authService';
import './Auth.css'; // Importa el archivo CSS para estilos específicos del componente

/**
 * Componente de registro de usuario.
 * @function
 * @returns {JSX.Element} El componente de registro.
 */
const Register = () => {
  const [username, setUsername] = useState(''); // Estado para almacenar el nombre de usuario
  const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
  const [error, setError] = useState(''); // Estado para almacenar mensajes de error
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  /**
   * Maneja el envío del formulario de registro.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento del formulario.
   * @returns {Promise<void>}
   */
  const handleRegister = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const response = await register({ username, email, password }); // Llama a la función de registro del servicio
      console.log('Registro exitoso:', response); // Registra la respuesta en la consola
      navigate('/menu'); // Redirige al menú principal en caso de éxito
    } catch (err) {
      setError('Error al registrar usuario'); // Muestra un mensaje de error en caso de fallo
      console.error('Error al registrar usuario:', err); // Registra el error en la consola
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si existe */}
      <form onSubmit={handleRegister}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Actualiza el estado del nombre de usuario
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del correo electrónico
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
        <button type="submit">Register</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

export default Register;
