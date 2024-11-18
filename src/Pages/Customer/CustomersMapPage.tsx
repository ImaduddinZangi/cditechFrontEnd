import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import CustomersMap from '../../Components/Maps/CustomersMap'

const CustomersMapPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Customers Map'>
      <CustomersMap />
    </ClientLayout>
  )
}

export default CustomersMapPage