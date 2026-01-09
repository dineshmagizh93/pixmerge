import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * OCR PDF - Make scanned PDF searchable
 * Note: This is a basic implementation that extracts existing text.
 * Full OCR requires Tesseract.js (~50MB bundle) or server-side processing.
 * @param {File} file - PDF file
 * @returns {Promise<Uint8Array>}
 */
export const ocrPDF = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // Load PDF with PDF.js to check for existing text
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    
    // Create new PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.0 });
      
      // Try to extract text content
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      
      // Create new page with same dimensions
      const [width, height] = [viewport.width, viewport.height];
      const newPage = pdfDoc.addPage([width, height]);
      
      // If text exists, embed it in the new PDF
      if (textContent.items.length > 0) {
        // Add text content as searchable text layer
        // Note: This is a basic approach - full OCR would require Tesseract.js
        textContent.items.forEach((item) => {
          if (item.str && item.transform) {
            const { transform } = item;
            // Extract position from transform matrix
            const x = transform[4];
            const y = height - transform[5]; // Flip Y coordinate
            
            try {
              newPage.drawText(item.str, {
                x: x || 0,
                y: y || 0,
                size: (transform[0] || 12),
                color: rgb(0, 0, 0),
                opacity: 0, // Make invisible but searchable
              });
            } catch (err) {
              // Skip if position is invalid
            }
          }
        });
      }
    }
    
    // Note: This is a limited implementation
    // For full OCR, you would need to:
    // 1. Render each page as an image
    // 2. Use Tesseract.js to perform OCR
    // 3. Embed the recognized text into the PDF
    // This requires ~50MB additional bundle size
    
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`OCR PDF: ${error.message}. Note: Full OCR requires Tesseract.js or server-side processing.`);
  }
};

