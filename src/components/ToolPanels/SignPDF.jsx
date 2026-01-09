import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { signPDF } from '../../services/pdf/sign';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const SignPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [signatureText, setSignatureText] = useState('');
  const [pageIndex, setPageIndex] = useState('last');
  const [x, setX] = useState('');
  const [y, setY] = useState(50);
  const [fontSize, setFontSize] = useState(20);

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

  const handleSign = async () => {
    if (!file || !signatureText.trim()) {
      setError('Please enter signature text');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await signPDF(file, signatureText, {
        x: x === '' ? null : parseFloat(x),
        y: parseFloat(y),
        fontSize: parseInt(fontSize),
        pageIndex: pageIndex === 'last' ? null : parseInt(pageIndex),
      });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to sign PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_signed.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSignatureText('');
    setPageIndex('last');
    setX('');
    setY(50);
    setFontSize(20);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sign PDF</h1>
        <p className="text-lg text-gray-600">
          Add an electronic signature to your PDF documents.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This adds a text signature overlay. For legally binding digital signatures with certificates,
          use specialized signing services or software.
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature Text:
                </label>
                <input
                  type="text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your signature or name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page:
                  </label>
                  <select
                    value={pageIndex}
                    onChange={(e) => setPageIndex(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="last">Last Page</option>
                    <option value="0">First Page (0)</option>
                    <option value="1">Page 2</option>
                    <option value="2">Page 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="12"
                    max="48"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    X Position (leave empty to center):
                  </label>
                  <input
                    type="number"
                    value={x}
                    onChange={(e) => setX(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Auto-center"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Y Position (from bottom):
                  </label>
                  <input
                    type="number"
                    value={y}
                    onChange={(e) => setY(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSign}
              disabled={processing || !signatureText.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Signing...' : 'Sign PDF'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">PDF Signed!</h2>
            <p className="text-gray-700">
              Your signature has been added to the PDF.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Signed PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Sign another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignPDF;

