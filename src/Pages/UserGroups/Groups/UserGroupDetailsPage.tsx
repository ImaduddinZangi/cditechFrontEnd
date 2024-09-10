import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import UserGroupDetails from '../../../Components/UserGroups/Groups/UserGroupDetails'

const UserGroupDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='User Group Details'>
        <UserGroupDetails />
    </ClientLayout>
  )
}

export default UserGroupDetailsPage