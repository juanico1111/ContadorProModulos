const Document = require('../models/Document');
const path = require('path');
const fs = require('fs');

/**
 * Sube un nuevo documento al sistema.
 * @async
 * @function uploadDocument
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al guardar el documento.
 * @returns {void} Devuelve una respuesta JSON con el documento guardado.
 */
exports.uploadDocument = async (req, res) => {
  const { nombre, peso, url, descripcion, fecha } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No se adjuntó ningún documento' });
  }

  let fechaDocument;
  try {
    fechaDocument = new Date(fecha);
  } catch (error) {
    return res.status(400).json({ message: 'Fecha inválida' });
  }

  const newDocument = new Document({
    nombre,
    peso,
    url,
    descripcion,
    fecha: fechaDocument,
    filePath: req.file.path
  });

  try {
    const savedDocument = await newDocument.save();
    res.json(savedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene todos los documentos almacenados.
 * @async
 * @function getDocuments
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al obtener los documentos.
 * @returns {void} Devuelve una respuesta JSON con una lista de documentos.
 */
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Obtiene un documento específico por su ID.
 * @async
 * @function getDocumentById
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al obtener el documento.
 * @returns {void} Devuelve una respuesta JSON con el documento encontrado.
 */
exports.getDocumentById = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Elimina un documento específico por su ID.
 * @async
 * @function deleteDocument
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @throws {Error} Si ocurre un error al eliminar el documento o el archivo.
 * @returns {void} Devuelve una respuesta JSON con el estado de la operación.
 */
exports.deleteDocument = async (req, res) => {
  const { id } = req.params;

  try {
    const document = await Document.findByIdAndDelete(id);
    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    fs.unlink(document.filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al eliminar el archivo' });
      }
      res.json({ message: 'Documento eliminado con éxito' });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
