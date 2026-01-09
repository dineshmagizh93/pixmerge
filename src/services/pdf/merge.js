import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Merge multiple PDF files into one
 * @param {File[]} files - Array of PDF files to merge
 * @returns {Promise<Uint8Array>} - Merged PDF as Uint8Array
 */
export const mergePDFs = async (files) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to merge PDFs: ${error.message}`);
  }
};

