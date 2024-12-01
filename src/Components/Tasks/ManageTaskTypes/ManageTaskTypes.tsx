import React from "react";
import TaskTypesCard from "./TaskTypesCard";
import PurpleButton from "../../Tags/PurpleButton";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import { useNavigate } from "react-router-dom";

const ManageTaskTypes: React.FC = () => {

    const navigate = useNavigate();

    const taskData = [
        {
            title: "Service Call",
            pairedService: "Service Call",
            serviceFee: 129.65,
        },
        {
            title: "After Hour Service Call",
            pairedService: "After Hour Service Call",
            serviceFee: 129.65,
        },
        {
            title: "Emergency Service Call",
            pairedService: "Emergency Service Call",
            serviceFee: 129.65,
        },
        {
            title: "Pump-out Grease Trap",
            pairedService: "Grease Trap Pumping",
            serviceFee: 129.65,
        },
        {
            title: "Clean Lift Station",
            pairedService: "Lift Station Cleaning",
            serviceFee: 129.65,
        },
        {
            title: "Pump out Treatment Plan",
            pairedService: "After Hour Service Call",
            serviceFee: 129.65,
        },
        {
            title: "Assist Team Member",
            pairedService: "None",
            serviceFee: 0,
        },
        {
            title: "Clean Storm Drains",
            pairedService: "None",
            serviceFee: 0,
        },
        {
            title: "Pump out Septic Tank",
            pairedService: "None",
            serviceFee: 0,
        },
        {
            title: "Install New Pump",
            pairedService: "None",
            serviceFee: 0,
        },
        {
            title: "Select Customer",
            pairedService: "None",
            serviceFee: 0,
        },
        {
            title: "Pump out Digester",
            pairedService: "None",
            serviceFee: 0,
        },
    ];

    const handleViewDetails = (title: string) => {
        console.log(`View Details for ${title}`);
    };

    const handlePayServiceFee = (title: string) => {
        console.log(`Pay Service Fee for ${title}`);
    };

    return (
        <div className="p-[2vw]">
            <div className="flex flex-row items-center gap-[1vw] mb-[1.5vw]">
                <PurpleButton text="Add New Task" onClick={() => navigate("/add-task")} />
                <OutlinePurpleButton text="Sort By" />
            </div>

            <div className="w-full grid grid-cols-2 gap-[2vw]">
                {taskData.map((task, index) => (
                    <TaskTypesCard
                        key={index}
                        title={task.title}
                        pairedService={task.pairedService}
                        serviceFee={task.serviceFee}
                        onViewDetails={() => handleViewDetails(task.title)}
                        onPayServiceFee={() => handlePayServiceFee(task.title)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageTaskTypes;
