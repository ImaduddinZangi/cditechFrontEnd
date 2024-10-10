import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import InvoiceTable from "../../Components/Inspection/InvoiceTable";

const InvoiceTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Invoices">
      <InvoiceTable />
    </ClientLayout>
  );
};

export default InvoiceTablePage;
