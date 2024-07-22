// src/components/NextButton.tsx
import React from 'react';

const NextButton: React.FC = () => {
  return (
    <button className="flex items-center px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
      <span className="mr-2">Next</span>
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
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

export default NextButton;
