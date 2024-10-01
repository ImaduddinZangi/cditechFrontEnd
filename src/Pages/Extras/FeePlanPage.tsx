import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import FeePlan from "../../Components/Extras/FeePlan";
import PurpleButton from "../../Components/Tags/PurpleButton";
import FeePlanDetails from "../../Components/Extras/FeePlanDetails";

const FeePlanPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb="My Fee Plan">
      <FeePlan />
      <div className="m-[2vw] flex flex-row items-center gap-[1vw]">
        <PurpleButton text="View Receipt" />
        <PurpleButton text="Cancel Plan" />
        <PurpleButton text="Update Payment Method" />
        <PurpleButton text="Upgrade Plan" />
      </div>
      <FeePlanDetails />
    </ClientLayout>
  );
};

export default FeePlanPage;
