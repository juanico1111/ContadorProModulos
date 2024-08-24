import React, { useState } from 'react';
import documentService from '../services/documentService';
import './DocumentUpload.css';

/**
 * Componente para subir un documento.
 * 
 * Permite al usuario ingresar detalles sobre el documento, seleccionar un archivo y subirlo al servidor.
 * 
 * @component
 * @example
 * return (
 *   <DocumentUpload />
 * )
 * @returns {JSX.Element} Formulario para la carga de documentos.
 */
const DocumentUpload = () => {
  const [nombre, setNombre] = useState('');
  const [peso, setPeso] = useState('');
  const [url, setUrl] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [document, setDocument] = useState(null);

  /**
   * Maneja el cambio en el campo de archivo.
   * 
   * @param {Event} e - Evento del cambio de archivo.
   */
  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  /**
   * Maneja el envío del formulario.
   * 
   * Valida los campos, crea un objeto FormData y lo envía al servidor usando documentService.
   * 
   * @param {Event} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !peso || !url || !fecha) {
      alert('Nombre, peso, URL y fecha son campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('peso', Number(peso));
    formData.append('url', url);
    formData.append('descripcion', descripcion);
    formData.append('fecha', fecha);
    formData.append('document', document);

    try {
      const response = await documentService.uploadDocument(formData);
      console.log('Respuesta del servidor:', response);
      alert('Documento subido con éxito.');
    } catch (error) {
      console.error('Error al subir el documento:', error);
      alert('Error al subir el documento: ' + error.message);
    }
  };

  return (
    <div className="document-upload">
      <h2>Subir Documento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Peso (en números):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción (opcional):</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div>
          <label>Fecha de Carga:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Documento:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Subir Documento</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
