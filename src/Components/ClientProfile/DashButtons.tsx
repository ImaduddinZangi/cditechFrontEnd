import React from "react";
import { useNavigate } from "react-router-dom";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import PurpleButton from "../Tags/PurpleButton";

const DashButtons: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-[2vw] grid grid-cols-4 gap-[2vw]">
      <OutlinePurpleButton
        text="Manage Customer"
        onClick={() => navigate("/manage-customer")}
      />
      <OutlinePurpleButton
        text="Inspection Manager"
        onClick={() => navigate("/inspection-manager")}
      />
      <OutlinePurpleButton
        text="My Inspection History"
        onClick={() => navigate("/my-inspection-history")}
      />
      <OutlinePurpleButton
        text="Quick Lookup"
        onClick={() => navigate("/quick-lookup")}
      />
      <OutlinePurpleButton
        text="Inspection List"
        onClick={() => navigate("/inspection-table")}
      />
      <OutlinePurpleButton
        text="Past-Due Inspection List"
        onClick={() => navigate("/inspection-table-past-due")}
      />
      <OutlinePurpleButton
        text="Begin Inspection List Now"
        onClick={() => navigate("/begin-inspection-list-now")}
      />
      <OutlinePurpleButton
        text="Scan QR Code"
        onClick={() => navigate("/scan-qr-code")}
      />
      <OutlinePurpleButton
        text="Inspection List Map"
        onClick={() => navigate("/inspection-list-map")}
      />
      <OutlinePurpleButton
        text="Customer Asset Manager"
        onClick={() => navigate("/customer-asset-manager")}
      />
      <PurpleButton
        text="Add New Quickbook"
        onClick={() => navigate("/add-new-quickbook")}
      />
    </div>
  );
};

export default DashButtons;
