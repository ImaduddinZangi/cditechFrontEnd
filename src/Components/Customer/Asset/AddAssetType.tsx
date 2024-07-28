import React, { useState } from "react";

interface AddAssetTypeProps {
  onSubmit: (name: string, description: string) => void;
}

const AddAssetType: React.FC<AddAssetTypeProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, description);
  };
  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw] relative pb-[5vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Asset Type Name:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter asset type name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Description:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] absolute bottom-0 right-0"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddAssetType;
