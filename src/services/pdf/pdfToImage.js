import * as pdfjsLib from 'pdfjs-dist';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF pages to images (JPG/PNG)
 * @param {File} file - PDF file
 * @param {number} scale - Scale factor for image quality (default: 2)
 * @param {string} format - 'image/jpeg' or 'image/png'
 * @returns {Promise<Array<{blob: Blob, pageNumber: number}>>}
 */
export const pdfToImages = async (file, scale = 2, format = 'image/jpeg') => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const results = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page to canvas
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, format, 0.95);
      });

      results.push({
        blob,
        pageNumber: pageNum,
        filename: `page-${pageNum}.${format === 'image/png' ? 'png' : 'jpg'}`,
      });
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to convert PDF to images: ${error.message}`);
  }
};

