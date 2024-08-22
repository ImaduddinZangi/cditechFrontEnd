import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import GenerateReports from "../../Components/Inspection/GenerateReports";

const InspectionReportsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Inspection Reports">
      <GenerateReports />
    </ClientLayout>
  );
};

export default InspectionReportsPage;
