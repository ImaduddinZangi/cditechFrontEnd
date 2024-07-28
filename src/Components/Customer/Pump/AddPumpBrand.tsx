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
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw] relative pb-[4vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Brand Name:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter pump brand name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Model:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter model"
            required
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Phone No:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter phone no"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">Address:</label>
          <input
            type="text"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <label className="block text-darkgray-0 font-medium text-[1vw]">Made In USA:</label>
          <input
            type="checkbox"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={madeInUsa}
            onChange={(e) => setMadeInUsa(e.target.checked)}
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

export default AddPumpBrand;
