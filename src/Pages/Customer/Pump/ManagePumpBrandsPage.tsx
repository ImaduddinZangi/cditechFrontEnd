import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import ManagePumpBrands from "../../../Components/Customer/Pump/ManagePumpBrands";

const ManagePumpBrandsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Pump Brands">
      <ManagePumpBrands />
    </ClientLayout>
  );
};

export default ManagePumpBrandsPage;
