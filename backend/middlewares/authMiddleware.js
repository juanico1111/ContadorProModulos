const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret'; // Usa la misma clave que en authController.js

/**
 * Middleware para verificar el token JWT en las solicitudes.
 * @function authMiddleware
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función que pasa el control al siguiente middleware.
 * @returns {void} Si el token es válido, pasa al siguiente middleware. Si no, responde con un error.
 */
const authMiddleware = (req, res, next) => {
  // Extraer el token del encabezado Authorization
  const token = req.headers['authorization']?.split(' ')[1];

  // Verificar si el token está presente
  if (!token) return res.status(403).json({ message: 'No se proporcionó token' });

  // Verificar y decodificar el token JWT
  jwt.verify(token, jwtSecret, (err, decoded) => {
    // Si el token es inválido, responder con un error
    if (err) return res.status(403).json({ message: 'Token inválido' });

    // Agregar el ID del usuario decodificado al objeto de solicitud
    req.userId = decoded.id; // Asegúrate de que este campo coincida con lo que envías en el token
    next(); // Pasar al siguiente middleware o ruta
  });
};

module.exports = authMiddleware;
