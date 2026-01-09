import { useState } from 'react';
import FileUpload from '../FileUpload/FileUpload';
import { comparePDFs } from '../../services/pdf/compare';
import { validatePDFFile, formatFileSize } from '../../services/utils/fileHandler';

const ComparePDF = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFile1Select = (selectedFile) => {
    const validation = validatePDFFile(selectedFile);
    if (!validation.valid) {
      setError(`File 1: ${validation.error}`);
      return;
    }
    setFile1(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleFile2Select = (selectedFile) => {
    const validation = validatePDFFile(selectedFile);
    if (!validation.valid) {
      setError(`File 2: ${validation.error}`);
      return;
    }
    setFile2(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleCompare = async () => {
    if (!file1 || !file2) {
      setError('Please select both PDF files to compare');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const comparisonResult = await comparePDFs(file1, file2);
      setResult(comparisonResult);
    } catch (err) {
      setError(err.message || 'Failed to compare PDFs');
    } finally {
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFile1(null);
    setFile2(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Compare PDF files</h1>
        <p className="text-lg text-gray-600">
          Compare two PDF files and find differences.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This tool compares text content and page counts between two PDFs.
          It will identify differences in page count and text content on each page.
        </p>
      </div>

      {(!file1 || !file2) && !result && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">First PDF File</h2>
            {!file1 ? (
              <FileUpload
                onFileSelect={handleFile1Select}
                acceptedTypes=".pdf"
                multiple={false}
                label="Select first PDF file"
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">File:</span> {file1.name}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Size:</span> {formatFileSize(file1.size)}
                </p>
                <button
                  onClick={() => setFile1(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Second PDF File</h2>
            {!file2 ? (
              <FileUpload
                onFileSelect={handleFile2Select}
                acceptedTypes=".pdf"
                multiple={false}
                label="Select second PDF file"
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">File:</span> {file2.name}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Size:</span> {formatFileSize(file2.size)}
                </p>
                <button
                  onClick={() => setFile2(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {file1 && file2 && (
            <div className="flex space-x-4">
              <button
                onClick={handleCompare}
                disabled={processing}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? 'Comparing...' : 'Compare PDFs'}
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Reset
              </button>
            </div>
          )}

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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Comparison Results</h2>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-semibold text-gray-900 mb-2">{result.summary}</p>
              <p className="text-sm text-gray-600">
                PDF 1: {result.numPages1} pages | PDF 2: {result.numPages2} pages
              </p>
            </div>

            {result.similar ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                <p className="font-semibold">✓ PDFs are identical in content!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Differences Found ({result.differences.length}):
                </h3>
                <div className="space-y-2">
                  {result.differences.map((diff, index) => (
                    <div
                      key={index}
                      className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                    >
                      <p className="font-semibold text-yellow-900 mb-1">
                        {diff.type === 'page_count' ? 'Page Count Difference' : `Page ${diff.page}`}
                      </p>
                      <p className="text-sm text-yellow-800">{diff.message}</p>
                      {diff.preview1 && (
                        <div className="mt-2 text-xs text-gray-600">
                          <p><strong>PDF 1 preview:</strong> {diff.preview1}</p>
                          <p><strong>PDF 2 preview:</strong> {diff.preview2}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Compare another pair
          </button>
        </div>
      )}
    </div>
  );
};

export default ComparePDF;

