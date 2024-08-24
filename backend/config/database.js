// backend/config/database.js
const mongoose = require('mongoose');

/**
 * Conecta a la base de datos MongoDB utilizando la URL de conexión.
 * @async
 * @function connectDB
 * @throws {Error} Si ocurre un error al intentar conectarse a la base de datos.
 * @returns {void} No devuelve nada. Imprime un mensaje en consola indicando el estado de la conexión.
 */
const connectDB = async () => {
    try {
        // Conectarse a la base de datos utilizando la URL de MongoDB
        await mongoose.connect('mongodb+srv://junitomor:Nico289506@cluster0.yyjhciu.mongodb.net/Cluster0?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Salir del proceso con error
    }
};

// Exportar la función para poder usarla en otros archivos
module.exports = connectDB;
