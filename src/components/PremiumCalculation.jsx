import React from "react";

const PremiumCalculation = ({ formData }) => {
    console.log(formData);
    
  return (
    <div className="bg-white/50 dark:bg-neutral-700/50 mb-4 p-4 rounded-lg">
      <h3 className="mb-2 font-medium text-lg">Premium Calculation</h3>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-neutral-300">Crop Type:</span>
        <span className="font-medium text-gray-900 dark:text-neutral-100 capitalize">{formData.cropType}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-neutral-300">Land Size:</span>
        <span className="font-medium text-gray-900 dark:text-neutral-100">{formData.landSize} acres</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-neutral-300">Location:</span>
        <span className="font-medium text-gray-900 dark:text-neutral-100">{formData.location?.address || "Not provided"}</span>
      </div>
      <div className="my-2 border-gray-200 dark:border-neutral-600 border-t"></div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-neutral-300">Premium Amount:</span>
        <span className="font-medium text-gray-900 dark:text-neutral-100">₹{formData.premium}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 dark:text-neutral-300">Coverage Amount:</span>
        <span className="font-medium text-gray-900 dark:text-neutral-100">₹{formData.coverageAmount}</span>
      </div>
    </div>
  );
};

export default PremiumCalculation;