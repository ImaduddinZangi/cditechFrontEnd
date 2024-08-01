import React, { useState, useEffect } from "react";
import { useGetPumpsQuery, useUpdatePumpMutation } from "../../../redux/api/pumpApi";
import { useGetPhotosQuery } from "../../../redux/api/uploadPhotosApi";
import AddPump from "../../../Components/Customer/Pump/AddPump";
import { toast } from "react-toastify";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpDetails: React.FC = () => {
  const { data: pumpsData } = useGetPumpsQuery();
  const { data: photosData } = useGetPhotosQuery();
  const [updatePump] = useUpdatePumpMutation();
  const [pumps, setPumps] = useState<any[]>([]);
  const [selectedPump, setSelectedPump] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

  const handlePumpEdit = (pump: any) => {
    console.log("Edit button clicked", pump);
    setSelectedPump(pump);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPump(null);
    setIsEditing(false);
  };

  const handlePumpSubmit = async (
    assetId: string,
    name: string,
    brandId: string,
    serial: string,
    warranty: string,
    installedDate: string,
    avgAmps: number,
    maxAmps: number,
    hp: number
  ) => {
    if (isEditing && selectedPump) {
      try {
        const updatedPump = {
          ...selectedPump,
          assetId,
          name,
          brandId,
          serial,
          warranty,
          installedDate,
          avgAmps,
          maxAmps,
          hp
        };
        await updatePump({ id: selectedPump.id, ...updatedPump }).unwrap();
        setPumps(pumps.map(pump => pump.id === selectedPump.id ? updatedPump : pump));
        toast.success("Pump Updated successfully");
        handleModalClose();
      } catch (error) {
        toast.error("Failed to update pump!");
        console.error("Failed to update pump:", error);
      }
    }
  };

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
      {pumps.map((pump, index) => {
        const pumpPhoto = photosData?.find(photo => photo.pumpId === pump.id);
        return (
          <div
            key={pump.id}
            className="flex w-full flex-col md:flex-row items-center justify-between rounded border mt-[1vw] p-[1vw]"
          >
            <div className="flex-col w-1/6">
              <div className="font-medium text-[1vw]">Pump #{index + 1}</div>
              <img
                src={pumpPhoto?.url}
                alt={pump.name}
                className="w-[8vw] h-[8vw] object-cover rounded-md mb-4 md:mb-0"
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
            <button onClick={() => handlePumpEdit(pump)} className="bg-purple-0 bg-opacity-5 border border-purple-0 text-[1vw] text-purple-0 font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
              Edit
            </button>
          </div>
        );
      })}
      {isModalOpen && (
        <AddPump 
          isModalOpen={isModalOpen} 
          onClose={handleModalClose} 
          onSubmit={handlePumpSubmit} 
          initialData={selectedPump}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default PumpDetails;
