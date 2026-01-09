import * as pdfjsLib from 'pdfjs-dist';
import '../../utils/pdfjsWorker';

/**
 * Convert PDF to HTML (basic conversion)
 * @param {File} file - PDF file
 * @returns {Promise<string>} - HTML string
 */
export const pdfToHTML = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF to HTML</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .page { margin-bottom: 30px; page-break-after: always; }
        .page-number { font-weight: bold; margin-bottom: 10px; }
        canvas { max-width: 100%; height: auto; border: 1px solid #ddd; }
    </style>
</head>
<body>`;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const imageData = canvas.toDataURL('image/png');
      
      html += `
    <div class="page">
        <div class="page-number">Page ${pageNum} of ${numPages}</div>
        <img src="${imageData}" alt="Page ${pageNum}" />
    </div>`;
    }

    html += `
</body>
</html>`;

    return html;
  } catch (error) {
    throw new Error(`Failed to convert PDF to HTML: ${error.message}`);
  }
};

