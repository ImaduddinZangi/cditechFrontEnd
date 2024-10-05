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
    <div className="bg-white shadow rounded-lg p-[1.5vw] flex flex-col justify-between w-full">
      <div>
        <p className="text-gray-0 text-[1.2vw]">{title}</p>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p className="text-[2vw] font-bold">{value}</p>
        <p
          className={`text-[1vw] px-[0.5vw] py-[0.2vw] rounded-lg bg-opacity-50 ${
            isPositive ? "text-green-500 bg-green-50" : "text-red-500 bg-red-50"
          }`}
        >
          {isPositive ? `+${percentage}` : `-${percentage}`}
        </p>
      </div>
    </div>
  );
};

export default DashCard;
