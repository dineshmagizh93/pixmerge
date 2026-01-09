import html2pdf from 'html2pdf.js';

/**
 * Convert HTML to PDF
 * @param {string} htmlContent - HTML content as string
 * @param {Object} options - html2pdf options
 * @returns {Promise<Blob>}
 */
export const htmlToPDF = async (htmlContent, options = {}) => {
  try {
    const defaultOptions = {
      margin: [10, 10, 10, 10],
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      ...options,
    };

    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    document.body.appendChild(element);

    const pdfBlob = await html2pdf().set(defaultOptions).from(element).outputPdf('blob');

    document.body.removeChild(element);

    return pdfBlob;
  } catch (error) {
    throw new Error(`Failed to convert HTML to PDF: ${error.message}`);
  }
};

/**
 * Convert HTML file to PDF
 * @param {File} file - HTML file
 * @returns {Promise<Blob>}
 */
export const htmlFileToPDF = async (file) => {
  try {
    const text = await file.text();
    return await htmlToPDF(text);
  } catch (error) {
    throw new Error(`Failed to convert HTML file to PDF: ${error.message}`);
  }
};

