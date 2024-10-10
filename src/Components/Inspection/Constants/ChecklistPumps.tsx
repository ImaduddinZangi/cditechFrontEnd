import React from "react";
import InputField from "../../Tags/InputField";
import { PumpData } from "../../../redux/features/inspectionChecklistSlice";

interface ChecklistPumpsProps {
  pump: PumpData;
  index: number; // Ensure that index is defined as a number here
  onPumpChange: (field: keyof PumpData, value: any) => void;
}

const ChecklistPumps: React.FC<ChecklistPumpsProps> = ({
  pump,
  index,
  onPumpChange,
}) => {
  return (
    <div className="flex items-center gap-[1vw] mb-[1vw]">
      <div className="w-full">
        <p className="text-[1vw] text-darkgray-0 font-medium">
          Pump #{index + 1}:
        </p>
      </div>
      <div className="w-full flex items-center space-x-[1vw]">
        <p className="text-[1vw] text-darkgray-0 font-medium">Runs:</p>
        <label className="flex items-center space-x-[0.2vw]">
          <input
            type="radio"
            name={`runs-${index}`}
            value="yes"
            className="accent-purple-0"
            checked={pump.runs === true}
            onChange={() => onPumpChange("runs", true)}
          />
          <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
        </label>
        <label className="flex items-center space-x-[0.2vw]">
          <input
            type="radio"
            name={`runs-${index}`}
            value="no"
            className="accent-purple-0"
            checked={pump.runs === false}
            onChange={() => onPumpChange("runs", false)}
          />
          <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
        </label>
      </div>
      <div className="w-full">
        <InputField
          label="Amps:"
          fieldType="number"
          value={pump.amps}
          onChange={(e) => onPumpChange("amps", e.target.value)}
        />
      </div>
      <div className="w-full">
        <InputField
          label="Contactors:"
          fieldType="number"
          value={pump.contactors}
          onChange={(e) => onPumpChange("contactors", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ChecklistPumps;
