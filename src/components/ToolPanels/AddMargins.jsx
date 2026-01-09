import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { addMargins } from '../../services/pdf/margins';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const AddMargins = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [margins, setMargins] = useState({
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  });

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

  const handleMarginChange = (side, value) => {
    setMargins((prev) => ({
      ...prev,
      [side]: Math.max(0, parseFloat(value) || 0),
    }));
  };

  const handleAddMargins = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await addMargins(file, {
        top: margins.top,
        bottom: margins.bottom,
        left: margins.left,
        right: margins.right,
      });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to add margins');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_margins.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setMargins({ top: 20, bottom: 20, left: 20, right: 20 });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Add margins to PDF</h1>
        <p className="text-lg text-gray-600">
          Add margins around PDF content.
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
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">File:</span> {file.name}
            </p>
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">Size:</span> {formatFileSize(file.size)}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top Margin (px):
                </label>
                <input
                  type="number"
                  min="0"
                  value={margins.top}
                  onChange={(e) => handleMarginChange('top', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bottom Margin (px):
                </label>
                <input
                  type="number"
                  min="0"
                  value={margins.bottom}
                  onChange={(e) => handleMarginChange('bottom', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Left Margin (px):
                </label>
                <input
                  type="number"
                  min="0"
                  value={margins.left}
                  onChange={(e) => handleMarginChange('left', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Right Margin (px):
                </label>
                <input
                  type="number"
                  min="0"
                  value={margins.right}
                  onChange={(e) => handleMarginChange('right', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddMargins}
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Adding margins...' : 'Add Margins'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Margins Added!</h2>
            <p className="text-gray-700">
              Margins have been added to your PDF successfully.
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
              Add margins to another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMargins;

