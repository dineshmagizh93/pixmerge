import { PDFDocument, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF to grayscale
 * @param {File} file - PDF file
 * @returns {Promise<Uint8Array>}
 */
export const grayscalePDF = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdfjsDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pdfDoc = await PDFDocument.create();
    const numPages = pdfjsDoc.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const pdfjsPage = await pdfjsDoc.getPage(pageNum);
      const viewport = pdfjsPage.getViewport({ scale: 2.0 });

      // Render page to canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await pdfjsPage.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Convert to grayscale
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray; // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
      }

      context.putImageData(imageData, 0, 0);

      // Convert canvas to image and embed in PDF
      const imageBytes = await new Promise((resolve) => {
        canvas.toBlob((blob) => {
          blob.arrayBuffer().then(resolve);
        }, 'image/png');
      });

      const pngImage = await pdfDoc.embedPng(imageBytes);
      const page = pdfDoc.addPage([viewport.width, viewport.height]);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to convert PDF to grayscale: ${error.message}`);
  }
};

