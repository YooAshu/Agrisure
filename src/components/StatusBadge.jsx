import React from 'react';

const StatusBadge = ({ status, className = '' }) => {
  const statusStyles = {
    pending: 'bg-warning-300/70 text-gray-800',
    approved: 'bg-success-300/70 text-gray-800',
    paid: 'bg-primary-300/70 text-white',
    rejected: 'bg-error-300/70 text-white',
    active: 'bg-secondary-300/70 text-white',
    completed: 'bg-success-300/70 text-gray-800',
  };

  const style = statusStyles[status.toLowerCase()] || 'bg-gray-200 text-gray-800';

  return (
    <span
      className={`
        ${style}
        px-3 py-1 rounded-full text-xs font-medium
        inline-flex items-center justify-center
        backdrop-blur-sm
        ${className}
      `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;