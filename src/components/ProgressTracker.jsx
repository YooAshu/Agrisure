import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

const ProgressTracker = ({ steps, currentStep, className = '' }) => {
  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step node */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {index < currentStep ? (
                  <CheckCircle className="w-8 h-8 text-success-400" />
                ) : index === currentStep ? (
                  <Clock className="w-8 h-8 text-primary-300 dark:text-green-400 animate-pulse-slow" />
                ) : (
                  <Circle className="w-8 h-8 text-gray-300 dark:text-neutral-600" />
                )}
              </div>
              <span className={`mt-2 text-xs text-center max-w-[80px] ${
                index <= currentStep ? 'text-gray-800 dark:text-neutral-100 font-medium' : 'text-gray-400 dark:text-neutral-500'
              }`}>
                {step}
              </span>
            </div>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded ${
                index < currentStep ? 'bg-success-300' : 'bg-gray-200 dark:bg-neutral-600'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;