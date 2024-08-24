const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

/**
 * Ruta para crear una nueva transacción.
 * @name POST /
 * @function
 * @memberof module:routes/transactionRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener los datos de la transacción en el cuerpo de la solicitud.
 * @param {express.Response} res - La respuesta HTTP, que enviará la transacción creada o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.post('/', transactionController.createTransaction);

/**
 * Ruta para obtener todas las transacciones.
 * @name GET /
 * @function
 * @memberof module:routes/transactionRoutes
 * @param {express.Request} req - La solicitud HTTP.
 * @param {express.Response} res - La respuesta HTTP, que enviará una lista de todas las transacciones o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.get('/', transactionController.getAllTransactions);

/**
 * Ruta para obtener una transacción por ID.
 * @name GET /:id
 * @function
 * @memberof module:routes/transactionRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID de la transacción en los parámetros de la URL.
 * @param {express.Response} res - La respuesta HTTP, que enviará la transacción solicitada o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.get('/:id', transactionController.getTransactionById);

/**
 * Ruta para actualizar una transacción.
 * @name PUT /:id
 * @function
 * @memberof module:routes/transactionRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID de la transacción en los parámetros de la URL y los datos actualizados en el cuerpo de la solicitud.
 * @param {express.Response} res - La respuesta HTTP, que enviará la transacción actualizada o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.put('/:id', transactionController.updateTransaction);

/**
 * Ruta para eliminar una transacción por ID.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/transactionRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID de la transacción en los parámetros de la URL.
 * @param {express.Response} res - La respuesta HTTP, que enviará un mensaje de éxito o error después de eliminar la transacción.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
