import React from 'react';

interface CustomNodeProps {
  data: {
    label: string;
  };
}

// Custom node untuk start/end
export const StartEndNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="p-4 bg-blue-200 border-2 border-blue-600 rounded-full text-center">
      {data.label}
    </div>
  );
};

// Custom node untuk proses
export const ProcessNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="p-4 bg-gray-200 border-2 border-gray-600 rounded-md text-center">
      {data.label}
    </div>
  );
};

// Custom node untuk keputusan
export const DecisionNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div className="w-32 h-32 bg-yellow-200 border-2 border-yellow-600 transform rotate-45 flex items-center justify-center">
      <div className="transform -rotate-45">{data.label}</div>
    </div>
  );
};
