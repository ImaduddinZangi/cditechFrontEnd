import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import ClientUsersSessionsTable from "../../Components/Logs/ClientUsersSessionsTable";

const ClientUsersSessionsTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Client Users Sessions">
      <ClientUsersSessionsTable />
    </ClientLayout>
  );
};

export default ClientUsersSessionsTablePage;
