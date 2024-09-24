import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <div
          className="animate-spin inline-block w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full"
          role="status"
        ></div>
        <p className="text-primary mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
