import React, { useState } from "react";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";

interface AddPumpBrandProps {
  onSubmit: (data: PumpBrand) => void;
  initialData?: Partial<PumpBrand>;
}

const AddPumpBrand: React.FC<AddPumpBrandProps> = ({
  onSubmit,
  initialData,
}) => {
  const splitAddress = (address: string | undefined) => {
    if (!address)
      return { streetAddress: "", city: "", state: "", zipcode: "" };

    const parts = address.split(", ");
    return {
      streetAddress: parts[0] || "",
      city: parts[1] || "",
      state: parts[2] || "",
      zipcode: parts[3] || "",
    };
  };

  const [name, setName] = useState<string>(initialData?.name || "");
  const [model, setModel] = useState<string>(initialData?.model || "");
  const [website, setWebsite] = useState<string>(initialData?.website || "");
  const [phone, setPhone] = useState<string>(initialData?.phone || "");
  const [logoUrl, setLogoUrl] = useState<string>(initialData?.logoUrl || "");

  const {
    streetAddress: initialStreet,
    city: initialCity,
    state: initialState,
    zipcode: initialZip,
  } = splitAddress(initialData?.address);

  const [streetAddress, setStreetAddress] = useState<string>(initialStreet);
  const [city, setCity] = useState<string>(initialCity);
  const [state, setState] = useState<string>(initialState);
  const [zipcode, setZipcode] = useState<string>(initialZip);
  const [madeInUsa, setMadeInUsa] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const address = `${streetAddress}, ${city}, ${state}, ${zipcode}`;
    onSubmit({
      id: initialData?.id,
      name,
      model,
      website,
      phone,
      address,
      // madeInUsa,
    });
  };

  const handleCancel = () => {
    navigate("/pump-brands-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-2 gap-[1vw] relative"
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
          label="Brand Model"
          name="model"
          fieldType="text"
          value={model}
          placeholder="Enter model"
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <InputField
          label="Brand Website"
          name="website"
          fieldType="text"
          value={website}
          placeholder="https://www.brandwebsite.com"
          onChange={(e) => setWebsite(e.target.value)}
          required
        />

        <InputField
          label="Brand Phone Number"
          name="phone"
          fieldType="text"
          value={phone}
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <InputField
          label="Street Address"
          name="streetAddress"
          fieldType="text"
          value={streetAddress}
          placeholder="Enter street address"
          onChange={(e) => setStreetAddress(e.target.value)}
          required
        />
        <InputField
          label="City"
          name="city"
          fieldType="text"
          value={city}
          placeholder="Select City"
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <InputField
          label="State"
          name="state"
          fieldType="text"
          value={state}
          placeholder="Select State"
          onChange={(e) => setState(e.target.value)}
          required
        />
        <InputField
          label="Zipcode"
          name="zipcode"
          fieldType="text"
          value={zipcode}
          placeholder="Enter Zip Code"
          onChange={(e) => setZipcode(e.target.value)}
          required
        />
        <InputField
          label="Logo Url"
          name="logoUrl"
          fieldType="text"
          value={logoUrl}
          placeholder="Enter Logo Url"
          onChange={(e) => setLogoUrl(e.target.value)}
          required
        />
        <div className="flex flex-row items-center gap-x-[1vw] mt-[3.6vh]">
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
        <div className="mt-[1vw] flex justify-end col-span-2">
          <PurpleButton
            type="submit"
            text="Save & Close"
            className="mr-[1vw]"
          />
          <WhiteButton
            type="button"
            text="Do Not Save & Cancel"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPumpBrand;
