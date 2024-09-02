import React, { useState, useEffect } from "react";
import {
  useGetPumpsQuery,
  useUpdatePumpMutation,
  useDeletePumpMutation,
} from "../../../redux/api/pumpApi";
import { useGetPhotosQuery } from "../../../redux/api/uploadPhotosApi";
import AddPump from "../../../Components/Customer/Pump/AddPump";
import { toast } from "react-toastify";
import { Pump } from "../../../redux/features/pumpSlice";
import ConfirmationModal from "../../Constants/ConfirmationModal";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpCard: React.FC<{
  pump: Pump;
  index: number;
  onEdit: (pump: Pump) => void;
  onDelete: () => void;
  photoUrl: string;
}> = ({ pump, index, onEdit, photoUrl, onDelete }) => (
  <div className="flex items-center justify-between border p-[1vw] mb-[1vw] rounded-lg">
    <div className="w-1/6">
      <div className="w-full flex flex-row items-center">
        <p className="text-gray-0 font-inter font-medium text-[1vw]">Pump #</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {index + 1}
        </p>
      </div>
      <img
        src={photoUrl}
        alt={pump.name}
        className="w-[8vw] h-[8vw] object-cover rounded-md mb-0"
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
        <p className="text-gray-0 font-inter font-medium text-[1vw]">Serial:</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.serial}
        </p>
      </div>
    </div>
    <div className="w-1/6 flex justify-center space-x-[1vw]">
      <PurpleButton type="button" text="Edit" onClick={() => onEdit(pump)} />
      <WhiteButton type="button" text="Delete" onClick={onDelete} />
    </div>
  </div>
);

const Pumps: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { data: pumpsData } = useGetPumpsQuery();
  const { data: photosData } = useGetPhotosQuery();
  const [updatePump] = useUpdatePumpMutation();
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [selectedPump, setSelectedPump] = useState<Pump | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const assetId = localStorage.getItem("assetId");
  const [deletePump] = useDeletePumpMutation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pumpIdToDelete, setPumpIdToDelete] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (pumpsData && assetId) {
      const filteredPumps = pumpsData.filter(
        (pump) => pump.asset?.id === assetId
      );
      setPumps(filteredPumps);
    }
  }, [pumpsData, assetId]);

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

  const handleOpenDeleteModal = (id: string | undefined) => {
    setPumpIdToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleDeletePump = async () => {
    if (pumpIdToDelete) {
      try {
        await deletePump(pumpIdToDelete).unwrap();
        toast.success("Pump deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
        setIsConfirmationModalOpen(false);
      } catch (error) {
        toast.error("Error deleting pump!");
      }
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmationModalOpen(false);
    setPumpIdToDelete(undefined);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg relative pt-[6vw]">
      <PurpleButton type="button" text="Add New Pump" onClick={onClick} />
      {pumps.map((pump, index) => {
        const pumpPhoto = photosData?.find((photo) => photo.pumpId === pump.id);
        const photoUrl = pumpPhoto
          ? `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${pumpPhoto.url}`
          : "/assets/no-image.jpg";

        return (
          <PumpCard
            key={pump.id}
            pump={pump}
            index={index}
            onEdit={handlePumpEdit}
            onDelete={() => handleOpenDeleteModal(pump.id)}
            photoUrl={photoUrl}
          />
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

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to delete this pump?"
        onConfirm={handleDeletePump}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Pumps;
