import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionDetails from "../../Components/Inspection/Constants/InspectionDetails";

const InspectionDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Inspection Details">
      <InspectionDetails />
    </ClientLayout>
  );
};

export default InspectionDetailsPage;
