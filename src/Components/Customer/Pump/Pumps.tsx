import React, { useState, useEffect } from "react";
import { useGetPumpsQuery } from "../../../redux/api/pumpApi";
import { Pump } from "../../../redux/features/pumpSlice"; // Import the Pump type from your pumpSlice

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpCard: React.FC<{ pump: Pump, index: number }> = ({ pump, index }) => {
  return (
    <div className="flex items-center justify-between border p-[1vw] mb-[1vw] rounded-lg">
      <div className="w-1/6">
        <div className="w-full flex flex-row items-center">
          <p className="font-semibold">Pump #</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {index + 1}
          </p>
        </div>
        <img
          src="path/to/image.png"
          alt={pump.name}
          className="w-full h-full rounded-full mr-[1vw]"
        />
      </div>
      <div className="flex-1 w-2/3 grid grid-cols-4 gap-[1vw]">
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Brand:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.name}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Avg-AMPS:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.avgAmps}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Max-AMPS:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.maxAmps}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Pump-ID:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.id}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">HP:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.hp}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Installed:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {formatDate(pump.installedDate)}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Warranty:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.warranty}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">Serial:</p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.serial}
          </p>
        </div>
      </div>
      <div className="w-1/6 flex items-baseline justify-end">
        <button className="bg-purple-0 text-white px-[1vw] bottom-0 right-0 py-[0.5vw] rounded-lg">
          Edit
        </button>
      </div>
    </div>
  );
};

interface PumpsProps {
  onClick: () => void;
}

const Pumps: React.FC<PumpsProps> = ({onClick}) => {
  const { data: pumpsData } = useGetPumpsQuery();
  const [pumps, setPumps] = useState<Pump[]>([]);

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg relative pt-[6vw]">
      <button onClick={onClick} className="absolute top-[1.5vw] right-[1.5vw] bg-purple-0 text-white px-[1vw] py-[0.5vw] rounded-lg mb-[1vw]">
        Add New Pump
      </button>
      {pumps.map((pump, index) => (
        <PumpCard key={pump.id} pump={pump} index={index} />
      ))}
    </div>
  );
};

export default Pumps;
