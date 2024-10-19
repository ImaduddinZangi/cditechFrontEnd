import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ViewCustomersMap from '../../Components/Customer/ViewCustomersMap'

const ViewCustomersMapPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Customers Map'>
        <ViewCustomersMap />
    </ClientLayout>
  )
}

export default ViewCustomersMapPage