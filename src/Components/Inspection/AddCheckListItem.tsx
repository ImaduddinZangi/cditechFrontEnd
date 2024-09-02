import React, { useState } from "react";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface AddCheckListItemProps {
  onSubmit: (data: {
    name: string;
    description: string;
    is_completed: boolean;
  }) => void;
  isOpen: boolean;
  onClose: () => void;
}

const AddCheckListItem: React.FC<AddCheckListItemProps> = ({
  onSubmit,
  onClose,
  isOpen,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [is_completed, setIsComplete] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, description, is_completed });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <form
          className="space-y-[3vw] md:space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div className="mt-[4vw] md:mt-[2vw]">
            <label
              htmlFor="name"
              className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="name"
              required
              className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
            >
              Description
            </label>
            <input
              id="description"
              name="description"
              type="description"
              required
              className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
              placeholder="Enter your description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="block mb-1 font-medium">Completed:</label>
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={is_completed}
              onChange={(e) => setIsComplete(e.target.checked)}
            />
          </div>
          <div className="mt-[1vw] flex justify-end space-x-[1vw]">
            <PurpleButton type="submit" text="Save" />
            <WhiteButton type="button" text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCheckListItem;
