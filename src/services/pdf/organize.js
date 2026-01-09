import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Organize PDF pages - reorder, add, delete pages
 * @param {File} file - PDF file
 * @param {Array} pageOrder - Array of page indices in desired order (0-indexed)
 * @returns {Promise<Uint8Array>}
 */
export const organizePDF = async (file, pageOrder) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    
    // Validate page order
    const validOrder = pageOrder.filter((idx) => idx >= 0 && idx < totalPages);
    
    if (validOrder.length === 0) {
      throw new Error('No valid pages selected');
    }

    const newPdf = await PDFDocument.create();
    
    // Copy pages in the specified order
    for (const pageIndex of validOrder) {
      const [page] = await newPdf.copyPages(sourcePdf, [pageIndex]);
      newPdf.addPage(page);
    }

    const pdfBytes = await newPdf.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to organize PDF: ${error.message}`);
  }
};

/**
 * Remove pages from PDF
 * @param {File} file - PDF file
 * @param {Array} pagesToRemove - Array of page indices to remove (0-indexed)
 * @returns {Promise<Uint8Array>}
 */
export const removePages = async (file, pagesToRemove) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    
    // Create set of pages to remove for fast lookup
    const removeSet = new Set(pagesToRemove);
    
    // Get all pages to keep
    const pagesToKeep = [];
    for (let i = 0; i < totalPages; i++) {
      if (!removeSet.has(i)) {
        pagesToKeep.push(i);
      }
    }

    if (pagesToKeep.length === 0) {
      throw new Error('Cannot remove all pages');
    }

    const newPdf = await PDFDocument.create();
    
    // Copy pages to keep
    for (const pageIndex of pagesToKeep) {
      const [page] = await newPdf.copyPages(sourcePdf, [pageIndex]);
      newPdf.addPage(page);
    }

    const pdfBytes = await newPdf.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to remove pages: ${error.message}`);
  }
};

/**
 * Extract specific pages from PDF
 * @param {File} file - PDF file
 * @param {Array} pagesToExtract - Array of page indices to extract (0-indexed)
 * @returns {Promise<Uint8Array>}
 */
export const extractPages = async (file, pagesToExtract) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    
    // Validate and filter page indices
    const validPages = pagesToExtract.filter((idx) => idx >= 0 && idx < totalPages);
    
    if (validPages.length === 0) {
      throw new Error('No valid pages selected');
    }

    const newPdf = await PDFDocument.create();
    
    // Copy selected pages
    for (const pageIndex of validPages) {
      const [page] = await newPdf.copyPages(sourcePdf, [pageIndex]);
      newPdf.addPage(page);
    }

    const pdfBytes = await newPdf.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to extract pages: ${error.message}`);
  }
};

