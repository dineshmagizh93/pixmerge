import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { htmlFileToPDF, htmlToPDF } from '../../services/pdf/htmlToPdf';
import { downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const HTMLToPDF = () => {
  const [file, setFile] = useState(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('file'); // 'file' or 'paste'

  const handleFileSelect = (selectedFile) => {
    if (selectedFile.type === 'text/html' || selectedFile.name.endsWith('.html')) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    } else {
      setError('Please select an HTML file');
    }
  };

  const handleConvert = async () => {
    setProcessing(true);
    setError(null);

    try {
      let blob;
      if (mode === 'file' && file) {
        blob = await htmlFileToPDF(file);
      } else if (mode === 'paste' && htmlContent.trim()) {
        blob = await htmlToPDF(htmlContent);
      } else {
        throw new Error('Please provide HTML content or select an HTML file');
      }
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to convert HTML to PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, 'document.pdf');
    }
  };

  const handleReset = () => {
    setFile(null);
    setHtmlContent('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">HTML to PDF</h1>
        <p className="text-lg text-gray-600">
          Convert HTML files or paste HTML content to PDF.
        </p>
      </div>

      {!result && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Input method:
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setMode('file')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'file'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upload HTML File
              </button>
              <button
                onClick={() => setMode('paste')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'paste'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Paste HTML
              </button>
            </div>
          </div>

          {mode === 'file' && (
            <div className="mb-4">
              <FileUpload
                onFileSelect={handleFileSelect}
                acceptedTypes=".html,.htm"
                multiple={false}
                label="Select HTML file"
              />
              {file && (
                <p className="mt-2 text-sm text-gray-700">
                  Selected: {file.name} ({formatFileSize(file.size)})
                </p>
              )}
            </div>
          )}

          {mode === 'paste' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTML Content:
              </label>
              <textarea
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Paste your HTML code here..."
                className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>
          )}
        </div>
      )}

      {!result && (file || (mode === 'paste' && htmlContent.trim())) && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4">
            <button
              onClick={handleConvert}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Converting...' : 'Convert to PDF'}
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Reset
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Complete!</h2>
            <p className="text-gray-700">
              HTML has been converted to PDF successfully.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Convert another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HTMLToPDF;

