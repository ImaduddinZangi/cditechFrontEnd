import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ManageTaskInvoices from '../../Components/Tasks/ManageTaskInvoices/ManageTaskInvoices'

const ManageTaskInvoicesPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage Task Invoice'>
        <ManageTaskInvoices />
    </ClientLayout>
  )
}

export default ManageTaskInvoicesPage