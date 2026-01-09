import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { extractText } from '../../services/pdf/extract';
import { validatePDFFile, formatFileSize } from '../../services/utils/fileHandler';
import { saveAs } from 'file-saver';

const ExtractText = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [combinePages, setCombinePages] = useState(false);

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

  const handleExtract = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const extracted = await extractText(file, { combinePages });
      setResult(extracted);
    } catch (err) {
      setError(err.message || 'Failed to extract text');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result.text], { type: 'text/plain' });
      saveAs(blob, file.name.replace('.pdf', '_extracted.txt'));
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Extract text from PDF</h1>
        <p className="text-lg text-gray-600">
          Extract text content from your PDF document.
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

      {file && !result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">File:</span> {file.name}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Size:</span> {formatFileSize(file.size)}
            </p>

            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={combinePages}
                  onChange={(e) => setCombinePages(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Combine all pages (remove page separators)
                </span>
              </label>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleExtract}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Extracting...' : 'Extract Text'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Text Extracted!</h2>
            <p className="text-gray-700 mb-4">
              Extracted text from {result.pages.length} page{result.pages.length !== 1 ? 's' : ''}.
            </p>

            <div className="border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                {result.text || '(No text found in PDF)'}
              </pre>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download as TXT
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Extract from another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtractText;

