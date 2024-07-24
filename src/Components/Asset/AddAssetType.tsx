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
    <div className="max-w-4xl mx-auto p-[1.5vw] bg-white rounded-[0.5vw] shadow-[1vw]">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0">Asset Type Name:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter asset type name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0">Description:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-md shadow-sm"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddAssetType;
