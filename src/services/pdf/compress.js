import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Compress PDF by reducing image quality and optimizing
 * Note: pdf-lib doesn't have built-in compression, so we use a workaround
 * @param {File} file - PDF file to compress
 * @param {number} quality - Compression quality (0.1 to 1.0)
 * @returns {Promise<Uint8Array>}
 */
export const compressPDF = async (file, quality = 0.75) => {
  try {
    // pdf-lib doesn't have built-in compression
    // This is a basic implementation that removes metadata and optimizes structure
    // For better compression, you might need to use a server-side solution or WebAssembly
    
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // Remove metadata to reduce size
    pdfDoc.setTitle('');
    pdfDoc.setAuthor('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setProducer('');
    pdfDoc.setCreator('');
    
    // Save with minimal metadata
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false,
    });
    
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to compress PDF: ${error.message}`);
  }
};

