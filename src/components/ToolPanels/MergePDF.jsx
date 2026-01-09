import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { mergePDFs } from '../../services/pdf/merge';
import { validatePDFFile, downloadBlob, formatFileSize } from '../../services/utils/fileHandler';

const MergePDF = () => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFiles) => {
    const fileArray = Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles];
    const validFiles = [];
    const errors = [];

    fileArray.forEach((file) => {
      const validation = validatePDFFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      setError(null);
      setResult(null);
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await mergePDFs(files);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setResult({ blob });
    } catch (err) {
      setError(err.message || 'Failed to merge PDFs');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, 'merged.pdf');
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Merge PDF files</h1>
        <p className="text-lg text-gray-600">
          Combine multiple PDF files into one document.
        </p>
      </div>

      {files.length === 0 && !result && (
        <FileUpload
          onFileSelect={handleFileSelect}
          acceptedTypes=".pdf"
          multiple={true}
          label="Select PDF files"
        />
      )}

      {files.length > 0 && !result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selected files ({files.length})
          </h2>

          <div className="space-y-2 mb-6">
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

          <div className="flex space-x-4 mb-4">
            <button
              onClick={handleMerge}
              disabled={processing || files.length < 2}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Merging...' : 'Merge PDFs'}
            </button>
            <FileUpload
              onFileSelect={handleFileSelect}
              acceptedTypes=".pdf"
              multiple={true}
              label="Add more files"
            />
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Merge Complete!</h2>
            <p className="text-gray-700">
              Successfully merged {files.length} PDF files into one document.
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleDownload}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Download Merged PDF
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Merge more files
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MergePDF;

