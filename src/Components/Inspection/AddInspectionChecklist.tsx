import React, { useState, useEffect } from "react";
import { ChecklistItem } from "../../redux/features/checkListItemSlice";
import { useGetChecklistItemsQuery } from "../../redux/api/checkListItemApi";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";

interface AddInspectionChecklistProps {
  onSave: (checklistData: { name: string; checklistItemIds: string[] }) => void;
  initialChecklistItemIds?: string[];
  initialChecklistName?: string;
}

const AddInspectionChecklist: React.FC<AddInspectionChecklistProps> = ({
  onSave,
  initialChecklistItemIds = [],
  initialChecklistName = "",
}) => {
  const { data: allChecklistItems, isLoading } = useGetChecklistItemsQuery();
  const [selectedItems, setSelectedItems] = useState<ChecklistItem[]>([]);
  const [checklistName, setChecklistName] = useState<string>("");

  useEffect(() => {
    if (initialChecklistName) {
      setChecklistName(initialChecklistName);
    }
    if (allChecklistItems && initialChecklistItemIds.length > 0) {
      const initialItems = allChecklistItems.filter((item) =>
        initialChecklistItemIds.includes(item.id ?? "")
      );
      setSelectedItems(initialItems);
    }
  }, [allChecklistItems, initialChecklistItemIds, initialChecklistName]);

  const handleSelectItem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = allChecklistItems?.find(
      (item) => item.id === e.target.value
    );
    if (
      selectedItem &&
      !selectedItems.some((item) => item.id === selectedItem.id)
    ) {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const checklistItemIds = selectedItems.map((item) => item.id ?? "");
    onSave({ name: checklistName, checklistItemIds: checklistItemIds });
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <h2
        id="inspection-checklist-title"
        className="text-2xl font-semibold mb-4"
      >
        Edit Inspection Checklist
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
            <label
              htmlFor="select-checklist-item"
              className="block mb-2 font-medium"
            >
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
                <option key={item.id ?? ""} value={item.id ?? ""}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Checklist Items */}
          <div className="space-y-4">
            {selectedItems.map((item, index) => (
              <div
                key={item.id ?? index}
                className="flex justify-between items-center border p-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{item.description}</p>
                </div>
                <PurpleButton
                  text="Remove"
                  className="ml-[1vw]"
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="mt-6 flex justify-end space-x-4">
        <PurpleButton type="button" text="Save" onClick={handleSave} />
        <WhiteButton
          type="button"
          text="Cancel"
          onClick={() => setChecklistName("")}
        />
      </div>
    </div>
  );
};

export default AddInspectionChecklist;
