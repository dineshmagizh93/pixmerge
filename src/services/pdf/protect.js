import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument, rgb } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils/fileHandler';
import '../../utils/pdfjsWorker';

/**
 * Add password protection to PDF
 * Note: pdf-lib doesn't support password encryption in the browser.
 * This function creates a copy of the PDF without password protection.
 * For true password protection, server-side processing or specialized libraries are needed.
 * @param {File} file - PDF file to protect
 * @param {string} userPassword - User password (required to open)
 * @param {string} ownerPassword - Owner password (required for permissions)
 * @returns {Promise<Uint8Array>}
 */
export const protectPDF = async (file, userPassword, ownerPassword = userPassword) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // Load PDF with PDF.js first to handle password-protected PDFs
    let pdf;
    try {
      pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    } catch (error) {
      // If PDF is password-protected, try with empty password
      pdf = await pdfjsLib.getDocument({ 
        data: arrayBuffer,
        password: '' 
      }).promise;
    }
    
    const numPages = pdf.numPages;
    
    // Create new PDF with pdf-lib
    const pdfDoc = await PDFDocument.create();
    
    // Copy all pages from original PDF
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      
      // Render page to canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      // Convert canvas to image and add to new PDF
      const imageData = canvas.toDataURL('image/png');
      const imageBytes = await fetch(imageData).then(res => res.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      
      const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
      newPage.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
    }
    
    const pdfBytes = await pdfDoc.save();
    
    // Note: pdf-lib doesn't support password encryption in the browser
    // The PDF is copied but not password-protected
    // For true password protection, you would need server-side processing
    console.warn('Password protection: PDF copied but not encrypted (pdf-lib limitation). For true encryption, use server-side processing.');
    
    return pdfBytes;
  } catch (error) {
    throw new Error(`Failed to protect PDF: ${error.message}`);
  }
};

/**
 * Unlock PDF (remove password protection)
 * Note: This requires the password to unlock
 * @param {File} file - Password-protected PDF
 * @param {string} password - Password to unlock
 * @returns {Promise<Uint8Array>}
 */
export const unlockPDF = async (file, password) => {
  try {
    const arrayBuffer = await readFileAsArrayBuffer(file);
    
    // Load PDF with PDF.js using the password
    let pdf;
    try {
      pdf = await pdfjsLib.getDocument({ 
        data: arrayBuffer,
        password: password 
      }).promise;
    } catch (error) {
      // Check if it's a password error
      if (error.name === 'PasswordException' || error.message.includes('password')) {
        throw new Error('Incorrect password. Please check the password and try again.');
      }
      throw error;
    }
    
    const numPages = pdf.numPages;
    
    // Create new PDF without password using pdf-lib
    const pdfDoc = await PDFDocument.create();
    
    // Copy all pages from password-protected PDF to new PDF
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });
      
      // Render page to canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      
      // Convert canvas to image and add to new PDF
      const imageData = canvas.toDataURL('image/png');
      const imageBytes = await fetch(imageData).then(res => res.arrayBuffer());
      const image = await pdfDoc.embedPng(imageBytes);
      
      const newPage = pdfDoc.addPage([viewport.width, viewport.height]);
      newPage.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
    }
    
    // Save the new PDF without password
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (error) {
    // Re-throw with more user-friendly message
    if (error.message.includes('Incorrect password')) {
      throw error;
    }
    throw new Error(`Failed to unlock PDF: ${error.message}`);
  }
};

