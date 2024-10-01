import React from "react";

interface CardProps {
  title: string;
  value: number;
  percentage: string;
  isPositive: boolean;
}

const Card: React.FC<CardProps> = ({
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

const EmployeeDashboard: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Past Due" value={4} percentage="10%" isPositive={true} />
      <Card title="Due Today" value={91} percentage="12%" isPositive={true} />
      <Card title="This Month" value={276} percentage="5%" isPositive={false} />
    </div>
  );
};

export default EmployeeDashboard;
