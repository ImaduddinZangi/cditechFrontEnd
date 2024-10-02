import React from "react";

const CompanyBillingInfo: React.FC = () => {
  return (
    <div className="p-[1vw]">
      <p className="font-semibold text-[1.2vw]">Billing Info</p>
      <div className="mt-[1vw]">
        {/* Add fields or sections for billing info here */}
        <p className="text-[1vw]">New Device Logins: SMS / Email</p>
        <p className="text-[1vw]">Failed Login Attempts: SMS / Email</p>
        <p className="text-[1vw]">Monthly Work Reports: SMS / Email</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default CompanyBillingInfo;
