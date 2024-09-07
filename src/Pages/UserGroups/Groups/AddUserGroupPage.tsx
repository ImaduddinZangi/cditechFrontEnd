import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import AddUserGroup from '../../../Components/UserGroups/Groups/AddUserGroup'

const AddUserGroupPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Add User Group'>
        <AddUserGroup />
    </ClientLayout>
  )
}

export default AddUserGroupPage