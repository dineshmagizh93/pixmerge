// PDF.js Worker Configuration
// This utility ensures the worker is loaded correctly for Vite

import * as pdfjsLib from 'pdfjs-dist';

// Use unpkg CDN which is more reliable than cdnjs for PDF.js workers
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

export default pdfjsLib;

