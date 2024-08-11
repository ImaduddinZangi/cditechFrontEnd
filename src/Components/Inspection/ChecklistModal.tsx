import React, { useState } from "react";

interface ChecklistItem {
  name: string;
  description: string;
  is_completed: boolean;
}

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (checklist: ChecklistItem[]) => void;
}

const ChecklistModal: React.FC<ChecklistModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { name: "", description: "", is_completed: false },
  ]);

  const handleChange = (index: number, field: keyof ChecklistItem, value: string | boolean) => {
    const newChecklist = [...checklist];
    newChecklist[index] = {
      ...newChecklist[index],
      [field]: value,
    };
    setChecklist(newChecklist);
  };

  const handleAddItem = () => {
    setChecklist([...checklist, { name: "", description: "", is_completed: false }]);
  };

  const handleRemoveItem = (index: number) => {
    const newChecklist = checklist.filter((_, i) => i !== index);
    setChecklist(newChecklist);
  };

  const handleSave = () => {
    onSave(checklist);
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
          <div className="grid grid-cols-1 gap-4">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between space-x-4"
              >
                <div className="flex flex-row items-center space-x-[1vw]">
                  <label className="block mb-1 font-medium">Description:</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                    value={item.description}
                    onChange={(e) =>
                      handleChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="block mb-1 font-medium">Completed:</label>
                  <input
                    type="checkbox"
                    className="w-[1vw] h-[1vw] accent-purple-0"
                    checked={item.is_completed}
                    onChange={(e) =>
                      handleChange(index, "is_completed", e.target.checked)
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
          <button
            type="button"
            className="mt-[2vw] px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw]"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </form>
        <div className="mt-[1vw] flex justify-end space-x-[1vw]">
          <button
            type="button"
            className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;
