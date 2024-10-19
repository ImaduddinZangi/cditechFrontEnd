import React, { useState } from "react";
import InputField from "../Tags/InputField";
import { CreateService, Service } from "../../redux/features/serviceSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface AddServiceProps {
  onSubmit: (data: CreateService) => void;
  initialData?: Partial<Service>;
}

const AddService: React.FC<AddServiceProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [price, setPrice] = useState<number>(initialData?.price || 0);
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [isTaxable, setIsTaxable] = useState<boolean>(
    initialData?.isTaxable || false
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      price,
      description,
      isTaxable,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter"
    >
      <div className="grid grid-cols-2 gap-[1vw]">
        <InputField
          label="Service Name"
          fieldType="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Price"
          fieldType="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
        <InputField
          label="Description"
          fieldType="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center mt-[2vw]">
          <span className="mr-[1vw] text-[1vw] font-medium text-darkgray-0">
            Taxable:
          </span>
          <label className="mr-2">
            <input
              type="radio"
              id="reocurringTrue"
              name="reocurring"
              value="yes"
              checked={isTaxable === true}
              onChange={() => setIsTaxable(true)}
              className="mr-1 accent-darkpurple-0"
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="reocurring"
              id="reocurringFalse"
              value="no"
              checked={isTaxable === false}
              onChange={() => setIsTaxable(false)}
              className="mr-1 accent-darkpurple-0"
            />
            No
          </label>
        </div>
        <div className="mt-[1vw] flex justify-end col-span-2">
          <PurpleButton
            type="submit"
            text="Save & Close"
            className="mr-[1vw]"
          />
          <WhiteButton type="button" text="Do Not Save & Close" />
        </div>
      </div>
    </form>
  );
};

export default AddService;
