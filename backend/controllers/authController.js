// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/auth');

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Guarda esto en una variable de entorno

/**
 * Registra un nuevo usuario en la base de datos.
 * @async
 * @function register
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al registrar el usuario.
 * @returns {void} Devuelve una respuesta JSON con el estado de la operación.
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Nombre de usuario ya está en uso' });
    }

    // Crear nuevo usuario
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

/**
 * Inicia sesión de un usuario y genera un token JWT.
 * @async
 * @function login
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al iniciar sesión.
 * @returns {void} Devuelve una respuesta JSON con el estado de la operación y el token JWT.
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

module.exports = { register, login };
