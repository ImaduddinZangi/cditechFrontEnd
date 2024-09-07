import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedClientInfo from "../../Components/ClientDashboard/DetailedClientInfo";

const ClientDashboardPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Manage Client">
      <DetailedClientInfo />
    </ClientLayout>
  );
};

export default ClientDashboardPage;
