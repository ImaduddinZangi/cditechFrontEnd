import React, { useState } from "react";
import TaskAssets from "./constants/TaskAssets";
import TaskStatusHistory from "./constants/TaskStatusHistory";

const TaskExtraDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Assets");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const tabs = [
        "Assets",
        "Status History",
        "Task Invoice",
        "Photos",
        "Videos",
        "Notes",
        "Future Use",
        "Advance Details",
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
            <div className="mt-[1vw]">
                {activeTab === "Assets" && <TaskAssets />}
                {activeTab === "Status History" && <TaskStatusHistory />}
                {activeTab === "Task Invoice" && <div>Task Invoice Content</div>}
                {activeTab === "Photos" && (
                    <div>Task Photos Content</div>
                )}
                {activeTab === "Videos" && (
                    <div>Task Videos Content</div>
                )}
                {activeTab === "Notes" && <div>Asset Notes Content</div>}
                {activeTab === "Future Use" && <div>A Tab to be used in the future</div>}
                {activeTab === "Advance Details" && <div>Advance Details Content</div>}
            </div>
        </div>
    );
};

export default TaskExtraDetails;
