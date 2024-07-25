import React, { useState } from "react";

interface AddPumpBrandProps {
  onSubmit: (name: string, model: string, phone: string, address: string, madeInUsa: boolean) => void;
}

const AddPumpBrand: React.FC<AddPumpBrandProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [madeInUsa, setMadeInUsa] = useState(true);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, model, phone, address, madeInUsa);
  };

  return (
    <div className="max-w-4xl mx-auto p-[1.5vw] bg-white rounded-[0.5vw] shadow-[1vw]">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0">Brand Name:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter pump brand name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0">Model:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter model"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0">Phone No:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter phone no"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0">Address:</label>
          <input
            type="text"
            className="mt-[0.2vw] block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[1vw]">
          <label className="block text-darkgray-0">Made In USA:</label>
          <input
            type="checkbox"
            className="mt-[0.2vw] block border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={madeInUsa}
            onChange={(e) => setMadeInUsa(e.target.checked)}
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

export default AddPumpBrand;
