import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import InvoiceDetails from '../../Components/Inspection/InvoiceDetails'

const InvoiceDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Invoice Details'>
        <InvoiceDetails />
    </ClientLayout>
  )
}

export default InvoiceDetailsPage