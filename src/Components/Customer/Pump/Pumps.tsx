import React, { useState, useEffect } from "react";
import {
  useGetPumpsQuery,
  useDeletePumpMutation,
  useCreatePumpMutation,
} from "../../../redux/api/pumpApi";
import { toast } from "react-toastify";
import { Pump } from "../../../redux/features/pumpSlice";
import ConfirmationModal from "../../Constants/ConfirmationModal";
import PurpleButton from "../../Tags/PurpleButton";
import PumpCard from "./PumpCard";
import AddPumpModal from "./AddPumpModal";

const Pumps: React.FC = () => {
  const { data: pumpsData } = useGetPumpsQuery();
  const [pumps, setPumps] = useState<Pump[]>([]);
  const assetId = localStorage.getItem("assetId");
  const [deletePump] = useDeletePumpMutation();
  const [addPump] = useCreatePumpMutation();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [pumpIdToDelete, setPumpIdToDelete] = useState<string | undefined>(
    undefined
  );
  const [isAddPumpModalOpen, setIsAddPumpModalOpen] = useState(false);

  useEffect(() => {
    if (pumpsData && assetId) {
      const filteredPumps = pumpsData.filter(
        (pump) => pump.asset?.id === assetId
      );
      setPumps(filteredPumps);
    }
  }, [pumpsData, assetId]);

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

  const handleAddNewPump = async (formData: FormData) => {
    try {
      await addPump(formData).unwrap();
      toast.success("Pump added successfully!", {
        onClose: () => window.location.reload(),
        autoClose: 500,
      });
      setIsAddPumpModalOpen(false);
    } catch (error) {
      toast.error("Error adding pump!");
    }
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg relative pt-[6vw]">
      <PurpleButton
        type="button"
        text="Add New Pump"
        onClick={() => setIsAddPumpModalOpen(true)}
        className="mb-[2vw]"
      />

      {pumps.map((pump, index) => {
        return (
          <PumpCard
            key={pump.id}
            pump={pump}
            index={index}
            onDelete={() => handleOpenDeleteModal(pump.id)}
          />
        );
      })}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to delete this pump?"
        onConfirm={handleDeletePump}
        onCancel={handleCancelDelete}
      />
      <AddPumpModal
        isOpen={isAddPumpModalOpen}
        onClose={() => setIsAddPumpModalOpen(false)}
        onEdit={handleAddNewPump}
      />
    </div>
  );
};

export default Pumps;
