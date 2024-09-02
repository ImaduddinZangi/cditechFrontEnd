import React, { useState } from "react";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";

interface AddAssetTypeProps {
  onSubmit: (name: string, description: string) => void;
}

const AddAssetType: React.FC<AddAssetTypeProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(name, description);
  };

  const handleCancel = () => {
    navigate("customer-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-[1vw] relative pb-[5vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <InputField
            label="Asset Type Name:"
            name="name"
            fieldType="text"
            value={name}
            placeholder="Enter asset type name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <InputField
            label="Description:"
            name="description"
            fieldType="text"
            value={description}
            placeholder="Enter description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <PurpleButton type="submit" text="Create" />
        <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
      </form>
    </div>
  );
};

export default AddAssetType;
