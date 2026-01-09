import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Redact (black out) areas of PDF
 * @param {File} file - PDF file
 * @param {Array} redactions - Array of {pageIndex, x, y, width, height} objects
 * @returns {Promise<Uint8Array>}
 */
export const redactPDF = async (file, redactions) => {
  try {
    if (!redactions || redactions.length === 0) {
      throw new Error('No redaction areas specified');
    }

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    redactions.forEach((redaction) => {
      const { pageIndex, x, y, width, height } = redaction;
      
      if (pageIndex >= 0 && pageIndex < pages.length) {
        const page = pages[pageIndex];
        
        // Draw black rectangle to redact
        page.drawRectangle({
          x: x,
          y: y,
          width: width,
          height: height,
          color: rgb(0, 0, 0), // Black
          opacity: 1,
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to redact PDF: ${error.message}`);
  }
};



