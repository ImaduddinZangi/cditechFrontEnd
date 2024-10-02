import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import EmployeeDashboard from "../../Components/ClientProfile/EmpolyeeDashboard";
import DashInspectionGraph from "../../Components/ClientProfile/DashInspectionGraph";
import DashButtons from "../../Components/ClientProfile/DashButtons";

const ClientDashboardPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Dashboard">
      <EmployeeDashboard />
      <DashInspectionGraph />
      <DashButtons />
    </ClientLayout>
  );
};

export default ClientDashboardPage;
