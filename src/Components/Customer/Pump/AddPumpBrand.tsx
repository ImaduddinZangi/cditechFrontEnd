import React, { useState } from "react";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";

interface AddPumpBrandProps {
  onSubmit: (
    name: string,
    model: string,
    phone: string,
    address: string,
    madeInUsa: boolean
  ) => void;
}

const AddPumpBrand: React.FC<AddPumpBrandProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [madeInUsa, setMadeInUsa] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, model, phone, address, madeInUsa);
  };

  const handleCancel = () => {
    navigate("customer-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw] relative pb-[4vw]"
        onSubmit={handleSubmit}
      >
        <InputField
          label="Brand Name"
          name="name"
          fieldType="text"
          value={name}
          placeholder="Enter pump brand name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Model"
          name="model"
          fieldType="text"
          value={model}
          placeholder="Enter model"
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <InputField
          label="Phone No"
          name="phone"
          fieldType="text"
          value={phone}
          placeholder="Enter phone no"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <InputField
          label="Address"
          name="address"
          fieldType="text"
          value={address}
          placeholder="Enter Address"
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Made In USA:
          </label>
          <input
            type="checkbox"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={madeInUsa}
            onChange={(e) => setMadeInUsa(e.target.checked)}
          />
        </div>
        <div className="mt-[1vw] flex justify-end">
          <PurpleButton type="submit" text="Create" className="mr-[1vw]" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddPumpBrand;
