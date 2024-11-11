import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DashCard from "../../Components/Constants/DashCards";
import TaskDashButtons from "../../Components/Tasks/TaskDashButtons";
import PurpleButton from "../../Components/Tags/PurpleButton";

const TaskDashboardPage: React.FC = () => {
    return (
        <ClientLayout breadcrumb="Dashboard">
            <div className="font-inter">
                <p className="text-[1.5vw] mx-[2vw] mb-[1vw] font-semibold">Tasks Due</p>
                <div className="grid grid-cols-3 gap-[1vw] mx-[2vw]">
                    <DashCard
                        title="Past Due"
                        value={4}
                        percentage="10%"
                        isPositive={true}
                    />
                    <DashCard
                        title="Due Today"
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
                </div>
            </div>
            <div className="font-inter">
                <p className="text-[1.5vw] mx-[2vw] mt-[2vw] mb-[1vw] font-semibold">Inspections Due</p>
                <div className="grid grid-cols-3 gap-[1vw] mx-[2vw]">
                    <DashCard
                        title="Past Due"
                        value={4}
                        percentage="10%"
                        isPositive={true}
                    />
                    <DashCard
                        title="Due Today"
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
                </div>
            </div>
            <TaskDashButtons />
            <div className="m-[2vw] flex flex-row items-center gap-[1vw]">
                <PurpleButton text="Service Call" />
                <PurpleButton text="Emergency Service Call" />
                <PurpleButton text="Add New Customer" />
                <PurpleButton text="Customer Asset Manager" />
                <PurpleButton text="Future Use" />
                <PurpleButton text="Add New Button" />
            </div>
        </ClientLayout>
    );
};

export default TaskDashboardPage;
