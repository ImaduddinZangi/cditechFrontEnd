import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InspectionForm from "../../Components/Inspection/AddInspection";

const AddInspectionPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Add New Inspection">
      <InspectionForm />
    </ClientLayout>
  );
};

export default AddInspectionPage;
