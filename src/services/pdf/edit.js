import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Edit PDF - Add text, shapes, etc.
 * @param {File} file - PDF file
 * @param {Array} edits - Array of edit objects {type: 'text'|'rectangle'|'circle', pageIndex, ...}
 * @returns {Promise<Uint8Array>}
 */
export const editPDF = async (file, edits) => {
  try {
    if (!edits || edits.length === 0) {
      throw new Error('No edits specified');
    }

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    edits.forEach((edit) => {
      const { type, pageIndex } = edit;
      
      if (pageIndex < 0 || pageIndex >= pages.length) {
        return;
      }
      
      const page = pages[pageIndex];

      if (type === 'text') {
        const { x, y, text, fontSize = 12, color = rgb(0, 0, 0) } = edit;
        page.drawText(text, {
          x,
          y,
          size: fontSize,
          color,
        });
      } else if (type === 'rectangle') {
        const { x, y, width, height, color = rgb(1, 0, 0), borderColor, borderWidth = 1 } = edit;
        page.drawRectangle({
          x,
          y,
          width,
          height,
          color,
          borderColor,
          borderWidth,
        });
      } else if (type === 'circle') {
        const { x, y, size = 10, color = rgb(1, 0, 0) } = edit;
        page.drawCircle({
          x,
          y,
          size,
          color,
        });
      }
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to edit PDF: ${error.message}`);
  }
};

/**
 * Simple edit - Add text to PDF at specified position
 * @param {File} file - PDF file
 * @param {string} text - Text to add
 * @param {number} pageIndex - Page index (0-based)
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {Object} options - Text options
 * @returns {Promise<Uint8Array>}
 */
export const addTextToPDF = async (file, text, pageIndex, x, y, options = {}) => {
  const edits = [{
    type: 'text',
    pageIndex,
    x,
    y,
    text,
    ...options,
  }];
  return editPDF(file, edits);
};



