import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ViewFullMap from '../../Components/Extras/ViewFullMap'

const ViewFullMapPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Full View Map'>
        <ViewFullMap />
    </ClientLayout>
  )
}

export default ViewFullMapPage