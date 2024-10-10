import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionDetails from "../../Components/Inspection/Constants/InspectionDetails";

const InspectionDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="View Inspection">
      <InspectionDetails />
    </ClientLayout>
  );
};

export default InspectionDetailsPage;
