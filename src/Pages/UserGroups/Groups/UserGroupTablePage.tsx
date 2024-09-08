import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import UserGroupTable from '../../../Components/UserGroups/Groups/UserGroupTable'

const UserGroupTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='User Group Table'>
        <UserGroupTable />
    </ClientLayout>
  )
}

export default UserGroupTablePage