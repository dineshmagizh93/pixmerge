import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { imagesToPDF } from '../../services/pdf/imageToPdf';
import { downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const JPGToPDF = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [fit, setFit] = useState('both');

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles];
    const imageFiles = fileArray.filter(
      (file) => file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      setError('Please select image files (JPG, PNG, etc.)');
      return;
    }

    setFiles((prev) => [...prev, ...imageFiles]);
    setError(null);
    setResult(null);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select at least one image file');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await imagesToPDF(files, { fit });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to convert images to PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, 'images.pdf');
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">JPG to PDF</h1>
        <p className="text-lg text-gray-600">
          Convert JPG, PNG, and other images to PDF.
        </p>
      </div>

      {files.length === 0 && !result && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedTypes="image/*"
          multiple={true}
          label="Select images"
        />
      )}

      {files.length > 0 && !result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selected images ({files.length})
          </h2>

          <div className="space-y-2 mb-6 max-h-64 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-gray-700 font-medium">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fit mode:
            </label>
            <select
              value={fit}
              onChange={(e) => setFit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="both">Original size</option>
              <option value="width">Fit to width</option>
              <option value="height">Fit to height</option>
            </select>
          </div>

          <div className="flex space-x-4 flex-wrap">
            <button
              onClick={handleConvert}
              disabled={processing || files.length === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Converting...' : 'Convert to PDF'}
            </button>
            <label className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer">
              Add more images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const newFiles = Array.from(e.target.files || []);
                  if (newFiles.length > 0) handleFileSelect(newFiles);
                }}
                className="hidden"
              />
            </label>
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
              Successfully converted {files.length} image{files.length !== 1 ? 's' : ''} to PDF.
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
              Convert more images
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JPGToPDF;

