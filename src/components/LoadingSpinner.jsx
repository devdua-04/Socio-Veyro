import React from 'react';
import { Sparkles } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-gray-900/90 border border-red-900/30 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 text-center shadow-2xl shadow-red-500/20 backdrop-blur-sm">
        <div className="animate-spin inline-block mb-4 sm:mb-6">
          <div className="bg-gray border-black p-3 sm:p-1 rounded-full shadow-lg shadow-red-500/30">
            <img
              src="./assets/buffer.png"
              alt="Logo"
              className="w-12 h-12 sm:w-20 sm:h-20"
            />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          Generating Your Roadmap
        </h3>
        <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
          Our AI is crafting a comprehensive social media strategy tailored specifically for your brand...
        </p>
        <div className="w-full bg-gray-700/50 rounded-full h-2 shadow-inner">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 h-2 rounded-full animate-pulse shadow-lg shadow-red-500/30" style={{ width: '75%' }}></div>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
          This may take 30-60 seconds
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;