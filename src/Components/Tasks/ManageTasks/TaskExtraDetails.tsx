import React, { useState } from "react";
import TaskAssets from "./constants/TaskAssets";
import TaskStatusHistory from "../ManageTaskStatuses/TaskStatusHistory";
import TaskInvoice from "../ManageTaskInvoices/TaskInvoice";

const TaskExtraDetails: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Assets");

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const sampleInvoice = {
        id: 25493,
        customerName: "Wenders Store 4739",
        customerEmail: "bob@gmail.com",
        subtotal: 459,
        tax: 0,
        total: 459,
        createdDate: "06-05-2024",
        dueDate: "06-05-2024",
        terms: "Due on Receipt",
        customerAddress: "89001 Overseas HWY, Miami, FL 33070",
        sentStatus: "Not-Sent",
        invoiceStatus: "Past-Due",
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
            <div className="mt-[1vw] font-inter">
                {activeTab === "Assets" && <TaskAssets />}
                {activeTab === "Status History" && <TaskStatusHistory />}
                {activeTab === "Task Invoice" && <TaskInvoice invoice={sampleInvoice} />}
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
