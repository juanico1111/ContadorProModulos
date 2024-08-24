const mongoose = require('mongoose');

// Define el esquema para los documentos
/**
 * Esquema para representar un documento en la base de datos.
 * @typedef {Object} DocumentSchema
 * @property {String} nombre - El nombre del documento.
 * @property {Number} peso - El peso del documento en bytes.
 * @property {String} url - La URL donde se encuentra el documento.
 * @property {String} [descripcion] - Una descripción opcional del documento.
 * @property {String} filePath - La ruta del archivo en el sistema de archivos.
 * @property {Date} fecha - La fecha en que se creó o subió el documento.
 */
const documentSchema = new mongoose.Schema({
  /**
   * Nombre del documento.
   * @type {String}
   * @required
   */
  nombre: {
    type: String,
    required: true,
  },

  /**
   * Peso del documento en bytes.
   * @type {Number}
   * @required
   */
  peso: {
    type: Number,
    required: true,
  },

  /**
   * URL donde se encuentra el documento.
   * @type {String}
   * @required
   */
  url: {
    type: String,
    required: true,
  },

  /**
   * Descripción opcional del documento.
   * @type {String}
   * @required
   */
  descripcion: {
    type: String,
    required: false,
  },

  /**
   * Ruta del archivo en el sistema de archivos.
   * @type {String}
   * @required
   */
  filePath: {
    type: String,
    required: true,
  },

  /**
   * Fecha en que se creó o subió el documento.
   * @type {Date}
   * @required
   */
  fecha: {
    type: Date,
    required: true,
  },
});

// Exporta el modelo basado en el esquema
/**
 * Modelo para los documentos en la base de datos MongoDB.
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('Document', documentSchema);
