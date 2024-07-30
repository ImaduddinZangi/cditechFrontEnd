import React, { useState, useEffect } from "react";
import { useGetPumpsQuery } from "../../../redux/api/pumpApi";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpDetails: React.FC = () => {
  const { data: pumpsData } = useGetPumpsQuery();
  const [pumps, setPumps] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

  const handlePumpEdit = (pumpId: string) => {
    navigate(`/edit-pump-${pumpId}`)
  }

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg">
      <div className="flex p-[0.2vw] justify-between bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center shadow-lg rounded-[0.5vw] bg-white">
          Pumps
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Inspection History
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Up-Coming Inspection
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Photos
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Notes
        </button>
      </div>
      {pumps.map((pump, index) => (
        <div
          key={pump.id}
          className="flex w-full flex-col md:flex-row items-center justify-between rounded border mt-[1vw] p-[1vw]"
        >
          <div className="flex-col w-1/6">
            <div className="font-medium text-[1vw]">Pump #{index + 1}</div>
            <img
              src="path/to/image.png"
              alt="Pump"
              className="w-24 h-24 object-cover rounded-md mb-4 md:mb-0"
            />
          </div>
          <div className="grid grid-cols-4 gap-y-[3vw] gap-x-[1vw] w-4/6">
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Brand:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.brand?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">HP:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.hp || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Installed:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.installedDate ? formatDate(pump.installedDate) : "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Avg-AMPS:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.avgAmps || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Max-AMPS:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.maxAmps || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Pump-ID:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.id || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Serial:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.serial || "N/A"}
              </p>
            </div>
            <div>
              <p className="font-medium text-[1vw] text-gray-0">Warranty:</p>
              <p className="font-semibold text-[1vw] text-darkgray-0">
                {pump.warranty || "N/A"}
              </p>
            </div>
          </div>
          <button onClick={() => handlePumpEdit(pump.id)} className="bg-purple-0 bg-opacity-5 border border-purple-0 text-[1vw] text-purple-0 font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default PumpDetails;
