import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import AddTask from '../../Components/Tasks/ManageTasks/AddTask'

const AddTaskPage: React.FC = () => {
    return (
        <ClientLayout breadcrumb='New Task'>
            <AddTask />
        </ClientLayout>
    )
}

export default AddTaskPage