import React, { useEffect, useState } from "react";
import { useGetPumpBrandsQuery } from "../../../redux/api/pumpBrandApi";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import { Pump } from "../../../redux/features/pumpSlice";
import InputField from "../../Tags/InputField";
import SelectField, { Option } from "../../Tags/SelectField";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import AddPhotos from "../AddPhotos";

const warrantyOptions = [
  { label: "1 Year", value: "1 Year" },
  { label: "2 Year", value: "2 Year" },
  { label: "3 Year", value: "3 Year" },
];

interface AddPumpProps {
  onChange: (data: Pump) => void;
  initialData?: Partial<Pump>;
}

const AddPump: React.FC<AddPumpProps> = ({ onChange, initialData }) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [brandId, setBrandId] = useState<string>(initialData?.brand?.id || "");
  const [serial, setSerial] = useState<string>(initialData?.serial || "");
  const [avgAmps, setAvgAmps] = useState<string>(initialData?.avgAmps || "");
  const [maxAmps, setMaxAmps] = useState<string>(initialData?.maxAmps || "");
  const [hp, setHp] = useState<string>(initialData?.hp || "");
  const [photos, setPhotos] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [warranty, setWarranty] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [installedDate, setInstalledDate] = useState<string>(
    initialData?.installedDate || ""
  );
  const { data: pumpBrands } = useGetPumpBrandsQuery();

  const handlePhotosSubmit = (uploadedPhotos: File[]) => {
    setPhotos(uploadedPhotos);
    handleCloseModal();
  };

  useEffect(() => {
    const pumpData: Pump = {
      name,
      brandId,
      serial,
      avgAmps,
      maxAmps,
      hp,
      warranty: warranty?.value || "",
      installedDate,
      photos,
    };
    onChange(pumpData);
  }, [
    name,
    brandId,
    serial,
    avgAmps,
    maxAmps,
    hp,
    warranty,
    installedDate,
    photos,
  ]);

  return (
    <div className="grid grid-cols-2 gap-[1vw]">
      <InputField
        label="Pump Name"
        name="name"
        fieldType="text"
        value={name}
        placeholder="Enter name of pump"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div>
        <label className="block text-darkgray-0 font-medium text-[1vw]">
          Brand:
        </label>
        <select
          className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
          name="brandId"
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
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
      <InputField
        label="AVG-Amps"
        name="avgAmps"
        fieldType="number"
        value={avgAmps}
        placeholder="Enter number of AVG-Amps"
        onChange={(e) => setAvgAmps(e.target.value)}
        required
      />
      <InputField
        label="Max-Amps"
        name="maxAmps"
        fieldType="number"
        value={maxAmps}
        placeholder="Enter number of Max-Amps"
        onChange={(e) => setMaxAmps(e.target.value)}
        required
      />
      <InputField
        label="HP"
        name="hp"
        fieldType="number"
        value={hp}
        placeholder="Enter number of HP"
        onChange={(e) => setHp(e.target.value)}
        required
      />
      <InputField
        label="Serial"
        name="serial"
        fieldType="text"
        value={serial}
        placeholder="Enter serial"
        onChange={(e) => setSerial(e.target.value)}
        required
      />
      <div>
        <SelectField
          label="Warranty:"
          name="warranty"
          value={warranty}
          onChange={(option) => setWarranty(option)}
          options={warrantyOptions}
          required
        />
      </div>
      <InputField
        label="Installed Date"
        name="installedDate"
        fieldType="date"
        value={installedDate}
        onChange={(e) => setInstalledDate(e.target.value)}
        required
      />
      <OutlinePurpleButton onClick={handleOpenModal} text="Upload Photos" />
      {isModalOpen && (
        <AddPhotos
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handlePhotosSubmit}
          type="Pump"
        />
      )}
    </div>
  );
};

export default AddPump;
