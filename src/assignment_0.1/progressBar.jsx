import React from 'react';

const ProgressBar = ({ applicationStatus, currentStatus }) => {
  // Calculate the progress percentage
  const totalSteps = applicationStatus.length;
  const currentStep = applicationStatus.indexOf(currentStatus) + 1;
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-900">
      <div
        className="bg-blue-400 h-2.5 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex justify-between mt-2">
        {applicationStatus.map((status, index) => (
          <div
            key={index}
            className={`text-xs ${
              index < currentStep ? 'bg-grey-400 font-bold' : 'text-gray-400'
            }`}
          >
            {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;