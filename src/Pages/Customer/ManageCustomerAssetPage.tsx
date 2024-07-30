import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import AssetDetails from "../../Components/Customer/Asset/AssetDetails";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const ManageCustomerAssetPage: React.FC = () => {
  const navigate = useNavigate();
  const selectedCustomerId = useAppSelector(
    (state) => state.customer.selectedCustomerId
  );

  const handeAddAsset = () => {
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
          <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
            New Inspection
          </button>
          <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
            Send to GPS
          </button>
          <button
            onClick={handeAddAsset}
            className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md"
          >
            Add New Asset
          </button>
          <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
            Blank Button
          </button>
        </div>
        <button
          onClick={handleEditCustomer}
          className="bg-purple-0 bg-opacity-5 border border-purple-0 text-[1vw] text-purple-0 font-inter font-medium px-[1vw] py-[0.5vw] rounded-md"
        >
          Edit Customer
        </button>
      </div>
      <AssetDetails />
    </ClientLayout>
  );
};

export default ManageCustomerAssetPage;
