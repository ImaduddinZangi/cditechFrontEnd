import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import EmployeeDashboard from "../../Components/EmployeeDashboard/EmpolyeeDashboard";
import DashInspectionGraph from "../../Components/EmployeeDashboard/DashInspectionGraph";

const ClientDashboardPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Dashboard">
      <EmployeeDashboard />
      <DashInspectionGraph />
    </ClientLayout>
  );
};

export default ClientDashboardPage;
