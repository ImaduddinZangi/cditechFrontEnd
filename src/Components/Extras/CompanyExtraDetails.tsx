import React, { useState } from "react";
import CompanyBillingInfo from "./CompanyBillingInfo";
import CompanyNotificationSettings from "./CompanyNotificationSetting";

const CompanyExtraDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | "billingInfo"
    | "notificationSettings"
    | "feePlan"
    | "invoices"
    | "quickBookAccess"
    | "securitySettings"
  >("billingInfo");

  const handleTabClick = (
    tab:
      | "billingInfo"
      | "notificationSettings"
      | "feePlan"
      | "invoices"
      | "quickBookAccess"
      | "securitySettings"
  ) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg max-h-[93vh] overflow-y-auto">
      <div className="flex p-[0.2vw] justify-between bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "feePlan"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("feePlan")}
        >
          Fee Plan
        </button>
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "billingInfo"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("billingInfo")}
        >
          Billing Info
        </button>
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "invoices"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("invoices")}
        >
          Invoices
        </button>
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "quickBookAccess"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("quickBookAccess")}
        >
          QuickBook Access
        </button>
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "securitySettings"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("securitySettings")}
        >
          Security Settings
        </button>
        <button
          className={`flex-1 py-[0.5vw] text-[1vw] text-center ${
            activeTab === "notificationSettings"
              ? "bg-white shadow-lg rounded-[0.5vw]"
              : "text-darkgray-0"
          }`}
          onClick={() => handleTabClick("notificationSettings")}
        >
          Notification Settings
        </button>
      </div>

      {activeTab === "billingInfo" && <CompanyBillingInfo />}
      {activeTab === "notificationSettings" && <CompanyNotificationSettings />}

      {/* These are inactive and can be filled when needed */}
      {activeTab === "feePlan" && (
        <div className="text-center mt-4">Fee Plan details coming soon...</div>
      )}
      {activeTab === "invoices" && (
        <div className="text-center mt-4">Invoices details coming soon...</div>
      )}
      {activeTab === "quickBookAccess" && (
        <div className="text-center mt-4">
          QuickBook Access details coming soon...
        </div>
      )}
      {activeTab === "securitySettings" && (
        <div className="text-center mt-4">
          Security Settings details coming soon...
        </div>
      )}
    </div>
  );
};

export default CompanyExtraDetails;
