import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import PumpBrandsTable from "../../../Components/Customer/Pump/PumpBrandsTable";

const PumpBrandsTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Pump Brands">
      <PumpBrandsTable />
    </ClientLayout>
  );
};

export default PumpBrandsTablePage;
