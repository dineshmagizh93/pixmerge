import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Crop PDF pages
 * @param {File} file - PDF file
 * @param {Object} options - Crop options {marginTop, marginBottom, marginLeft, marginRight, applyToAll}
 * @returns {Promise<Uint8Array>}
 */
export const cropPDF = async (file, options = {}) => {
  try {
    const {
      marginTop = 0,
      marginBottom = 0,
      marginLeft = 0,
      marginRight = 0,
      applyToAll = true,
      pageIndex = 0, // For single page cropping
    } = options;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();

    if (applyToAll) {
      // Apply crop to all pages
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        page.setCropBox(
          marginLeft,
          marginBottom,
          width - marginRight,
          height - marginTop
        );
      });
    } else {
      // Apply crop to specific page
      if (pageIndex >= 0 && pageIndex < pages.length) {
        const page = pages[pageIndex];
        const { width, height } = page.getSize();
        page.setCropBox(
          marginLeft,
          marginBottom,
          width - marginRight,
          height - marginTop
        );
      }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to crop PDF: ${error.message}`);
  }
};

