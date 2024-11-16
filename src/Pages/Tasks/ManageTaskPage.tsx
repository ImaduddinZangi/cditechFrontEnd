import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import PurpleButton from "../../Components/Tags/PurpleButton";
import TaskDetails from "../../Components/Tasks/ManageTasks/TaskDetails";
import TaskExtraDetails from "../../Components/Tasks/ManageTasks/TaskExtraDetails";

const ManageTaskPage: React.FC = () => {

    return (
        <ClientLayout breadcrumb="View Task">
            <TaskDetails />
            <div className="m-[2vw] flex flex-row items-center gap-[1vw]">
                <PurpleButton text="Set Status In Route" />
                <PurpleButton text="Set Status Arrival" />
                <PurpleButton text="Set Status Delayed" />
                <PurpleButton text="Set Status Completed Billed" />
                <PurpleButton text="Set Status Completed Not Billed" />
                <PurpleButton text="Re-Assign Task" />
                <PurpleButton text="Assign Task" />
            </div>
            <TaskExtraDetails />
        </ClientLayout>
    );
};

export default ManageTaskPage;
