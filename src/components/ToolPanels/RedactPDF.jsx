import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { redactPDF } from '../../services/pdf/redact';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const RedactPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [redactions, setRedactions] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(20);

  const handleFileSelect = (selectedFile) => {
    const validation = validatePDFFile(selectedFile);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    setFile(selectedFile);
    setError(null);
    setResult(null);
    setRedactions([]);
  };

  const handleAddRedaction = () => {
    const newRedaction = {
      pageIndex: parseInt(pageIndex),
      x: parseFloat(x),
      y: parseFloat(y),
      width: parseFloat(width),
      height: parseFloat(height),
    };
    setRedactions([...redactions, newRedaction]);
    // Reset form
    setX(0);
    setY(0);
    setWidth(100);
    setHeight(20);
  };

  const handleRemoveRedaction = (index) => {
    setRedactions(redactions.filter((_, i) => i !== index));
  };

  const handleRedact = async () => {
    if (!file || redactions.length === 0) {
      setError('Please add at least one redaction area');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await redactPDF(file, redactions);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to redact PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_redacted.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setRedactions([]);
    setPageIndex(0);
    setX(0);
    setY(0);
    setWidth(100);
    setHeight(20);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Redact PDF</h1>
        <p className="text-lg text-gray-600">
          Permanently remove sensitive information from your PDF.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-yellow-800">
          <strong>Warning:</strong> This tool blackens areas but does not permanently remove underlying data.
          For truly secure redaction that removes data permanently, use specialized redaction software.
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
            <p className="text-gray-700 mb-6">
              <span className="font-semibold">Size:</span> {formatFileSize(file.size)}
            </p>

            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Add Redaction Area</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Index (0-based):
                  </label>
                  <input
                    type="number"
                    value={pageIndex}
                    onChange={(e) => setPageIndex(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    X Position:
                  </label>
                  <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Y Position:
                  </label>
                  <input
                    type="number"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width:
                  </label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height:
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="1"
                  />
                </div>

                <div>
                  <button
                    onClick={handleAddRedaction}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-6"
                  >
                    Add Redaction
                  </button>
                </div>
              </div>
            </div>

            {redactions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Redaction Areas ({redactions.length})
                </h3>
                <div className="space-y-2">
                  {redactions.map((red, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">
                        Page {red.pageIndex}, X: {red.x}, Y: {red.y}, Size: {red.width}×{red.height}
                      </span>
                      <button
                        onClick={() => handleRemoveRedaction(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={handleRedact}
                disabled={processing || redactions.length === 0}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? 'Redacting...' : 'Redact PDF'}
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
        </div>
      )}

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">PDF Redacted!</h2>
            <p className="text-gray-700">
              Your PDF has been redacted with {redactions.length} area(s).
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Redacted PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Redact another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedactPDF;

