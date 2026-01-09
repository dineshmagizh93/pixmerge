import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';

/**
 * Split PDF into multiple PDFs (one per page or by range)
 * @param {File} file - PDF file to split
 * @param {string} mode - 'all' (one per page) or 'range' (custom ranges)
 * @param {Array} ranges - Array of {start, end} objects for range mode
 * @returns {Promise<Array<{pdfBytes: Uint8Array, filename: string}>>}
 */
export const splitPDF = async (file, mode = 'all', ranges = []) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    const sourcePdf = await PDFDocument.load(arrayBuffer);
    const totalPages = sourcePdf.getPageCount();
    const results = [];

    if (mode === 'all') {
      // Split into one PDF per page
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(sourcePdf, [i]);
        newPdf.addPage(page);
        const pdfBytes = await newPdf.save();
        results.push({
          pdfBytes,
          filename: `page-${i + 1}.pdf`,
        });
      }
    } else if (mode === 'range' && ranges.length > 0) {
      // Split by custom ranges
      for (const range of ranges) {
        const { start, end } = range;
        if (start >= 1 && end <= totalPages && start <= end) {
          const newPdf = await PDFDocument.create();
          const pageIndices = Array.from(
            { length: end - start + 1 },
            (_, i) => start - 1 + i
          );
          const pages = await newPdf.copyPages(sourcePdf, pageIndices);
          pages.forEach((page) => newPdf.addPage(page));
          const pdfBytes = await newPdf.save();
          results.push({
            pdfBytes,
            filename: `pages-${start}-${end}.pdf`,
          });
        }
      }
    }

    return results;
  } catch (error) {
    throw new Error(`Failed to split PDF: ${error.message}`);
  }
};

