import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ManageInspections from '../../Components/Inspection/ManageInspections'

const ManageInspectionsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage Inspections'>
        <ManageInspections />
    </ClientLayout>
  )
}

export default ManageInspectionsPage