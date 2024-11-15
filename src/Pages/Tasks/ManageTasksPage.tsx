import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ManageTasks from '../../Components/Tasks/ManageTasks/ManageTasks'
import DashCard from '../../Components/Constants/DashCards'

const ManageTasksPage: React.FC = () => {
    return (
        <ClientLayout breadcrumb='Manage Tasks'>
            <div className="grid grid-cols-3 gap-[1vw] mx-[2vw] font-inter">
                <DashCard
                    title="Past Due"
                    value={4}
                    percentage="10%"
                    isPositive={true}
                />
                <DashCard
                    title="This Week"
                    value={91}
                    percentage="12%"
                    isPositive={true}
                />
                <DashCard
                    title="This Month"
                    value={276}
                    percentage="5%"
                    isPositive={false}
                />
                <DashCard
                    title="Emergency"
                    value={4}
                    percentage="10%"
                    isPositive={true}
                />
                <DashCard
                    title="Urgent"
                    value={91}
                    percentage="12%"
                    isPositive={true}
                />
                <DashCard
                    title="Normal"
                    value={276}
                    percentage="5%"
                    isPositive={false}
                />
            </div>
            <ManageTasks />
        </ClientLayout>
    )
}

export default ManageTasksPage;