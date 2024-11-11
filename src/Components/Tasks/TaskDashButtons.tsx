import React from "react";
import { useNavigate } from "react-router-dom";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";

const TaskDashButtons: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="m-[2vw] grid grid-cols-4 gap-[2vw]">
      <OutlinePurpleButton
        text="Customer Manager"
        onClick={() => navigate("/manage-customers")}
      />
      <OutlinePurpleButton
        text="Task Manager"
        onClick={() => navigate("/manage-tasks")}
      />
      <OutlinePurpleButton
        text="Inspection Manager"
        onClick={() => navigate("/manage-inspections")}
      />
      <OutlinePurpleButton
        text="Task Map"
        onClick={() => navigate("/view-tasks-map")}
      />
      <OutlinePurpleButton
        text="Quick Lookup"
        onClick={() => navigate("/quick-lookup")}
      />
      <OutlinePurpleButton
        text="My Task"
        onClick={() => navigate("/manage-tasks")}
      />
      <OutlinePurpleButton
        text="My Inspection"
        onClick={() => navigate("/manage-inspections")}
      />
      <OutlinePurpleButton
        text="Inspection Map"
        onClick={() => navigate("/view-inspections-map")}
      />
      <OutlinePurpleButton
        text="Scan QR Code"
        onClick={() => navigate("/scan-qr-code")}
      />
      <OutlinePurpleButton
        text="My Task History"
        onClick={() => navigate("/tasks-history")}
      />
      <OutlinePurpleButton
        text="My Inspection History"
        onClick={() => navigate("/inspections-history")}
      />
      <OutlinePurpleButton
        text="Asset Map"
        onClick={() => navigate("/view-assets-map")}
      />
    </div>
  );
};

export default TaskDashButtons;
