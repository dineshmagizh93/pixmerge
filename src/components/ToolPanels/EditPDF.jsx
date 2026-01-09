import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { addTextToPDF } from '../../services/pdf/edit';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const EditPDF = () => {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [fontSize, setFontSize] = useState(12);

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

  const handleEdit = async () => {
    if (!file || !text.trim()) {
      setError('Please enter text to add');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await addTextToPDF(file, text, parseInt(pageIndex), parseFloat(x), parseFloat(y), {
        fontSize: parseInt(fontSize),
      });
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to edit PDF');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file.name.replace('.pdf', '_edited.pdf');
      downloadBlob(result.blob, filename);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setText('');
    setPageIndex(0);
    setX(50);
    setY(50);
    setFontSize(12);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit PDF</h1>
        <p className="text-lg text-gray-600">
          Add text, shapes, and annotations to your PDF.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a basic editor that allows adding text at specific positions.
          For full editing capabilities (shapes, annotations, advanced features), use specialized PDF editing software.
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
                  Text to add:
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  placeholder="Enter text to add to PDF"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page (0-indexed):
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
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    min="8"
                    max="72"
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
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleEdit}
              disabled={processing || !text.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Editing...' : 'Add Text to PDF'}
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">PDF Edited!</h2>
            <p className="text-gray-700">
              Text has been added to your PDF.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Edited PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Edit another file
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPDF;

