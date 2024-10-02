import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAssetsQuery } from "../../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../../redux/api/pumpBrandApi";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import { Asset } from "../../../redux/features/assetSlice";
import { Pump } from "../../../redux/features/pumpSlice";
import InputField from "../../Tags/InputField";
import WhiteButton from "../../Tags/WhiteButton";
import PurpleButton from "../../Tags/PurpleButton";

interface AddPumpProps {
  isModalOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pump) => void;
  initialData?: Partial<Pump>;
}

const AddPump: React.FC<AddPumpProps> = ({
  isModalOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [assetId, setAssetId] = useState<string>(initialData?.asset?.id || "");
  const [name, setName] = useState<string>(initialData?.name || "");
  const [brandId, setBrandId] = useState<string>(initialData?.brand?.id || "");
  const [serial, setSerial] = useState<string>(initialData?.serial || "");
  const [warranty, setWarranty] = useState<string>(initialData?.warranty || "");
  const [installedDate, setInstalledDate] = useState<string>(
    initialData?.installedDate || ""
  );
  const [avgAmps, setAvgAmps] = useState<string>(initialData?.avgAmps || "");
  const [maxAmps, setMaxAmps] = useState<string>(initialData?.maxAmps || "");
  const [hp, setHp] = useState<string>(initialData?.hp || "");
  const { data: assets } = useGetAssetsQuery();
  const { data: pumpBrands } = useGetPumpBrandsQuery();
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      assetId,
      name,
      brandId,
      serial,
      warranty,
      installedDate,
      avgAmps,
      maxAmps,
      hp,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
    navigate("/manage-customer");
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-[1.5vw]">
        <form onSubmit={handleSubmit}>
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
              <label className="block text-darkgray-0 font-medium text-[1vw]">Brand:</label>
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
            <div>
              <label className="block text-darkgray-0 font-medium text-[1vw]">Asset:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="assetId"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
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
              <label className="block text-darkgray-0 font-medium text-[1vw]">Warranty:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="warranty"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
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
              value={installedDate}
              onChange={(e) => setInstalledDate(e.target.value)}
              required
            />
          </div>
          <div className="mt-[1vw] flex justify-end">
            <PurpleButton text="Save" type="submit" className="mr-[1vw]" />
            <WhiteButton text="Cancel" type="button" onClick={handleCancel} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPump;
