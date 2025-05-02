import React from 'react';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block mb-2 font-medium text-gray-700 dark:text-neutral-300"
        >
          {label} {required && <span className="text-error-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-white/50 dark:bg-neutral-700/50 backdrop-blur-sm
            border ${error ? 'border-error-300' : 'border-gray-200 dark:border-neutral-600'}
            focus:border-green-300 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-400/20
            transition-all duration-200
            shadow-sm focus:shadow-md
            outline-none
            text-gray-900 dark:text-neutral-100
            placeholder:text-gray-400 dark:placeholder:text-neutral-400
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-error-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;