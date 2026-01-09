import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Repair PDF (attempts to fix common issues)
 * Note: Limited client-side repair capabilities
 * @param {File} file - PDF file to repair
 * @returns {Promise<Uint8Array>}
 */
export const repairPDF = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // Attempt to load and rebuild the PDF
    // This will fix some corruption issues by reconstructing the PDF structure
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true, // Try to load even if encrypted
      updateMetadata: true, // Update metadata
      capNumbers: true, // Cap numbers to prevent overflow
    });
    
    // Save to rebuild the PDF structure
    const pdfBytes = await pdfDoc.save({
      useObjectStreams: false, // Disable object streams for better compatibility
      addDefaultPage: false,
      objectsPerTick: 50,
    });
    
    return pdfBytes;
  } catch (error) {
    // If we can't repair, throw error with helpful message
    throw new Error(`Failed to repair PDF: ${error.message}. The PDF may be severely corrupted.`);
  }
};

