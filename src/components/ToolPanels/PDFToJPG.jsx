import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { pdfToImages } from '../../services/pdf/pdfToImage';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';
import { saveAs } from 'file-saver';

const PDFToJPG = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [format, setFormat] = useState('image/jpeg');

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

  const handleConvert = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const results = await pdfToImages(file, 2, format);
      setResult(results);
    } catch (err) {
      setError(err.message || 'Failed to convert PDF to images');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (blob, filename) => {
    saveAs(blob, filename);
  };

  const handleDownloadAll = () => {
    if (result) {
      result.forEach((item) => {
        saveAs(item.blob, item.filename);
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF to JPG</h1>
        <p className="text-lg text-gray-600">
          Convert PDF pages to JPG or PNG images.
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
                Output format:
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleConvert}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Converting...' : 'Convert to Images'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Complete!</h2>
            <p className="text-gray-700 mb-4">
              PDF converted to {result.length} image{result.length !== 1 ? 's' : ''}.
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
              {result.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-700">{item.filename}</span>
                  <button
                    onClick={() => handleDownload(item.blob, item.filename)}
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
              Download All ({result.length} images)
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

export default PDFToJPG;

