import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Add margins to PDF
 * @param {File} file - PDF file
 * @param {Object} options - Margin options {top, bottom, left, right}
 * @returns {Promise<Uint8Array>}
 */
export const addMargins = async (file, options = {}) => {
  try {
    const {
      top = 20,
      bottom = 20,
      left = 20,
      right = 20,
    } = options;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfjsDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pdfDoc = await PDFDocument.create();
    const numPages = pdfjsDoc.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pdfjsPage = await pdfjsDoc.getPage(pageNum);
      const viewport = pdfjsPage.getViewport({ scale: 2.0 });
      
      const originalWidth = viewport.width;
      const originalHeight = viewport.height;
      
      // New page size with margins
      const newWidth = originalWidth + left + right;
      const newHeight = originalHeight + top + bottom;

      // Render page to canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = newHeight;
      canvas.width = newWidth;

      // Fill with white background
      context.fillStyle = 'white';
      context.fillRect(0, 0, newWidth, newHeight);

      // Draw original page content with offset
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        transform: [1, 0, 0, 1, left, top],
      };

      await pdfjsPage.render(renderContext).promise;

      // Convert canvas to image and embed
      const imageBytes = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          blob.arrayBuffer().then(resolve);
        }, 'image/png');
      });

      const pngImage = await pdfDoc.embedPng(imageBytes);
      const page = pdfDoc.addPage([newWidth, newHeight]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: newWidth,
        height: newHeight,
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to add margins: ${error.message}`);
  }
};

