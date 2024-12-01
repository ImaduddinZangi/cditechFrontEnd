import React, { useState } from "react";
import TaskAssignmentSettings, { TaskAssignmentSettingsProps } from "./constants/TaskAssignmentSettings";
import ManageTaskTypes from "../ManageTaskTypes/ManageTaskTypes";
import ManageTaskStatuses from "../ManageTaskStatuses/ManageTaskStatuses";

const TaskSettingsDetails: React.FC<TaskAssignmentSettingsProps> = ({ taskAssignmentOnSubmit, taskAssignmentInitialData }) => {
    const [activeTab, setActiveTab] = useState("Assignment Settings");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const tabs = [
        "Assignment Settings",
        "Task Types",
        "Status",
        "Future use",
        "Future Use",
        "Future USE",
    ];

    return (
        <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg overflow-y-auto">
            <div className="flex justify-between p-[0.2vw] bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${activeTab === tab
                            ? "bg-white shadow-lg rounded-[0.5vw]"
                            : "text-darkgray-0"
                            }`}
                        onClick={() => handleTabClick(tab)}
                        aria-selected={activeTab === tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="mt-[1vw] font-inter">
                {activeTab === "Assignment Settings" && <TaskAssignmentSettings taskAssignmentOnSubmit={taskAssignmentOnSubmit} taskAssignmentInitialData={taskAssignmentInitialData} />}
                {activeTab === "Task Types" && <ManageTaskTypes />}
                {activeTab === "Status" && <ManageTaskStatuses />}
                {activeTab === "Future use" && <div>A Tab to be used in the future</div>}
                {activeTab === "Future Use" && <div>A Tab to be used in the future</div>}
                {activeTab === "Future USE" && <div>A Tab to be used in the future</div>}
            </div>
        </div>
    );
};

export default TaskSettingsDetails;
