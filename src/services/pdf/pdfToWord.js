import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF to Word (basic - extracts text only)
 * Note: This is a very basic conversion that only extracts text
 * @param {File} file - PDF file
 * @returns {Promise<Blob>}
 */
export const pdfToWord = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    
    let htmlContent = '<html><body>';
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      
      htmlContent += `<h2>Page ${pageNum}</h2><p>${pageText}</p>`;
    }
    
    htmlContent += '</body></html>';

    // Convert HTML to Word format (simple approach)
    // Create a simple HTML file that can be opened in Word
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    return blob;
  } catch (error) {
    throw new Error(`Failed to convert PDF to Word: ${error.message}`);
  }
};



