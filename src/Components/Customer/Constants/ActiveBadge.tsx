// src/components/ActiveBadge.tsx
import React from 'react';

const ActiveBadge: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-green-100 rounded-full px-3 py-1">
      <span className="bg-green-500 rounded-full w-2.5 h-2.5"></span>
      <span className="text-green-800 font-medium">Active</span>
    </div>
  );
};

export default ActiveBadge;


