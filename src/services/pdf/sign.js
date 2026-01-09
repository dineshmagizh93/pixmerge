import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Add signature to PDF (basic overlay)
 * @param {File} file - PDF file
 * @param {string} signatureText - Signature text or name
 * @param {Object} options - Signature options (x, y, fontSize, color)
 * @returns {Promise<Uint8Array>}
 */
export const signPDF = async (file, signatureText, options = {}) => {
  try {
    const {
      x = null, // If null, will center horizontally
      y = 50, // Default bottom position
      fontSize = 20,
      color = rgb(0, 0, 0),
      pageIndex = null, // If null, adds to last page
    } = options;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    
    const targetPage = pageIndex !== null ? pages[pageIndex] : pages[pages.length - 1];
    const { width, height } = targetPage.getSize();
    
    // Calculate x position (center if not specified)
    const signatureX = x !== null ? x : width / 2 - (signatureText.length * fontSize * 0.3);
    
    // Draw signature text
    targetPage.drawText(signatureText, {
      x: signatureX,
      y: y,
      size: fontSize,
      color: color,
    });

    // Draw a line above signature (optional)
    targetPage.drawLine({
      start: { x: signatureX - 20, y: y + fontSize + 5 },
      end: { x: signatureX + signatureText.length * fontSize * 0.6 + 20, y: y + fontSize + 5 },
      thickness: 1,
      color: color,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to sign PDF: ${error.message}`);
  }
};



