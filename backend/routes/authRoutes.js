const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * Ruta para registrar un nuevo usuario.
 * @name POST /register
 * @function
 * @memberof module:routes/authRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener los datos del usuario en el cuerpo.
 * @param {express.Response} res - La respuesta HTTP, que enviará un mensaje de éxito o error.
 * @returns {void}
 */
router.post('/register', register);

/**
 * Ruta para iniciar sesión de un usuario existente.
 * @name POST /login
 * @function
 * @memberof module:routes/authRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el nombre de usuario y la contraseña en el cuerpo.
 * @param {express.Response} res - La respuesta HTTP, que enviará un token de autenticación o un mensaje de error.
 * @returns {void}
 */
router.post('/login', login);

module.exports = router;
