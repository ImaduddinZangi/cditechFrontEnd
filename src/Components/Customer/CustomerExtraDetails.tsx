import React, { useState } from "react";
import CustomerInvoiceList from "./CustomerInvoiceList";

const CustomerExtraDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Invoices");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg max-h-[93vh] overflow-y-auto">
      <div className="flex justify-between p-[0.2vw] bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
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
            activeTab === "Notes"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("Notes")}
        >
          Notes
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
      </div>
      <div className="mt-4">
        {activeTab === "Invoices" && <CustomerInvoiceList />}
      </div>
    </div>
  );
};

export default CustomerExtraDetails;
