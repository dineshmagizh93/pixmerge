import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Convert Excel file to PDF
 * @param {File} file - Excel file (.xlsx, .xls)
 * @returns {Promise<Blob>}
 */
export const excelToPDF = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const sheetNames = workbook.SheetNames;

    sheetNames.forEach((sheetName, index) => {
      if (index > 0) {
        pdf.addPage();
      }

      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      if (data.length > 0) {
        pdf.text(sheetName, 14, 10);
        
        // Simple table rendering without autoTable
        let yPosition = 20;
        const margin = 14;
        const lineHeight = 6;
        const fontSize = 8;
        pdf.setFontSize(fontSize);

        data.forEach((row, rowIndex) => {
          if (yPosition > 280) { // Near bottom of page
            pdf.addPage();
            yPosition = margin;
          }
          
          // Render row data
          const rowText = row.slice(0, 5).map(cell => String(cell || '')).join(' | '); // Limit columns for readability
          pdf.text(rowText.substring(0, 80), margin, yPosition); // Limit text width
          yPosition += lineHeight;
        });
      }
    });

    const pdfBlob = pdf.output('blob');
    return pdfBlob;
  } catch (error) {
    throw new Error(`Failed to convert Excel to PDF: ${error.message}`);
  }
};



