const mongoose = require('mongoose');

/**
 * Esquema para representar una transacción en la base de datos.
 * @typedef {Object} TransactionSchema
 * @property {'income' | 'expense'} tipo - El tipo de la transacción, ya sea 'income' o 'expense'.
 * @property {Date} fecha - La fecha en que se realizó la transacción. Por defecto, es la fecha actual.
 * @property {String} descripcion - Una descripción de la transacción.
 * @property {Number} valor - El valor de la transacción.
 * @property {String} [nota] - Una nota opcional adicional sobre la transacción.
 */
const transactionSchema = new mongoose.Schema({
  /**
   * Tipo de la transacción.
   * @type {'income' | 'expense'}
   * @required
   */
  tipo: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },

  /**
   * Fecha en que se realizó la transacción. Por defecto, es la fecha actual.
   * @type {Date}
   * @default Date.now
   * @required
   */
  fecha: {
    type: Date,
    default: Date.now,
    required: true
  },

  /**
   * Descripción de la transacción.
   * @type {String}
   * @required
   */
  descripcion: {
    type: String,
    required: true
  },

  /**
   * Valor de la transacción.
   * @type {Number}
   * @required
   */
  valor: {
    type: Number,
    required: true
  },

  /**
   * Nota adicional sobre la transacción.
   * @type {String}
   * @required
   */
  nota: {
    type: String,
    required: false
  }
});

/**
 * Modelo para las transacciones en la base de datos MongoDB.
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('Transaction', transactionSchema);
