import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { compressPDF } from '../../services/pdf/compress';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const CompressPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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

  const handleCompress = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await compressPDF(file);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({
        blob,
        originalSize: file.size,
        newSize: blob.size,
        reduction: ((1 - blob.size / file.size) * 100).toFixed(1),
      });
    } catch (err) {
      setError(err.message || 'Failed to compress PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_compressed.pdf');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Compress PDF file</h1>
        <p className="text-lg text-gray-600">
          Reduce file size while optimizing for maximal PDF quality.
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
            <p className="text-gray-700">
              <span className="font-semibold">Size:</span> {formatFileSize(file.size)}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleCompress}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Compressing...' : 'Compress PDF'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compression Complete!</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Original size:</span> {formatFileSize(result.originalSize)}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">New size:</span> {formatFileSize(result.newSize)}
              </p>
              <p className="text-blue-600 font-semibold text-lg">
                Size reduction: {result.reduction}%
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Compressed PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Compress another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressPDF;

