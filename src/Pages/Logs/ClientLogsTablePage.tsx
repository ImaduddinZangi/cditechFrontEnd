import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import ClientLogsTable from "../../Components/Logs/ClientLogsTable";

const ClientLogsTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Client Logs Dashboard">
      <ClientLogsTable />
    </ClientLayout>
  );
};

export default ClientLogsTablePage;
