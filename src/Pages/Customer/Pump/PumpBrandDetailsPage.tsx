import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import PumpBrandDetails from "../../../Components/Customer/Pump/PumpBrandDetails";

const PumpBrandDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Pump Brand Details">
      <PumpBrandDetails />
    </ClientLayout>
  );
};

export default PumpBrandDetailsPage;
