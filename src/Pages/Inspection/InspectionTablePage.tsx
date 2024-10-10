import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import InspectionTable from '../../Components/Inspection/InspectionTable'

const InspectionTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage Inspections'>
        <InspectionTable />
    </ClientLayout>
  )
}

export default InspectionTablePage