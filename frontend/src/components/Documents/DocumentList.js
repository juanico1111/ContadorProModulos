import React, { useEffect, useState } from 'react';
import documentService from '../../services/documentService';
import './DocumentList.css';

/**
 * Agrupa los documentos por mes y año.
 * @param {Array} documents - Lista de documentos a agrupar.
 * @returns {Object} Objeto con meses como claves y listas de documentos como valores.
 */
const groupByMonth = (documents) => {
  return documents.reduce((acc, document) => {
    const date = new Date(document.fecha);
    const month = date.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(document);
    return acc;
  }, {});
};

/**
 * Componente para listar documentos agrupados por mes.
 * @function
 * @returns {JSX.Element} El componente de lista de documentos.
 */
const DocumentList = () => {
  const [documents, setDocuments] = useState({}); // Estado para almacenar documentos agrupados por mes
  const [openMonth, setOpenMonth] = useState(null); // Estado para controlar el mes abierto en la vista

  /**
   * Obtiene los documentos del servicio y los agrupa por mes.
   * @async
   * @function
   */
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await documentService.getDocuments(); // Llama al servicio para obtener documentos
        const groupedDocuments = groupByMonth(data); // Agrupa los documentos por mes
        setDocuments(groupedDocuments); // Actualiza el estado con documentos agrupados
      } catch (error) {
        console.error('Error fetching documents:', error); // Maneja errores de la llamada al servicio
      }
    };
    fetchDocuments(); // Ejecuta la función para obtener documentos al montar el componente
  }, []);

  /**
   * Maneja la descarga de un documento.
   * @param {string} id - ID del documento a descargar.
   */
  const handleDownload = (id) => {
    window.location.href = `http://localhost:3000/documents/${id}/download`; // Redirige para descargar el documento
  };

  /**
   * Alterna la visibilidad de los documentos para un mes específico.
   * @param {string} month - Mes que se quiere mostrar u ocultar.
   */
  const toggleMonth = (month) => {
    setOpenMonth(openMonth === month ? null : month); // Alterna el mes abierto
  };

  return (
    <div className="document-list">
      <h2>Lista de Documentos</h2>
      <div className="document-months">
        {Object.keys(documents).map((month) => (
          <div key={month} className="document-month">
            <h3 onClick={() => toggleMonth(month)} className="month-header">
              {month}
              <span className={`toggle-icon ${openMonth === month ? 'open' : ''}`}>▼</span>
            </h3>
            {openMonth === month && (
              <div className="document-grid">
                {documents[month].length > 0 ? (
                  documents[month].map((doc) => (
                    <div key={doc._id} className="document-item">
                      <div className="document-thumbnail">
                        {doc.filePath.endsWith('.pdf') ? (
                          <iframe
                            src={`http://localhost:3000/documents/${doc._id}`}
                            title={doc.nombre}
                            className="pdf-viewer"
                            allow="autoplay"
                          />
                        ) : (
                          <img
                            src={`http://localhost:3000/documents/${doc._id}`}
                            alt={doc.nombre}
                            className="thumbnail-image"
                          />
                        )}
                      </div>
                      <div className="document-info">
                        <h4>{doc.nombre}</h4>
                        <p>{doc.descripcion}</p>
                        <p>{new Date(doc.fecha).toLocaleDateString('es-ES')}</p>
                        <button onClick={() => handleDownload(doc._id)}>Descargar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No se encontraron documentos.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
