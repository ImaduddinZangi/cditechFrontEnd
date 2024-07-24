import React from "react";
import CustomerTable from "../../Components/Customer/CustomerTable";
import ClientLayout from "../../Layouts/ClientLayout";

const CustomerTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Customer Table">
      <CustomerTable />
    </ClientLayout>
  );
};

export default CustomerTablePage;
