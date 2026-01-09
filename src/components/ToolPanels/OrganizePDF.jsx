import { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import FileUpload from '../FileUpload/FileUpload';
import { organizePDF } from '../../services/pdf/organize';
import { validatePDFFile, downloadBlob, formatFileSize, readFileAsArrayBuffer } from '../../services/utils/fileHandler';
import '../../utils/pdfjsWorker';

const OrganizePDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [pageOrder, setPageOrder] = useState([]);

  useEffect(() => {
    const loadPageCount = async () => {
      if (file) {
        try {
          const arrayBuffer = await readFileAsArrayBuffer(file);
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = pdf.numPages;
          setTotalPages(numPages);
          setPageOrder(Array.from({ length: numPages }, (_, i) => i));
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

  const movePage = (index, direction) => {
    const newOrder = [...pageOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setPageOrder(newOrder);
  };

  const handleOrganize = async () => {
    if (!file || pageOrder.length === 0) return;

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await organizePDF(file, pageOrder);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to organize PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_organized.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setTotalPages(0);
    setPageOrder([]);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Organize PDF</h1>
        <p className="text-lg text-gray-600">
          Reorder pages in your PDF document.
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
              <span className="font-semibold">Pages:</span> {totalPages}
            </p>

            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
              <p className="text-sm font-medium text-gray-700 mb-3">Drag or use arrows to reorder pages:</p>
              <div className="space-y-2">
                {pageOrder.map((pageIndex, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span className="text-gray-700 font-medium">
                      Page {index + 1}: Original page {pageIndex + 1}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => movePage(index, 'up')}
                        disabled={index === 0}
                        className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePage(index, 'down')}
                        disabled={index === pageOrder.length - 1}
                        className="px-3 py-1 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleOrganize}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Organizing...' : 'Organize PDF'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Organization Complete!</h2>
            <p className="text-gray-700">
              PDF pages have been reorganized successfully.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Organized PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Organize another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizePDF;

