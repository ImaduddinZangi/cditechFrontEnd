import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import AssetDetails from "../../Components/Customer/Asset/AssetDetails";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import PurpleButton from "../../Components/Tags/PurpleButton";

const ManageCustomerPage: React.FC = () => {
  const navigate = useNavigate();
  const selectedCustomerId = useAppSelector(
    (state) => state.customer.selectedCustomerId
  );

  const handleAddAsset = () => {
    navigate("/add-asset");
  };

  const handleEditCustomer = () => {
    if (selectedCustomerId) {
      navigate(`/edit-customer/${selectedCustomerId}`);
    }
  };

  return (
    <ClientLayout breadcrumb="Manage Customer">
      <DetailedCustomerInfo />
      <div className="m-[2vw] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-[1vw]">
          <PurpleButton text="New Inspection" />
          <PurpleButton text="Send to GPS" />
          <PurpleButton text="Add New Asset" onClick={handleAddAsset} />
        </div>
        <PurpleButton text="Edit Customer" onClick={handleEditCustomer} />
      </div>
      <AssetDetails />
    </ClientLayout>
  );
};

export default ManageCustomerPage;
