import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import AssetDetails from "../../Components/Customer/AssetDetails";

const ManageCustomerAssetPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Customer">
      <DetailedCustomerInfo />
      <AssetDetails />
    </ClientLayout>
  );
};

export default ManageCustomerAssetPage;
