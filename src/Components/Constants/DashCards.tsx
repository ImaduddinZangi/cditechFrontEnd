import React from "react";

interface CardProps {
  title: string;
  value: number;
  percentage: string;
  isPositive: boolean;
}

const DashCard: React.FC<CardProps> = ({
  title,
  value,
  percentage,
  isPositive,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between w-full">
      <div>
        <p className="text-gray-600">{title}</p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={`text-sm ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? `+${percentage}` : `-${percentage}`}
        </p>
      </div>
    </div>
  );
};

export default DashCard;
