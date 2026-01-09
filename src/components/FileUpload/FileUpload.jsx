import { useRef, useState } from 'react';

const FileUpload = ({ onFileSelect, acceptedTypes = '.pdf', multiple = false, label = 'Select PDF file' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) => {
      if (acceptedTypes.includes('pdf')) {
        return file.type === 'application/pdf';
      }
      return true;
    });

    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />

        <button
          onClick={handleButtonClick}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors mb-4"
        >
          {label}
        </button>

        <p className="text-gray-600 mt-2">or drop {acceptedTypes} here</p>

      {/* Cloud storage buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Google Drive"
          disabled
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.71 2.5L1.15 13l2.71 4.64 6.56-11.14L7.71 2.5zM13.29 2.5L7.71 13l6.58 10.5 6.56-11.14L13.29 2.5z" />
          </svg>
        </button>
        <button
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Dropbox"
          disabled
        >
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 2L12 6L6 10L0 6L6 2ZM18 8L24 12L18 16L12 12L18 8ZM6 14L12 18L6 22L0 18L6 14ZM18 14L24 18L18 22L12 18L18 14Z" />
          </svg>
        </button>
      </div>
      </div>
    </div>
  );
};

export default FileUpload;

