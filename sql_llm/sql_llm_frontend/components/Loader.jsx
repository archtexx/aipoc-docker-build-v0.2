// Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-75 bg-gray-900 z-50">
      <div className="border-t-4 border-blue-500 border-solid rounded-full h-12 w-12 animate-spin"></div>
    </div>
  );
};

export default Loader;
