import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  name,
  required = false,
  error = '',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange({
      target: {
        name,
        value: option.value
      }
    });
    setIsOpen(false);
  };

  return (
    <div className={`mb-4 ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block mb-2 font-medium text-gray-700 dark:text-neutral-300">
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-3 rounded-xl text-left
            bg-white/50 dark:bg-neutral-700/50 backdrop-blur-sm
            border ${error ? 'border-error-300' : 'border-gray-200 dark:border-neutral-600'}
            focus:border-green-300 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-400/20
            transition-all duration-200
            shadow-sm focus:shadow-md
            outline-none flex justify-between items-center
          `}
        >
          <span className={`${!selectedOption ? 'text-gray-400 dark:text-neutral-400' : 'text-gray-700 dark:text-neutral-100'}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''} text-gray-500 dark:text-neutral-400`} />
        </button>

        {isOpen && (
          <div className="z-10 absolute bg-white dark:bg-neutral-800 shadow-lg mt-1 border border-gray-200 dark:border-neutral-600 rounded-lg w-full max-h-60 overflow-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  px-4 py-2 cursor-pointer hover:bg-green-50 dark:hover:bg-neutral-700
                  ${option.value === value ? 'bg-green-100 dark:bg-neutral-700 font-medium' : ''}
                  text-gray-700 dark:text-neutral-100
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-error-500 text-sm">{error}</p>}
    </div>
  );
};

export default Dropdown;