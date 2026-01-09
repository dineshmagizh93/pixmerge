// Tool categories and definitions
export const TOOL_CATEGORIES = {
  ORGANIZE: 'ORGANIZE PDF',
  OPTIMIZE: 'OPTIMIZE PDF',
  CONVERT_TO_PDF: 'CONVERT TO PDF',
  CONVERT_FROM_PDF: 'CONVERT FROM PDF',
  EDIT: 'EDIT PDF',
  SECURITY: 'PDF SECURITY',
};

export const TOOLS = [
  // ORGANIZE PDF
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    category: TOOL_CATEGORIES.ORGANIZE,
    icon: '🔗',
    description: 'Combine multiple PDF files into one',
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    category: TOOL_CATEGORIES.ORGANIZE,
    icon: '✂️',
    description: 'Divide a PDF into separate files',
  },
  {
    id: 'remove-pages',
    name: 'Remove pages',
    category: TOOL_CATEGORIES.ORGANIZE,
    icon: '🗑️',
    description: 'Delete pages from your PDF',
  },
  {
    id: 'extract-pages',
    name: 'Extract pages',
    category: TOOL_CATEGORIES.ORGANIZE,
    icon: '📄',
    description: 'Extract specific pages from PDF',
  },
  {
    id: 'organize-pdf',
    name: 'Organize PDF',
    category: TOOL_CATEGORIES.ORGANIZE,
    icon: '📋',
    description: 'Reorder, add, or delete pages',
  },

  // OPTIMIZE PDF
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    category: TOOL_CATEGORIES.OPTIMIZE,
    icon: '🗜️',
    description: 'Reduce file size while optimizing quality',
  },
  {
    id: 'repair-pdf',
    name: 'Repair PDF',
    category: TOOL_CATEGORIES.OPTIMIZE,
    icon: '🔧',
    description: 'Fix corrupted or damaged PDF files',
  },
  {
    id: 'ocr-pdf',
    name: 'OCR PDF',
    category: TOOL_CATEGORIES.OPTIMIZE,
    icon: '👁️',
    description: 'Convert scanned PDFs to searchable text',
  },
  {
    id: 'extract-images',
    name: 'Extract Images',
    category: TOOL_CATEGORIES.OPTIMIZE,
    icon: '🖼️',
    description: 'Extract all images from PDF',
  },
  {
    id: 'extract-text',
    name: 'Extract Text',
    category: TOOL_CATEGORIES.OPTIMIZE,
    icon: '📄',
    description: 'Extract text content from PDF',
  },

  // CONVERT TO PDF
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    category: TOOL_CATEGORIES.CONVERT_TO_PDF,
    icon: '🖼️',
    description: 'Convert images to PDF',
  },
  {
    id: 'word-to-pdf',
    name: 'WORD to PDF',
    category: TOOL_CATEGORIES.CONVERT_TO_PDF,
    icon: '📝',
    description: 'Convert Word documents to PDF',
  },
  {
    id: 'powerpoint-to-pdf',
    name: 'POWERPOINT to PDF',
    category: TOOL_CATEGORIES.CONVERT_TO_PDF,
    icon: '📊',
    description: 'Convert PowerPoint to PDF',
  },
  {
    id: 'excel-to-pdf',
    name: 'EXCEL to PDF',
    category: TOOL_CATEGORIES.CONVERT_TO_PDF,
    icon: '📈',
    description: 'Convert Excel to PDF',
  },
  {
    id: 'html-to-pdf',
    name: 'HTML to PDF',
    category: TOOL_CATEGORIES.CONVERT_TO_PDF,
    icon: '🌐',
    description: 'Convert HTML to PDF',
  },

  // CONVERT FROM PDF
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '🖼️',
    description: 'Convert PDF pages to images',
  },
  {
    id: 'pdf-to-word',
    name: 'PDF to WORD',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '📝',
    description: 'Convert PDF to Word document',
  },
  {
    id: 'pdf-to-powerpoint',
    name: 'PDF to POWERPOINT',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '📊',
    description: 'Convert PDF to PowerPoint',
  },
  {
    id: 'pdf-to-excel',
    name: 'PDF to EXCEL',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '📈',
    description: 'Extract tables from PDF to Excel',
  },
  {
    id: 'pdf-to-pdfa',
    name: 'PDF to PDF/A',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '📑',
    description: 'Convert to archival PDF/A format',
  },
  {
    id: 'pdf-to-html',
    name: 'PDF to HTML',
    category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
    icon: '🌐',
    description: 'Convert PDF to HTML format',
  },

  // EDIT PDF
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    category: TOOL_CATEGORIES.EDIT,
    icon: '🔄',
    description: 'Rotate PDF pages',
  },
  {
    id: 'add-page-numbers',
    name: 'Add page numbers',
    category: TOOL_CATEGORIES.EDIT,
    icon: '🔢',
    description: 'Add page numbers to PDF',
  },
  {
    id: 'add-watermark',
    name: 'Add watermark',
    category: TOOL_CATEGORIES.EDIT,
    icon: '💧',
    description: 'Add text or image watermark',
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    category: TOOL_CATEGORIES.EDIT,
    icon: '✂️',
    description: 'Crop PDF pages',
  },
  {
    id: 'edit-pdf',
    name: 'Edit PDF',
    category: TOOL_CATEGORIES.EDIT,
    icon: '✏️',
    description: 'Add text, shapes, and annotations',
  },
  {
    id: 'grayscale-pdf',
    name: 'Grayscale PDF',
    category: TOOL_CATEGORIES.EDIT,
    icon: '⚫',
    description: 'Convert PDF to grayscale',
  },
  {
    id: 'add-margins',
    name: 'Add Margins',
    category: TOOL_CATEGORIES.EDIT,
    icon: '📏',
    description: 'Add margins to PDF pages',
  },

  // PDF SECURITY
  {
    id: 'unlock-pdf',
    name: 'Unlock PDF',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '🔓',
    description: 'Remove password protection',
  },
  {
    id: 'protect-pdf',
    name: 'Protect PDF',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '🔒',
    description: 'Add password protection',
  },
  {
    id: 'sign-pdf',
    name: 'Sign PDF',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '✍️',
    description: 'Add electronic signature',
  },
  {
    id: 'redact-pdf',
    name: 'Redact PDF',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '⬛',
    description: 'Permanently remove sensitive information',
  },
  {
    id: 'compare-pdf',
    name: 'Compare PDF',
    category: TOOL_CATEGORIES.SECURITY,
    icon: '🔍',
    description: 'Compare two PDF files',
  },
];

