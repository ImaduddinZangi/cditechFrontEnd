import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import ManagementLogsTable from "../../Components/Logs/ManagementLogsTable";
import DashCard from "../../Components/Constants/DashCards";

const ManagementLogsTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Management Logs Dashboard">
      <div className="grid grid-cols-4 gap-[1vw] m-[2vw]">
        <DashCard title="Errors" value={0} percentage="10%" isPositive={true} />
        <DashCard
          title="Security"
          value={3}
          percentage="12%"
          isPositive={true}
        />
        <DashCard
          title="Actions"
          value={276}
          percentage="2%"
          isPositive={false}
        />
        <DashCard
          title="Webhooks"
          value={799}
          percentage="3%"
          isPositive={false}
        />
      </div>
      <ManagementLogsTable />
    </ClientLayout>
  );
};

export default ManagementLogsTablePage;
