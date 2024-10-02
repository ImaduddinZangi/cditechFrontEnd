import React, { useState, useEffect } from "react";
import {
  Scores,
  FloatScores,
  PumpData,
} from "../../redux/features/inspectionScoresSlice";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { Asset } from "../../redux/features/assetSlice";
import { useGetPumpsQuery } from "../../redux/api/pumpApi";
import { Pump } from "../../redux/features/pumpSlice";
import InputField from "../Tags/InputField";

interface AddInspectionScoresProps {
  onSubmit: (data: Scores) => void;
}

const AddInspectionScores: React.FC<AddInspectionScoresProps> = ({
  onSubmit,
}) => {
  const [structureScore, setStructureScore] = useState<string>("OK");
  const [panelScore, setPanelScore] = useState<string>("OK");
  const [breakersScore, setBreakersScore] = useState<string>("OK");
  const [pipesScore, setPipesScore] = useState<string>("OK");
  const [wiresScore, setWiresScore] = useState<string>("OK");
  const [contactorsScore, setContactorsScore] = useState<string>("OK");
  const [alarmScore, setAlarmScore] = useState<string>("OK");
  const [alarmLightScore, setAlarmLightScore] = useState<string>("OK");
  const [thermalsScore, setThermalsScore] = useState<string>("OK");
  const [overallScore, setoverAllScore] = useState<string>("A+");
  const [name, setName] = useState<string>("");

  const [assetId, setAssetId] = useState<string>("");
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [pumpData, setPumpData] = useState<PumpData[]>([]);

  const [cleaning, setCleaning] = useState<boolean>(false);
  const [floats, setFloats] = useState<FloatScores>({
    float1: "OK",
    float2: "OK",
    float3: "OK",
    float4: "OK",
    float5: "OK",
    float6: "OK",
    alarmFloat: "OK",
  });

  const { data: assets } = useGetAssetsQuery();
  const { data: pumpsData } = useGetPumpsQuery();

  useEffect(() => {
    if (pumpsData && assetId) {
      const filteredPumps = pumpsData.filter(
        (pump) => pump.asset?.id === assetId
      );
      setPumps(filteredPumps);

      const newPumpData = filteredPumps.map((pump) => ({
        pumpName: pump.name,
        runs: false,
        amps: "",
        contactors: "",
      }));
      setPumpData(newPumpData);
    }
  }, [pumpsData, assetId]);

  const handlePumpChange = (
    index: number,
    field: keyof PumpData,
    value: any
  ) => {
    const updatedPumpData = [...pumpData];
    updatedPumpData[index] = {
      ...updatedPumpData[index],
      [field]: value,
    };
    setPumpData(updatedPumpData);
  };

  const handleFloatsChange = (field: keyof FloatScores, value: string) => {
    setFloats({ ...floats, [field]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      structureScore,
      panelScore,
      breakersScore,
      pipesScore,
      wiresScore,
      contactorsScore,
      alarmScore,
      alarmLightScore,
      thermalsScore,
      overallScore,
      cleaning,
      name,
      floatScores: floats,
      pumpScores: pumpData,
    });
  };

  const renderSelectField = (
    label: string,
    value: string,
    onChange: (value: string) => void
  ) => (
    <div className="flex flex-col">
      <label className="block text-darkgray-0 font-medium text-[1vw]">
        {label}:
      </label>
      <select
        className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="OK">OK</option>
        <option value="NOT OKAY">NOT OKAY</option>
      </select>
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
            <div className="w-full flex flex-row items-center gap-[1vw]">
              <div className="w-full flex flex-col">
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  Overall Score
                </label>
                <select
                  className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                  value={overallScore}
                  onChange={(e) => setoverAllScore(e.target.value)}
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                </select>
              </div>
              <div className="w-full">
                <InputField
                  fieldType="text"
                  label="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Scores Title"
                />
              </div>
              <div className="w-full">
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  Asset:
                </label>
                <select
                  className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                  name="assetId"
                  value={assetId}
                  onChange={(e) => setAssetId(e.target.value)}
                  required
                >
                  <option value="">Select Asset</option>
                  {assets?.map((asset: Asset) => (
                    <option key={asset.id} value={asset.id}>
                      {asset.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {pumps.map((pump, index) => (
              <div className="flex items-center gap-[1vw]" key={pump.id}>
                <div className="w-full">
                  <p className="text-[1.2vw] text-darkgray-0 font-semibold">
                    {pump.name}:
                  </p>
                </div>
                <div className="w-full flex items-center space-x-[1vw]">
                  <p className="text-[1vw] text-darkgray-0 font-medium">
                    Runs:
                  </p>
                  <label className="flex items-center space-x-[0.2vw]">
                    <input
                      type="radio"
                      name={`pump-${index}-runs`}
                      value="yes"
                      className="accent-purple-0"
                      checked={pumpData[index]?.runs === true}
                      onChange={() => handlePumpChange(index, "runs", true)}
                    />
                    <p className="text-[1vw] text-darkgray-0 font-medium">
                      Yes
                    </p>
                  </label>
                  <label className="flex items-center space-x-[0.2vw]">
                    <input
                      type="radio"
                      name={`pump-${index}-runs`}
                      value="no"
                      className="accent-purple-0"
                      checked={pumpData[index]?.runs === false}
                      onChange={() => handlePumpChange(index, "runs", false)}
                    />
                    <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
                  </label>
                </div>
                <div className="w-full">
                  <InputField
                    label="Amps:"
                    fieldType="number"
                    value={pumpData[index]?.amps}
                    onChange={(e) =>
                      handlePumpChange(index, "amps", e.target.value)
                    }
                  />
                </div>
                <div className="w-full">
                  <InputField
                    label="Contactors:"
                    fieldType="number"
                    value={pumpData[index]?.contactors}
                    onChange={(e) =>
                      handlePumpChange(index, "contactors", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
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
              className="w-[1vw] h-[1vw] accent-purple-0"
              checked={cleaning === true}
              onChange={() => setCleaning(true)}
            />
            <label className="text-[1vw]">No</label>
            <input
              type="radio"
              className="w-[1vw] h-[1vw] accent-purple-0"
              checked={cleaning === false}
              onChange={() => setCleaning(false)}
            />
          </div>
          <div className="grid grid-cols-3 gap-[1vw] mt-[2vw]">
            {renderSelectField("Float 1#", floats.float1, (val) =>
              handleFloatsChange("float1", val)
            )}
            {renderSelectField("Float 2#", floats.float2, (val) =>
              handleFloatsChange("float2", val)
            )}
            {renderSelectField("Float 3#", floats.float3, (val) =>
              handleFloatsChange("float3", val)
            )}
            {renderSelectField("Float 4#", floats.float4, (val) =>
              handleFloatsChange("float4", val)
            )}
            {renderSelectField("Float 5#", floats.float5, (val) =>
              handleFloatsChange("float5", val)
            )}
            {renderSelectField("Float 6#", floats.float6, (val) =>
              handleFloatsChange("float6", val)
            )}
            {renderSelectField("Alarm Float", floats.alarmFloat, (val) =>
              handleFloatsChange("alarmFloat", val)
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-[1vw]">
          <button
            type="submit"
            className="bg-purple-0 text-white py-2 px-4 rounded-lg"
          >
            Submit Scores
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInspectionScores;
