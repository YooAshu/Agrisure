import React from 'react';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`${sizes[size]} animate-spin`}>
        <div className="h-full w-full border-4 border-t-primary-300 border-r-primary-200 border-b-primary-100 border-l-primary-50 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;