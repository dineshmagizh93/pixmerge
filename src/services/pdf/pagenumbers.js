import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Add page numbers to PDF
 * @param {File} file - PDF file
 * @param {Object} options - Page number options (position, format, start, etc.)
 * @returns {Promise<Uint8Array>}
 */
export const addPageNumbers = async (file, options = {}) => {
  try {
    const {
      position = 'bottom-center', // bottom-center, bottom-left, bottom-right, top-center, etc.
      fontSize = 12,
      color = rgb(0, 0, 0),
      startFrom = 1,
      format = '{page}', // {page} or {page} / {total}
    } = options;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();
      const pageNumber = startFrom + index;
      
      // Format page number text
      let pageText = format.replace('{page}', pageNumber.toString());
      pageText = pageText.replace('{total}', totalPages.toString());

      // Calculate position
      let x, y;
      const margin = 20;
      
      if (position.includes('bottom')) {
        y = margin;
      } else if (position.includes('top')) {
        y = height - margin - fontSize;
      } else {
        y = height / 2;
      }

      if (position.includes('left')) {
        x = margin;
      } else if (position.includes('right')) {
        const textWidth = pageText.length * fontSize * 0.6; // Rough estimate
        x = width - margin - textWidth;
      } else {
        x = width / 2;
      }

      page.drawText(pageText, {
        x,
        y,
        size: fontSize,
        color,
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to add page numbers: ${error.message}`);
  }
};

