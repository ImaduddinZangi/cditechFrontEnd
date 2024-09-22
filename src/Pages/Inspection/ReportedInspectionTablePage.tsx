import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ReportedInspectionTable from '../../Components/Inspection/ReportedInspectionTable'

const ReportedInspectionTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Uploaded PDF Inspections'>
        <ReportedInspectionTable />
    </ClientLayout>
  )
}

export default ReportedInspectionTablePage