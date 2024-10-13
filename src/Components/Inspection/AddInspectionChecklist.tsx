import React, { useState } from "react";
import {
  Checklist,
  PumpData,
} from "../../redux/features/inspectionChecklistSlice";
import ChecklistPumps from "./Constants/ChecklistPumps";
import SelectField, { Option } from "../Tags/SelectField";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";
import SubmitInvoiceModal from "./Constants/SubmitInvoiceModal";

const scoreOptions = [
  { label: "OK", value: "OK" },
  { label: "NOT OK", value: "NOT OK" },
];

const overallScoreOptions = [
  { label: "A+", value: "A+" },
  { label: "B+", value: "B+" },
  { label: "C+", value: "C+" },
  { label: "D-", value: "D-" },
  { label: "E-", value: "E-" },
  { label: "F-", value: "F-" },
];

interface AddInspectionChecklistProps {
  onSubmit: (data: Checklist) => void;
}

const AddInspectionChecklist: React.FC<AddInspectionChecklistProps> = ({
  onSubmit,
}) => {
  const [pumpData, setPumpData] = useState<Record<string, PumpData>>({
    pump1: { pumpName: "Pump #1", runs: false, amps: "", contactors: "" },
    pump2: { pumpName: "Pump #2", runs: false, amps: "", contactors: "" },
    pump3: { pumpName: "Pump #3", runs: false, amps: "", contactors: "" },
    pump4: { pumpName: "Pump #4", runs: false, amps: "", contactors: "" },
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [cleaning, setCleaning] = useState<boolean>(false);
  const [overallScore, setoverAllScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [structureScore, setStructureScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [panelScore, setPanelScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [breakersScore, setBreakersScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [pipesScore, setPipesScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [wiresScore, setWiresScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [contactorsScore, setContactorsScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [alarmScore, setAlarmScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [alarmLightScore, setAlarmLightScore] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [thermalsScore, setThermalsScore] = useState<Option | null>({
    label: "",
    value: "",
  });

  const [float1, setFloat1] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [float2, setFloat2] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [float3, setFloat3] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [float4, setFloat4] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [float5, setFloat5] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [float6, setFloat6] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [alarmFloat, setAlarmFloat] = useState<Option | null>({
    label: "",
    value: "",
  });

  const handlePumpChange = (
    pumpKey: string,
    field: keyof PumpData,
    value: any
  ) => {
    setPumpData((prevData) => ({
      ...prevData,
      [pumpKey]: {
        ...prevData[pumpKey],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      structureScore: structureScore?.value || "",
      panelScore: panelScore?.value || "",
      breakersScore: breakersScore?.value || "",
      pipesScore: pipesScore?.value || "",
      wiresScore: wiresScore?.value || "",
      contactorsScore: contactorsScore?.value || "",
      alarmScore: alarmScore?.value || "",
      alarmLightScore: alarmLightScore?.value || "",
      thermalsScore: thermalsScore?.value || "",
      overallScore: overallScore?.value || "",
      cleaning,
      floatScores: {
        float1: float1?.value || "",
        float2: float2?.value || "",
        float3: float3?.value || "",
        float4: float4?.value || "",
        float5: float5?.value || "",
        float6: float6?.value || "",
        alarmFloat: alarmFloat?.value || "",
      },
      pumpScores: pumpData,
    });
  };

  const navigate = useNavigate();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirm = (option: string) => {
    setModalOpen(false);
    console.log("Selected option:", option);
  };

  const renderSelectField = (
    label: string,
    value: Option | null,
    onChange: (value: Option | null) => void
  ) => (
    <div className="flex flex-col">
      <SelectField
        label={label}
        value={value}
        onChange={(option) => onChange(option)}
        options={scoreOptions}
      />
    </div>
  );

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Checklist Scores Section */}
        <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
          <div className="grid grid-cols-3 gap-[1vw]">
            {renderSelectField("Structure", structureScore, setStructureScore)}
            {renderSelectField("Panel", panelScore, setPanelScore)}
            {renderSelectField("Breakers", breakersScore, setBreakersScore)}
            {renderSelectField("Pipes", pipesScore, setPipesScore)}
            {renderSelectField("Wires", wiresScore, setWiresScore)}
            {renderSelectField(
              "Contactors",
              contactorsScore,
              setContactorsScore
            )}
            {renderSelectField("Alarm", alarmScore, setAlarmScore)}
            {renderSelectField(
              "Alarm Light",
              alarmLightScore,
              setAlarmLightScore
            )}
            {renderSelectField("Thermals", thermalsScore, setThermalsScore)}
          </div>
        </div>

        {/* Asset and Pump Data Section */}
        <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
          <div className="w-full space-y-[1vw]">
            <div className="w-full grid grid-cols-3 gap-[1vw]">
              <div className="w-full flex flex-col">
                <SelectField
                  label="Overall Score"
                  value={overallScore}
                  onChange={(option) => setoverAllScore(option)}
                  options={overallScoreOptions}
                  required
                />
              </div>
            </div>
            <div className="w-full space-y-[1vw]">
              {Object.entries(pumpData).map(([pumpKey, pump], index) => (
                <div
                  key={pumpKey}
                  className={`mb-[1vw] ${index !== 3 ? "border-b" : ""}`}
                >
                  <ChecklistPumps
                    pump={pump}
                    index={index}
                    onPumpChange={(field, value) =>
                      handlePumpChange(pumpKey, field as keyof PumpData, value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floats Section */}
        <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
          <div className="flex items-center space-x-[0.5vw]">
            <label className="text-[1.1vw] text-darkgray-0 font-medium">
              Station Needs Cleaning:
            </label>
            <label className="text-[1vw]">Yes</label>
            <input
              type="radio"
              className="w-[1vw] h-[1vw] accent-purple-0 cursor-pointer"
              checked={cleaning === true}
              onChange={() => setCleaning(true)}
            />
            <label className="text-[1vw]">No</label>
            <input
              type="radio"
              className="w-[1vw] h-[1vw] accent-purple-0 cursor-pointer"
              checked={cleaning === false}
              onChange={() => setCleaning(false)}
            />
          </div>
          <div className="grid grid-cols-3 gap-[1vw] mt-[2vw]">
            {renderSelectField("Float 1#", float1, setFloat1)}
            {renderSelectField("Float 2#", float2, setFloat2)}
            {renderSelectField("Float 3#", float3, setFloat3)}
            {renderSelectField("Float 4#", float4, setFloat4)}
            {renderSelectField("Float 5#", float5, setFloat5)}
            {renderSelectField("Float 6#", float6, setFloat6)}
            {renderSelectField("Alarm Float", alarmFloat, setAlarmFloat)}
          </div>
        </div>

        <div className="flex justify-end gap-x-[1vw] m-[2vw] pb-[3vw]">
          <PurpleButton
            type="submit"
            text="Save And Submit"
            onClick={handleModalOpen}
          />
          <PurpleButton type="submit" text="Save And Close" />
          <WhiteButton
            text="Don't Save And Close"
            onClick={() => navigate("/manage-inspections")}
          />
        </div>
      </form>
      <SubmitInvoiceModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleModalClose}
      />
    </div>
  );
};

export default AddInspectionChecklist;
