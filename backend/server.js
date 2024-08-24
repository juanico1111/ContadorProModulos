const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importa el paquete cors para manejar CORS
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const documentRoutes = require('./routes/documentRoutes'); // Rutas para manejar documentos
const path = require('path');
const transactionRoutes = require('./routes/transactionRoutes');
const fs = require('fs');

require('dotenv').config(); // Carga variables de entorno desde el archivo .env

const app = express();
const PORT = 3000; // Puerto en el que el servidor escuchará

/**
 * Configura el middleware CORS para permitir solicitudes desde el frontend.
 * @type {Object}
 */
app.use(cors({
  origin: 'http://localhost:3001', // URL del frontend que tiene permiso para hacer solicitudes
  credentials: true, // Permite el uso de cookies o headers de autorización
}));

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas para autenticación
app.use('/auth', authRoutes);

// Rutas para manejar documentos
app.use('/documents', documentRoutes);

// Rutas para manejar transacciones
app.use('/transactions', transactionRoutes);

/**
 * Ruta protegida que solo puede ser accedida con un token válido.
 * @name GET /api/protected
 * @function
 * @memberof module:routes
 * @param {Request} req - La solicitud del cliente.
 * @param {Response} res - La respuesta del servidor.
 */
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('Esta es una ruta protegida.');
});

// Conectar a la base de datos MongoDB usando la URI definida en las variables de entorno
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('Error al conectar con MongoDB', error));

// Servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/**
 * Inicia el servidor y escucha en el puerto definido.
 * @function
 */
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
