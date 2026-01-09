import { PDFDocument } from 'pdf-lib';

/**
 * Convert images to PDF
 * @param {File[]} files - Array of image files
 * @param {Object} options - Options (fit: 'width' | 'height' | 'both')
 * @returns {Promise<Uint8Array>}
 */
export const imagesToPDF = async (files, options = {}) => {
  try {
    const { fit = 'both' } = options;
    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      let image;

      // Determine image type and embed
      if (file.type === 'image/png') {
        image = await pdfDoc.embedPng(arrayBuffer);
      } else if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
        image = await pdfDoc.embedJpg(arrayBuffer);
      } else {
        throw new Error(`Unsupported image format: ${file.type}`);
      }

      // Create page with image dimensions
      const imageDims = image.scale(1);
      let page;

      if (fit === 'width') {
        const pageWidth = 612; // Standard US Letter width
        const scale = pageWidth / imageDims.width;
        const pageHeight = imageDims.height * scale;
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });
      } else if (fit === 'height') {
        const pageHeight = 792; // Standard US Letter height
        const scale = pageHeight / imageDims.height;
        const pageWidth = imageDims.width * scale;
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: pageWidth,
          height: pageHeight,
        });
      } else {
        // Fit both - use image dimensions
        page = pdfDoc.addPage([imageDims.width, imageDims.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: imageDims.width,
          height: imageDims.height,
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to convert images to PDF: ${error.message}`);
  }
};

