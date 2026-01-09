import * as pdfjsLib from 'pdfjs-dist';
import jsPDF from 'jspdf';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF to PowerPoint (basic conversion)
 * Note: This creates a PDF that can be inserted into PowerPoint, not a native .pptx file.
 * For full conversion to .pptx, server-side processing or specialized libraries are needed.
 * @param {File} file - PDF file
 * @returns {Promise<Blob>}
 */
export const pdfToPowerpoint = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    
    // Convert each page to an image and create a simple presentation-like format
    // Note: This creates a PDF with slides (one per page), not a .pptx file
    // For native .pptx conversion, you would need pptxgenjs or server-side processing
    
    const outputPdf = new jsPDF('l', 'mm', [1920/4, 1080/4]); // 16:9 aspect ratio (common PPT format)
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      if (pageNum > 1) {
        outputPdf.addPage();
      }
      
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      
      // Render page as image
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      
      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      outputPdf.addImage(imgData, 'PNG', 0, 0, 480, 270); // 16:9 ratio
    }
    
    const pdfBlob = outputPdf.output('blob');
    return pdfBlob;
  } catch (error) {
    throw new Error(`Failed to convert PDF to PowerPoint format: ${error.message}. Note: This creates a PDF representation, not a native .pptx file.`);
  }
};

