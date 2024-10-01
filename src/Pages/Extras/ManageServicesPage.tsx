import React from 'react';
import ClientLayout from '../../Layouts/ClientLayout';
import ManageServices from '../../Components/Extras/ManageServices';

const ManageServicesPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage Services'>
        <ManageServices />
    </ClientLayout>
  );
};

export default ManageServicesPage;
