import mammoth from 'mammoth';
import jsPDF from 'jspdf';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Convert Word document to PDF (basic conversion)
 * @param {File} file - Word document file (.docx)
 * @returns {Promise<Blob>}
 */
export const wordToPDF = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // Convert Word to HTML using mammoth
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const html = result.value;

    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Extract text from HTML (simple approach)
    const textContent = tempDiv.innerText || tempDiv.textContent || '';
    const lines = pdf.splitTextToSize(textContent, maxWidth);

    lines.forEach((line) => {
      if (yPosition > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 7; // Line height
    });

    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    throw new Error(`Failed to convert Word to PDF: ${error.message}`);
  }
};



