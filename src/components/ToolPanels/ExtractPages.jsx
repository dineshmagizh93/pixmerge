import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import FileUpload from '../FileUpload/FileUpload';
import { extractPages } from '../../services/pdf/organize';
import { validatePDFFile, downloadBlob, formatFileSize, readFileAsArrayBuffer } from '../../services/utils/fileHandler';
import '../../utils/pdfjsWorker';

const ExtractPages = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState(new Set());

  useEffect(() => {
    const loadPageCount = async () => {
      if (file) {
        try {
          const arrayBuffer = await readFileAsArrayBuffer(file);
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = pdf.numPages;
          setTotalPages(numPages);
          setSelectedPages(new Set());
        } catch (err) {
          setError('Failed to load PDF');
        }
      }
    };
    loadPageCount();
  }, [file]);

  const handleFileSelect = (selectedFile) => {
    const validation = validatePDFFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const togglePage = (pageIndex) => {
    setSelectedPages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(pageIndex)) {
        newSet.delete(pageIndex);
      } else {
        newSet.add(pageIndex);
      }
      return newSet;
    });
  };

  const handleExtract = async () => {
    if (!file || selectedPages.size === 0) {
      setError('Please select at least one page to extract');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pagesToExtract = Array.from(selectedPages);
      const pdfBytes = await extractPages(file, pagesToExtract);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to extract pages');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_extracted.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setTotalPages(0);
    setSelectedPages(new Set());
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Extract pages from PDF</h1>
        <p className="text-lg text-gray-600">
          Extract specific pages from your PDF document.
        </p>
      </div>

      {!file && !result && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedTypes=".pdf"
          multiple={false}
          label="Select PDF file"
        />
      )}

      {file && !result && totalPages > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">File:</span> {file.name}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Total pages:</span> {totalPages}
            </p>

            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Select pages to extract ({selectedPages.size} selected):
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => togglePage(i)}
                    className={`p-3 rounded-lg font-medium transition-colors ${
                      selectedPages.has(i)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleExtract}
              disabled={processing || selectedPages.size === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Extracting...' : `Extract ${selectedPages.size} page(s)`}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Choose another file
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Extraction Complete!</h2>
            <p className="text-gray-700">
              Selected pages have been extracted from the PDF.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Extracted PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Extract pages from another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractPages;

