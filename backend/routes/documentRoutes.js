const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const documentController = require('../controllers/documentController');

const router = express.Router();

// Configurar multer para manejar la carga de archivos
const storage = multer.diskStorage({
  /**
   * Configura el destino para guardar archivos cargados.
   * @param {express.Request} req - La solicitud HTTP.
   * @param {Express.Multer.File} file - El archivo que se está cargando.
   * @param {function} cb - Función de callback para indicar el destino del archivo.
   */
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  /**
   * Configura el nombre del archivo cargado.
   * @param {express.Request} req - La solicitud HTTP.
   * @param {Express.Multer.File} file - El archivo que se está cargando.
   * @param {function} cb - Función de callback para indicar el nombre del archivo.
   */
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  /**
   * Filtra los archivos cargados permitiendo solo imágenes o PDFs.
   * @param {express.Request} req - La solicitud HTTP.
   * @param {Express.Multer.File} file - El archivo que se está cargando.
   * @param {function} cb - Función de callback para indicar si se permite o no el archivo.
   */
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes o PDFs'), false);
    }
  }
});

/**
 * Ruta para subir un documento.
 * @name POST /upload
 * @function
 * @memberof module:routes/documentRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el archivo en el campo 'document'.
 * @param {express.Response} res - La respuesta HTTP, que enviará el documento cargado o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.post('/upload', upload.single('document'), documentController.uploadDocument);

/**
 * Ruta para obtener todos los documentos.
 * @name GET /
 * @function
 * @memberof module:routes/documentRoutes
 * @param {express.Request} req - La solicitud HTTP.
 * @param {express.Response} res - La respuesta HTTP, que enviará una lista de documentos o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.get('/', documentController.getDocuments);

/**
 * Ruta para obtener un documento por ID.
 * @name GET /:id
 * @function
 * @memberof module:routes/documentRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID del documento en los parámetros de la URL.
 * @param {express.Response} res - La respuesta HTTP, que enviará el documento solicitado o un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.get('/:id', documentController.getDocumentById);

/**
 * Ruta para eliminar un documento por ID.
 * @name DELETE /:id
 * @function
 * @memberof module:routes/documentRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID del documento en los parámetros de la URL.
 * @param {express.Response} res - La respuesta HTTP, que enviará un mensaje de éxito o error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.delete('/:id', documentController.deleteDocument);

/**
 * Ruta para descargar un documento en formato PDF.
 * @name GET /:id/download
 * @function
 * @memberof module:routes/documentRoutes
 * @param {express.Request} req - La solicitud HTTP, que debe contener el ID del documento en los parámetros de la URL.
 * @param {express.Response} res - La respuesta HTTP, que iniciará la descarga del archivo o enviará un mensaje de error.
 * @param {express.NextFunction} next - La función para pasar el control al siguiente middleware.
 * @returns {void}
 */
router.get('/:id/download', async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }
    res.download(document.filePath, document.nombre); // Descarga el archivo
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
