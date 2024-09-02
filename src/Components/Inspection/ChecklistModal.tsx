import React, { useState, useEffect } from "react";
import {
  useGetChecklistItemsQuery,
  useUpdateChecklistItemMutation,
} from "../../redux/api/checkListItemApi";
import { ChecklistItem } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (checklistItemIds: string[]) => void;
  initialChecklistItemIds?: string[];
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialChecklistItemIds = [],
}) => {
  const { data: allChecklistItems } = useGetChecklistItemsQuery();
  const [selectedItems, setSelectedItems] = useState<ChecklistItem[]>([]);
  const [updateChecklistItem] = useUpdateChecklistItemMutation();

  useEffect(() => {
    if (allChecklistItems && initialChecklistItemIds.length > 0) {
      const initialItems = allChecklistItems.filter((item) =>
        initialChecklistItemIds.includes(item.id)
      );
      setSelectedItems(initialItems);
    }
  }, [allChecklistItems, initialChecklistItemIds]);

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = allChecklistItems?.find(
      (item) => item.id === e.target.value
    );
    if (
      selectedItem &&
      !selectedItems.find((item) => item.id === selectedItem.id)
    ) {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleCheckboxChange = async (index: number, isCompleted: boolean) => {
    const updatedItems = [...selectedItems];
    const updatedItem = {
      ...updatedItems[index],
      is_completed: isCompleted,
    };

    try {
      // Update the item in the backend
      await updateChecklistItem({
        id: updatedItem.id,
        is_completed: isCompleted,
      }).unwrap();
      updatedItems[index] = updatedItem;
      setSelectedItems(updatedItems);
    } catch (error) {
      console.error("Failed to update checklist item:", error);
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  const handleSave = () => {
    const checklistItemIds = selectedItems.map((item) => item.id);
    onSave(checklistItemIds);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Edit Checklist</h2>
        <form>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <select
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              onChange={handleSelectItem}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Checklist Item
              </option>
              {allChecklistItems?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.description}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {selectedItems.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-row items-center justify-between space-x-4"
              >
                <div className="flex flex-row items-center space-x-[1vw]">
                  <label className="block mb-1 font-medium">Description:</label>
                  <p className="font-medium">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="block mb-1 font-medium">Completed:</label>
                  <input
                    type="checkbox"
                    className="w-[1vw] h-[1vw] accent-purple-0"
                    checked={item.is_completed}
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />
                </div>
                <button
                  type="button"
                  className="bg-red-600 text-white py-[0.5vw] px-[1vw] rounded-[0.4vw] text-[1vw] font-inter font-medium"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </form>
        <div className="mt-[1vw] flex justify-end space-x-[1vw]">
          <PurpleButton type="button" text="Save" onClick={handleSave} />
          <WhiteButton type="button" text="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
