import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import DashInspectionGraph from "../../Components/ClientProfile/DashInspectionGraph";
import DashButtons from "../../Components/ClientProfile/DashButtons";
import DashCard from "../../Components/Constants/DashCards";

const ClientDashboardPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="Dashboard">
      <div className="grid grid-cols-3 gap-[1vw] m-[2vw]">
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
      <DashInspectionGraph />
      <DashButtons />
    </ClientLayout>
  );
};

export default ClientDashboardPage;
