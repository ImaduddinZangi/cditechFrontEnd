import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AddClient from "../../Components/Extras/AddClient";

const AddClientPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Add Client">
      <AddClient />
    </ClientLayout>
  );
};

export default AddClientPage;
