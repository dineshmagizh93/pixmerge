import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF to Excel (basic - extracts text as table)
 * Note: This is a basic conversion that extracts text, not actual tables
 * @param {File} file - PDF file
 * @returns {Promise<Blob>}
 */
export const pdfToExcel = async (file) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    
    const workbook = XLSX.utils.book_new();
    
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      
      // Split text into lines (basic approach)
      const lines = pageText.split('\n').filter(line => line.trim());
      const data = lines.map(line => [line]);
      
      // Add header
      data.unshift([`Page ${pageNum}`]);
      
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Page ${pageNum}`);
    }
    
    const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    return blob;
  } catch (error) {
    throw new Error(`Failed to convert PDF to Excel: ${error.message}`);
  }
};



