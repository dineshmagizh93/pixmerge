import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { powerpointToPDF } from '../../services/pdf/powerpointToPdf';
import { downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const PowerPointToPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile.name.endsWith('.pptx') && !selectedFile.name.endsWith('.ppt')) {
      setError('Please select a .pptx or .ppt file');
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const blob = await powerpointToPDF(file);
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to convert PowerPoint to PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace(/\.(pptx|ppt)$/i, '.pdf');
      downloadBlob(result.blob, filename);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Convert POWERPOINT to PDF</h1>
        <p className="text-lg text-gray-600">
          Convert PowerPoint presentations to PDF format.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Full PowerPoint to PDF conversion requires server-side processing or specialized libraries.
          This is a basic implementation that creates a placeholder PDF with file information.
          For production use, consider server-side conversion or libraries like PptxGenJS.
        </p>
      </div>

      {!file && !result && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedTypes=".pptx,.ppt"
          multiple={false}
          label="Select PowerPoint file"
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
          </div>

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
              Note: This is a placeholder PDF. Full PowerPoint conversion requires server-side processing.
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
              Convert another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PowerPointToPDF;

