import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { splitPDF } from '../../services/pdf/split';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const SplitPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [splitMode, setSplitMode] = useState('all'); // 'all' or 'range'

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

  const handleSplit = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const results = await splitPDF(file, splitMode);
      setResult(results);
    } catch (err) {
      setError(err.message || 'Failed to split PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (pdfBytes, filename) => {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    downloadBlob(blob, filename);
  };

  const handleDownloadAll = () => {
    if (result) {
      result.forEach((item) => {
        const blob = new Blob([item.pdfBytes], { type: 'application/pdf' });
        downloadBlob(blob, item.filename);
      });
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Split PDF file</h1>
        <p className="text-lg text-gray-600">
          Divide a PDF into multiple files.
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Split mode:
              </label>
              <select
                value={splitMode}
                onChange={(e) => setSplitMode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">Split into individual pages</option>
                <option value="range">Split by page ranges (coming soon)</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSplit}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Splitting...' : 'Split PDF'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Split Complete!</h2>
            <p className="text-gray-700 mb-4">
              PDF split into {result.length} file{result.length !== 1 ? 's' : ''}.
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {result.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{item.filename}</span>
                  <button
                    onClick={() => handleDownload(item.pdfBytes, item.filename)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownloadAll}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download All ({result.length} files)
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Split another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplitPDF;

