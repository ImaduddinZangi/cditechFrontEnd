import React, { useState, useEffect } from "react";
import { useGetPumpsQuery } from "../../redux/api/pumpApi";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpDetails: React.FC = () => {
  const { data: pumpsData } = useGetPumpsQuery();
  const [pumps, setPumps] = useState<any[]>([]);

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg">
      <div className="overflow-hidden">
        <div className="flex border-b">
          {[
            "Pumps",
            "Inspection History",
            "Up-Coming Inspection",
            "Photos",
            "Notes",
          ].map((tab) => (
            <button
              key={tab}
              className="w-full py-2 px-4 text-center font-medium hover:bg-gray-100"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4">
          {pumps.map((pump, index) => (
            <div
              key={pump.id}
              className="flex w-full flex-col md:flex-row items-center justify-between border-b py-[1vw]"
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
                  <p className="font-medium text-[1vw] text-gray-0">
                    Installed:
                  </p>
                  <p className="font-semibold text-[1vw] text-darkgray-0">
                    {pump.installedDate
                      ? formatDate(pump.installedDate)
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[1vw] text-gray-0">
                    Avg-AMPS:
                  </p>
                  <p className="font-semibold text-[1vw] text-darkgray-0">
                    {pump.avgAmps || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-[1vw] text-gray-0">
                    Max-AMPS:
                  </p>
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
                  <p className="font-medium text-[1vw] text-gray-0">
                    Warranty:
                  </p>
                  <p className="font-semibold text-[1vw] text-darkgray-0">
                    {pump.warranty || "N/A"}
                  </p>
                </div>
              </div>
              <button className="bg-purple-0 text-white py-2 px-4 rounded-lg">
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PumpDetails;
