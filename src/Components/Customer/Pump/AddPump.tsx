import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAssetsQuery } from "../../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../../redux/api/pumpBrandApi";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import { Asset } from "../../../redux/features/assetSlice";
import InputField from "../../Tags/InputField";
import WhiteButton from "../../Tags/WhiteButton";
import PurpleButton from "../../Tags/PurpleButton";

interface AddPumpProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (
    assetId: string,
    name: string,
    brandId: string,
    serial: string,
    warranty: string,
    installedDate: string,
    avgAmps: number,
    maxAmps: number,
    hp: number
  ) => void;
  initialData?: {
    assetId: string;
    brandId: string;
    serial: string;
    name: string;
    warranty: string;
    installedDate: string;
    avgAmps: number;
    maxAmps: number;
    hp: number;
  } | null;
  isEditing?: boolean;
}

const AddPump: React.FC<AddPumpProps> = ({
  isModalOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}) => {
  const { data: assets } = useGetAssetsQuery();
  const { data: pumpBrands } = useGetPumpBrandsQuery();

  const [formState, setFormState] = useState({
    assetId: "",
    brandId: "",
    serial: "",
    name: "",
    warranty: "1 Year",
    installedDate: "",
    avgAmps: 0,
    maxAmps: 0,
    hp: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormState(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]:
        name === "avgAmps" || name === "maxAmps" || name === "hp"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      formState.assetId,
      formState.name,
      formState.brandId,
      formState.serial,
      formState.warranty,
      formState.installedDate,
      formState.avgAmps,
      formState.maxAmps,
      formState.hp
    );
    onClose();
  };

  const handleCancel = () => {
    onClose();
    navigate("/asset-pumps");
  };

  useEffect(() => {
    if (!isModalOpen) {
      setFormState({
        assetId: "",
        brandId: "",
        serial: "",
        name: "",
        warranty: "1 Year",
        installedDate: "",
        avgAmps: 0,
        maxAmps: 0,
        hp: 0,
      });
    }
  }, [isModalOpen]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <p className="text-[1.2vw] font-semibold mb-[1vw]">
          {isEditing ? "Edit Pump" : "Add New Pump"}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-[1vw]">
            <InputField
              label="Pump Name"
              name="name"
              fieldType="text"
              value={formState.name}
              placeholder="Enter name of pump"
              onChange={handleChange}
              required
            />
            <div>
              <label className="block mb-1 font-medium">Brand:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="brandId"
                value={formState.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                {pumpBrands?.map((pumpBrand: PumpBrand) => (
                  <option key={pumpBrand.id} value={pumpBrand.id}>
                    {pumpBrand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Asset:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="assetId"
                value={formState.assetId}
                onChange={handleChange}
                required
              >
                <option value="">Select Asset</option>
                {assets?.map((asset: Asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
            <InputField
              label="AVG-Amps"
              name="avgAmps"
              fieldType="number"
              value={formState.avgAmps}
              placeholder="Enter number of AVG-Amps"
              onChange={handleChange}
              required
            />
            <InputField
              label="Max-Amps"
              name="maxAmps"
              fieldType="number"
              value={formState.maxAmps}
              placeholder="Enter number of Max-Amps"
              onChange={handleChange}
              required
            />
            <InputField
              label="HP"
              name="hp"
              fieldType="number"
              value={formState.hp}
              placeholder="Enter number of HP"
              onChange={handleChange}
              required
            />
            <InputField
              label="Serial"
              name="serial"
              fieldType="text"
              value={formState.serial}
              placeholder="Enter serial"
              onChange={handleChange}
              required
            />
            <div>
              <label className="block mb-1 font-medium">Warranty:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="warranty"
                value={formState.warranty}
                onChange={handleChange}
                required
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
              </select>
            </div>
            <InputField
              label="Installed Date"
              name="installedDate"
              fieldType="date"
              value={formState.installedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mt-[1vw] flex justify-end">
            <PurpleButton
              text={isEditing ? "Save Changes" : "Save"}
              type="submit"
              className="mr-[1vw]"
            />
            <WhiteButton text="Cancel" type="button" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPump;
