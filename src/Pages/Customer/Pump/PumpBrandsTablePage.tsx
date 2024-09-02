import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import PumpBrandsTable from "../../../Components/Customer/Pump/PumpBrandsTable";

const PumpBrandsTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Pump Brands Table">
      <PumpBrandsTable />
    </ClientLayout>
  );
};

export default PumpBrandsTablePage;