export const NAVIGATION_ITEMS = [
  { id: 'merge-pdf', label: 'MERGE PDF', toolId: 'merge-pdf' },
  { id: 'split-pdf', label: 'SPLIT PDF', toolId: 'split-pdf' },
  { id: 'compress-pdf', label: 'COMPRESS PDF', toolId: 'compress-pdf' },
  {
    id: 'convert-pdf',
    label: 'CONVERT PDF',
    dropdown: [
      {
        category: 'CONVERT TO PDF',
        tools: ['jpg-to-pdf', 'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf'],
      },
      {
        category: 'CONVERT FROM PDF',
        tools: ['pdf-to-jpg', 'pdf-to-word', 'pdf-to-powerpoint', 'pdf-to-excel', 'pdf-to-pdfa'],
      },
    ],
  },
  {
    id: 'all-pdf-tools',
    label: 'ALL PDF TOOLS',
    dropdown: [
      {
        category: TOOL_CATEGORIES.ORGANIZE,
        tools: ['merge-pdf', 'split-pdf', 'remove-pages', 'extract-pages', 'organize-pdf'],
      },
      {
        category: TOOL_CATEGORIES.OPTIMIZE,
        tools: ['compress-pdf', 'repair-pdf', 'ocr-pdf', 'extract-images', 'extract-text'],
      },
      {
        category: TOOL_CATEGORIES.CONVERT_TO_PDF,
        tools: ['jpg-to-pdf', 'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf', 'html-to-pdf'],
      },
      {
        category: TOOL_CATEGORIES.CONVERT_FROM_PDF,
        tools: ['pdf-to-jpg', 'pdf-to-word', 'pdf-to-powerpoint', 'pdf-to-excel', 'pdf-to-pdfa', 'pdf-to-html'],
      },
      {
        category: TOOL_CATEGORIES.EDIT,
        tools: ['rotate-pdf', 'add-page-numbers', 'add-watermark', 'crop-pdf', 'edit-pdf', 'grayscale-pdf', 'add-margins'],
      },
      {
        category: TOOL_CATEGORIES.SECURITY,
        tools: ['unlock-pdf', 'protect-pdf', 'sign-pdf', 'redact-pdf', 'compare-pdf'],
      },
    ],
  },
];

