import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddCustomer from "../../Components/Customer/AddCustomer";

const AddCustomerPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Add Customer">
      <AddCustomer />
    </ClientLayout>
  );
};

export default AddCustomerPage;
