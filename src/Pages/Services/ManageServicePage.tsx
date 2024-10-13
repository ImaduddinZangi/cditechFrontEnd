import React from 'react';
import ClientLayout from '../../Layouts/ClientLayout';
import ManageService from '../../Components/Services/ManageService';

const ManageServicePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage Services'>
        <ManageService />
    </ClientLayout>
  );
};

export default ManageServicePage;
