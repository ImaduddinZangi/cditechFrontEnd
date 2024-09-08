import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import ClientUserTable from '../../../Components/UserGroups/Users/ClientUserTable'

const ClientUserTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Client User Table'>
        <ClientUserTable />
    </ClientLayout>
  )
}

export default ClientUserTablePage