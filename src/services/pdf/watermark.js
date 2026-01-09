import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Add watermark to PDF
 * @param {File} file - PDF file
 * @param {string} text - Watermark text
 * @param {Object} options - Watermark options (position, opacity, color, etc.)
 * @returns {Promise<Uint8Array>}
 */
export const addWatermark = async (file, text, options = {}) => {
  try {
    const {
      fontSize = 50,
      opacity = 0.3,
      color = rgb(0.7, 0.7, 0.7),
      angle = -45,
      position = 'center',
    } = options;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    pages.forEach((page) => {
      const { width, height } = page.getSize();
      
      // Calculate position
      let x, y;
      if (position === 'center') {
        x = width / 2;
        y = height / 2;
      } else if (position === 'top-left') {
        x = width * 0.25;
        y = height * 0.75;
      } else if (position === 'top-right') {
        x = width * 0.75;
        y = height * 0.75;
      } else if (position === 'bottom-left') {
        x = width * 0.25;
        y = height * 0.25;
      } else if (position === 'bottom-right') {
        x = width * 0.75;
        y = height * 0.25;
      } else {
        x = width / 2;
        y = height / 2;
      }

      // Use pdf-lib's degrees function to create rotation
      // For watermark, we rotate the text around its center point
      // Since drawText rotates around the origin, we need to adjust positioning
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        color,
        opacity,
        rotate: degrees(angle),
      });
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to add watermark: ${error.message}`);
  }
};

