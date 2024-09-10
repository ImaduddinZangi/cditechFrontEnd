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
import PumpCard from "./PumpCard";

const Pumps: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { data: pumpsData } = useGetPumpsQuery();
  const { data: photosData } = useGetPhotosQuery();
  const [updatePump] = useUpdatePumpMutation();
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [selectedPump, setSelectedPump] = useState<Pump | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setSelectedPump(undefined);
  };

  const handlePumpSubmit = async (pumpData: Pump) => {
    if (selectedPump) {
      try {
        const updatedPump = {
          ...selectedPump,
          pumpData,
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
      <PurpleButton
        type="button"
        text="Add New Pump"
        onClick={onClick}
        className="mb-[2vw]"
      />
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
