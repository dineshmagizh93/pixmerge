import * as pdfjsLib from 'pdfjs-dist';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Compare two PDFs and return differences
 * @param {File} file1 - First PDF file
 * @param {File} file2 - Second PDF file
 * @returns {Promise<{similar: boolean, differences: Array, summary: string}>}
 */
export const comparePDFs = async (file1, file2) => {
  try {
    const arrayBuffer1 = await readFileAsArrayBuffer(file1);
    const arrayBuffer2 = await readFileAsArrayBuffer(file2);
    
    const pdf1 = await pdfjsLib.getDocument({ data: arrayBuffer1 }).promise;
    const pdf2 = await pdfjsLib.getDocument({ data: arrayBuffer2 }).promise;
    
    const numPages1 = pdf1.numPages;
    const numPages2 = pdf2.numPages;
    
    const differences = [];
    let text1 = '';
    let text2 = '';

    // Compare page counts
    if (numPages1 !== numPages2) {
      differences.push({
        type: 'page_count',
        message: `Page count differs: PDF 1 has ${numPages1} pages, PDF 2 has ${numPages2} pages`,
      });
    }

    const minPages = Math.min(numPages1, numPages2);

    // Extract text from each page and compare
    for (let pageNum = 1; pageNum <= minPages; pageNum++) {
      const page1 = await pdf1.getPage(pageNum);
      const page2 = await pdf2.getPage(pageNum);
      
      const textContent1 = await page1.getTextContent();
      const textContent2 = await page2.getTextContent();
      
      const pageText1 = textContent1.items.map((item) => item.str).join(' ');
      const pageText2 = textContent2.items.map((item) => item.str).join(' ');
      
      text1 += pageText1 + '\n';
      text2 += pageText2 + '\n';

      if (pageText1.trim() !== pageText2.trim()) {
        differences.push({
          type: 'text_difference',
          page: pageNum,
          message: `Text differs on page ${pageNum}`,
          preview1: pageText1.substring(0, 100),
          preview2: pageText2.substring(0, 100),
        });
      }
    }

    const similar = differences.length === 0;
    const summary = similar
      ? 'PDFs are identical in content'
      : `Found ${differences.length} difference(s) between the PDFs`;

    return {
      similar,
      differences,
      summary,
      numPages1,
      numPages2,
    };
  } catch (error) {
    throw new Error(`Failed to compare PDFs: ${error.message}`);
  }
};



