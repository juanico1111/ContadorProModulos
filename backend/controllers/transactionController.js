const Transaction = require('../models/Transaction');

/**
 * Crea una nueva transacción en la base de datos.
 * @async
 * @function createTransaction
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al guardar la transacción.
 * @returns {void} Devuelve una respuesta JSON con la transacción creada.
 */
exports.createTransaction = async (req, res) => {
  try {
    const { tipo, fecha, descripcion, valor, nota } = req.body;
    const newTransaction = new Transaction({
        tipo, fecha, descripcion, valor, nota
    });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene todas las transacciones almacenadas.
 * @async
 * @function getAllTransactions
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al obtener las transacciones.
 * @returns {void} Devuelve una respuesta JSON con una lista de transacciones.
 */
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene una transacción específica por su ID.
 * @async
 * @function getTransactionById
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al obtener la transacción.
 * @returns {void} Devuelve una respuesta JSON con la transacción encontrada.
 */
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Actualiza una transacción específica por su ID.
 * @async
 * @function updateTransaction
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al actualizar la transacción.
 * @returns {void} Devuelve una respuesta JSON con la transacción actualizada.
 */
exports.updateTransaction = async (req, res) => {
  try {
    const { tipo, fecha, descripcion, valor, nota } = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { tipo, fecha, descripcion, valor, nota },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Elimina una transacción específica por su ID.
 * @async
 * @function deleteTransaction
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al eliminar la transacción.
 * @returns {void} Devuelve una respuesta JSON con el estado de la eliminación.
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transacción no encontrada' });
    }
    res.json({ message: 'Transacción eliminada', deletedTransaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
