import React, { useState, useEffect } from "react";
import {
  useGetPumpsQuery,
  useUpdatePumpMutation,
} from "../../../redux/api/pumpApi";
import { Pump } from "../../../redux/features/pumpSlice";
import AddPump from "./AddPump";
import { useGetPhotosQuery } from "../../../redux/api/uploadPhotosApi";
import { toast } from "react-toastify";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpCard: React.FC<{
  pump: Pump;
  index: number;
  onEdit: (pump: Pump) => void;
  photoUrl: string;
}> = ({ pump, index, onEdit, photoUrl }) => {
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
          src={photoUrl || "path/to/default/image.png"}
          alt={pump.name}
          className="w-full h-full rounded-full mr-[1vw]"
        />
      </div>
      <div className="flex-1 w-2/3 grid grid-cols-4 gap-[1vw]">
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Brand:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.name}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Avg-AMPS:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.avgAmps}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Max-AMPS:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.maxAmps}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Pump-ID:
          </p>
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
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Installed:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {formatDate(pump.installedDate)}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Warranty:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.warranty}
          </p>
        </div>
        <div>
          <p className="text-gray-0 font-inter font-medium text-[1vw]">
            Serial:
          </p>
          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
            {pump.serial}
          </p>
        </div>
      </div>
      <div className="w-1/6 flex items-baseline justify-end">
        <button
          className="bg-purple-0 bg-opacity-5 border border-purple-0 text-[1vw] text-purple-0 font-inter font-medium px-[1vw] py-[0.5vw] rounded-md"
          onClick={() => onEdit(pump)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const Pumps: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { data: pumpsData } = useGetPumpsQuery();
  const { data: photosData } = useGetPhotosQuery();
  const [updatePump] = useUpdatePumpMutation();
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [selectedPump, setSelectedPump] = useState<Pump | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

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
          hp,
        };
        await updatePump(updatedPump).unwrap();
        setPumps(
          pumps.map((pump) =>
            pump.id === selectedPump.id ? updatedPump : pump
          )
        );
        toast.success("Pump Updated Successfully");
        handleModalClose();
      } catch (error) {
        toast.error("Failed to update pump!");
        console.error("Failed to update pump:", error);
      }
    }
  };

  const handlePumpEdit = (pump: Pump) => {
    setSelectedPump(pump);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg relative pt-[6vw]">
      <button
        onClick={onClick}
        className="absolute top-[1.5vw] right-[1.5vw] bg-purple-0 text-white px-[1vw] py-[0.5vw] rounded-lg mb-[1vw]"
      >
        Add New Pump
      </button>
      {pumps.map((pump, index) => {
        const pumpPhoto = photosData?.find((photo) => photo.pumpId === pump.id);
        const photoUrl = pumpPhoto ? pumpPhoto.url : "";

        return (
          <PumpCard
            key={pump.id}
            pump={pump}
            index={index}
            onEdit={handlePumpEdit}
            photoUrl={photoUrl}
          />
        );
      })}
      {isModalOpen && (
        <AddPump
          isModalOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handlePumpSubmit}
          initialData={isEditing ? selectedPump : null}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Pumps;
