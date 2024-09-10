import React, { useState, useEffect } from "react";
import { ChecklistItem } from "../../redux/features/inspectionSlice";
import {
  useGetChecklistItemsQuery,
  useUpdateChecklistItemMutation,
} from "../../redux/api/checkListItemApi";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (checklistName: string, checklistItemIds: string[]) => void;
  initialChecklistItemIds?: string[];
  initialChecklistName?: string;
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialChecklistItemIds = [],
  initialChecklistName = "",
}) => {
  const { data: allChecklistItems, isLoading } = useGetChecklistItemsQuery();
  const [selectedItems, setSelectedItems] = useState<ChecklistItem[]>([]);
  const [checklistName, setChecklistName] = useState<string>(""); // Default empty string
  const [updateChecklistItem] = useUpdateChecklistItemMutation();

  useEffect(() => {
    // Only set checklistName from initialChecklistName if it exists
    if (initialChecklistName) {
      setChecklistName(initialChecklistName);
    }
    if (allChecklistItems && initialChecklistItemIds.length > 0) {
      const initialItems = allChecklistItems.filter((item) =>
        initialChecklistItemIds.includes(item.id)
      );
      setSelectedItems(initialItems);
    }
  }, [allChecklistItems, initialChecklistItemIds, initialChecklistName]);

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = allChecklistItems?.find(
      (item) => item.id === e.target.value
    );
    if (selectedItem && !selectedItems.some((item) => item.id === selectedItem.id)) {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleCheckboxChange = async (index: number, isCompleted: boolean) => {
    const updatedItems = [...selectedItems];
    const updatedItem = { ...updatedItems[index], is_completed: isCompleted };

    try {
      await updateChecklistItem({ id: updatedItem.id, is_completed: isCompleted }).unwrap();
      updatedItems[index] = updatedItem;
      setSelectedItems(updatedItems);
    } catch (error) {
      console.error("Failed to update checklist item:", error);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const checklistItemIds = selectedItems.map((item) => item.id);
    onSave(checklistName, checklistItemIds);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checklist-modal-title"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 id="checklist-modal-title" className="text-2xl font-semibold mb-4">
          Edit Checklist
        </h2>

        {/* Checklist Name Input */}
        <div className="mb-4">
          <InputField
            label="Checklist Name"
            id="checklistName"
            fieldType="text"
            value={checklistName}
            onChange={(e) => setChecklistName(e.target.value)}
            placeholder="Enter Checklist Name"
          />
        </div>

        {isLoading ? (
          <p>Loading checklist items...</p>
        ) : (
          <>
            <div className="mb-4">
              <label htmlFor="select-checklist-item" className="block mb-2 font-medium">
                Select a Checklist Item
              </label>
              <select
                id="select-checklist-item"
                className="block w-full border py-2 px-3 rounded-md"
                onChange={handleSelectItem}
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Checklist Item
                </option>
                {allChecklistItems?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Checklist Items */}
            <div className="space-y-4">
              {selectedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  <div>
                    <p className="font-medium">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <span className="text-[1vw] text-darkgray-0 font-medium">Completed:</span>
                      <input
                        type="checkbox"
                        className="w-[1vw] h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer"
                        checked={item.is_completed}
                        onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                      />
                    </label>
                    <button
                      type="button"
                      className="text-red-600"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <PurpleButton type="button" text="Save" onClick={handleSave} />
          <WhiteButton type="button" text="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
