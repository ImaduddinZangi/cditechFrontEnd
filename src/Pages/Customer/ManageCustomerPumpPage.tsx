import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedCustomerInfo from "../../Components/Customer/DetailedCustomerInfo";
import PumpDetails from "../../Components/Customer/PumpDetails";

const ManageCustomerPumpPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Customer">
      <DetailedCustomerInfo />
      <PumpDetails />
    </ClientLayout>
  );
};

export default ManageCustomerPumpPage;
