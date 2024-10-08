import React, { useState } from "react";
import CustomerInvoiceList from "./CustomerInvoiceList";
import AssetDetails from "./Asset/AssetDetails";

const CustomerExtraDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Assets");
  const [showMoreTabs, setShowMoreTabs] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleMoreTabsClick = () => {
    setShowMoreTabs(true);
    setActiveTab("Files"); // Set the first tab of "More Tabs" as the active tab
  };

  const handleLessTabsClick = () => {
    setShowMoreTabs(false);
    setActiveTab("Assets"); // Reset to the default tabs with "Assets" as the active tab
  };

  const defaultTabs = (
    <>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Assets"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Assets")}
      >
        Assets
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Task History"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Task History")}
      >
        Task History
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Up-Coming Tasks"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Up-Coming Tasks")}
      >
        Up-Coming Tasks
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Inspection History"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Inspection History")}
      >
        Inspection History
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Upcoming Inspections"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Upcoming Inspections")}
      >
        Upcoming Inspections
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Asset Notes"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Asset Notes")}
      >
        Asset Notes
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "More Tabs"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={handleMoreTabsClick}
      >
        More Tabs
      </button>
    </>
  );

  const moreTabs = (
    <>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Files"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Files")}
      >
        Files
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Photos"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Photos")}
      >
        Photos
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Videos"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Videos")}
      >
        Videos
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Invoices"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Invoices")}
      >
        Invoices
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Customer Portal Manager"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("Customer Portal Manager")}
      >
        Customer Portal Manager
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "All Task Status"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={() => handleTabClick("All Task Status")}
      >
        All Task Status
      </button>
      <button
        className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
          activeTab === "Less Tabs"
            ? "bg-white shadow-lg rounded-[0.5vw]"
            : "text-darkgray-0"
        }`}
        onClick={handleLessTabsClick}
      >
        Less Tabs
      </button>
    </>
  );

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg overflow-y-auto">
      <div className="flex justify-between p-[0.2vw] bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
        {showMoreTabs ? moreTabs : defaultTabs}
      </div>
      <div className="mt-[1vw]">
        {activeTab === "Invoices" && <CustomerInvoiceList />}
        {activeTab === "Assets" && <AssetDetails />}
      </div>
    </div>
  );
};

export default CustomerExtraDetails;
