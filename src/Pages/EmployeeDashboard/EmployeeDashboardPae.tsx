import React from 'react';
import EmployeeDashboard from '../../Components/ClientProfile/EmpolyeeDashboard';

const EmployeeDashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full p-4">
        <EmployeeDashboard />
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
