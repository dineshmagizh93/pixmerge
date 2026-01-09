import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Extract all images from PDF
 * @param {File} file - PDF file
 * @returns {Promise<Array<{blob: Blob, filename: string, pageNumber: number}>>}
 */
export const extractImages = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const results = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const operators = await page.getOperatorList();

      for (let i = 0; i < operators.fnArray.length; i++) {
        if (operators.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
          const imageName = operators.argsArray[i][0];
          const image = await page.objs.get(imageName);

          if (image) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;

            if (image.data) {
              const imageData = context.createImageData(image.width, image.height);
              imageData.data.set(image.data);
              context.putImageData(imageData, 0, 0);

              const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/png');
              });

              results.push({
                blob,
                filename: `image-page${pageNum}-${results.length + 1}.png`,
                pageNumber: pageNum,
              });
            }
          }
        }
      }
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to extract images: ${error.message}`);
  }
};

/**
 * Extract text from PDF
 * @param {File} file - PDF file
 * @param {Object} options - Extract options
 * @returns {Promise<{text: string, pages: Array<{pageNumber: number, text: string}>}>}
 */
export const extractText = async (file, options = {}) => {
  try {
    const { combinePages = false } = options;
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const pages = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');

      pages.push({
        pageNumber: pageNum,
        text: pageText,
      });
    }

    const fullText = combinePages
      ? pages.map((p) => p.text).join('\n\n')
      : pages.map((p) => `--- Page ${p.pageNumber} ---\n${p.text}`).join('\n\n');

    return {
      text: fullText,
      pages,
    };
  } catch (error) {
    throw new Error(`Failed to extract text: ${error.message}`);
  }
};

