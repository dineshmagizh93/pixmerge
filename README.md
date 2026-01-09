# Pixmerge - Client-Side PDF Tools

A fully client-side PDF manipulation tool suite built with React, providing all the essential PDF tools you need - completely free and private. All processing happens in your browser; your files never leave your device.

## Features

### ✅ Implemented (8 Tools)
- **Merge PDF** - Combine multiple PDF files into one
- **Split PDF** - Divide PDF into separate files
- **Compress PDF** - Reduce PDF file size
- **Rotate PDF** - Rotate PDF pages (90°, 180°, 270°)
- **Add Watermark** - Add text watermarks to PDF
- **Add Page Numbers** - Add page numbers with customization
- **PDF to JPG/PNG** - Convert PDF pages to images
- **JPG/PNG to PDF** - Combine images into PDF

### 🚧 Coming Soon (~32 Tools)
- Protect/Unlock PDF
- PDF to/from Word, Excel, PowerPoint, HTML
- Crop PDF
- Edit PDF (annotations)
- Organize PDF (reorder pages)
- Extract Images/Text
- OCR PDF
- Redact PDF
- Compare PDF
- And more...

See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for detailed progress.

## Technology Stack

- **React 19** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **pdf-lib** - PDF manipulation library
- **PDF.js** - PDF rendering and text extraction
- **jsPDF** - PDF generation
- **html2pdf.js** - HTML to PDF conversion

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
pdf-tools/
├── src/
│   ├── components/
│   │   ├── Header/          # Navigation header
│   │   ├── FileUpload/      # File upload component
│   │   ├── ToolPanels/      # Individual tool panels
│   │   ├── AdSense/         # AdSense integration
│   │   └── PDFViewer/       # PDF preview component
│   ├── services/
│   │   ├── pdf/            # PDF processing functions
│   │   └── utils/          # Utility functions
│   ├── pages/              # Page components
│   ├── utils/              # Constants and helpers
│   └── App.jsx             # Main app component
├── public/                 # Static assets
└── package.json
```

## AdSense Integration (Monetization)

Pixmerge is fully configured for Google AdSense monetization. See **[ADSENSE_SETUP.md](./ADSENSE_SETUP.md)** for complete setup instructions.

### Quick Setup:

1. **Get your AdSense Publisher ID** from https://www.google.com/adsense
2. **Create 5 ad units** in your AdSense dashboard (Header, Sidebar, Content, Footer, Landing)
3. **Configure environment variables** in `.env`:
   ```env
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-YOUR_PUBLISHER_ID
   VITE_ADSENSE_ENABLED=true
   VITE_ADSENSE_SLOT_HEADER=YOUR_SLOT_ID
   VITE_ADSENSE_SLOT_SIDEBAR=YOUR_SLOT_ID
   VITE_ADSENSE_SLOT_CONTENT=YOUR_SLOT_ID
   VITE_ADSENSE_SLOT_FOOTER=YOUR_SLOT_ID
   VITE_ADSENSE_SLOT_LANDING=YOUR_SLOT_ID
   ```
4. **Update `index.html`** with your Publisher ID in the AdSense script tag
5. **Create required pages**: Privacy Policy, Cookie Policy, Terms of Service

### Ad Placement Strategy:

- ✅ **Header Banner** - Above content (728x90 responsive)
- ✅ **Sidebar** - Tool pages desktop sidebar (300x600, desktop only)
- ✅ **In-Content** - Between sections on landing page (728x90 responsive)
- ✅ **Footer Banner** - Above footer (728x90 responsive)
- ✅ **Landing Hero** - Below hero section (728x90 responsive)

All ads are:
- Responsive and mobile-friendly
- Asynchronously loaded (don't block content)
- Placed strategically for optimal revenue
- Compliant with AdSense policies

📖 **See [ADSENSE_SETUP.md](./ADSENSE_SETUP.md) for detailed setup guide.**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Privacy

All PDF processing happens 100% client-side in your browser. Your files are never uploaded to any server, ensuring complete privacy and security.

## License

MIT License - Feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
