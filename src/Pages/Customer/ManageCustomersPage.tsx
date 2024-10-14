import React from "react";
import ManageCustomers from "../../Components/Customer/ManageCustomers";
import ClientLayout from "../../Layouts/ClientLayout";

const ManageCustomersPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Customers">
      <ManageCustomers />
    </ClientLayout>
  );
};

export default ManageCustomersPage;
