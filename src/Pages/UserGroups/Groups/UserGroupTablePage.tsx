import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import UserGroupTable from '../../../Components/UserGroups/Groups/UserGroupTable'

const UserGroupTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Manage User Groups'>
        <UserGroupTable />
    </ClientLayout>
  )
}

export default UserGroupTablePage