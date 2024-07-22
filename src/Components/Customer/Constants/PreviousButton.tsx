// src/components/PreviousButton.tsx
import React from 'react';

const PreviousButton: React.FC = () => {
  return (
    <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="ml-2">Previous</span>
    </button>
  );
};

export default PreviousButton;
