import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import AssetDetails from "../../Components/Customer/AssetDetails";

const ManageCustomers: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Customer">
      <DetailedCustomerInfo />
      <AssetDetails
         assetName="Text"
         assetType="Lift Station"
         size="XXL"
         rails="Yes"
         floats={6}
         smart="No"
         inspectionInterval="Monthly"
         lastInspectionDate="07-29-2024"
         power="3-Phase"
         assetId="13232476"
         pipeDia="3in"
         material="Fiber Glass"
      />
    </ClientLayout>
  );
};

export default ManageCustomers;
