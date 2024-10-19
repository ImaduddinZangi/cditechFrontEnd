import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import PurpleButton from "../../Components/Tags/PurpleButton";
import CustomerExtraDetails from "../../Components/Customer/CustomerExtraDetails";

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
          <PurpleButton text="New Quick Task" />
          <PurpleButton text="Service Call" />
          <PurpleButton text="New Task" />
          <PurpleButton
            text="New Inspection"
            onClick={() => navigate("/add-inspection")}
          />
          <PurpleButton text="Add New Asset" onClick={handleAddAsset} />
          <PurpleButton text="Send to GPS" />
          <PurpleButton text="Update Service Contact" />
        </div>
        <PurpleButton text="Edit Customer" onClick={handleEditCustomer} />
      </div>
      <CustomerExtraDetails />
    </ClientLayout>
  );
};

export default ManageCustomerPage;
