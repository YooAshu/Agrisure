import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUploadButton = ({
  label,
  onChange,
  accept = 'image/*',
  name,
  required = false,
  error = '',
  className = '',
}) => {
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      onChange(e);
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 font-medium mb-2">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleChange}
          accept={accept}
          name={name}
          className="hidden"
          required={required}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className={`
            w-full px-4 py-3 rounded-xl 
            flex items-center justify-center
            bg-white/50 backdrop-blur-sm
            border ${error ? 'border-error-300' : 'border-gray-200'}
            hover:border-primary-300
            transition-all duration-200
            shadow-sm focus:shadow-md
            outline-none
          `}
        >
          <Upload size={18} className="mr-2" />
          <span className="text-gray-700">
            {fileName ? fileName : 'Choose file'}
          </span>
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
};

export default FileUploadButton;