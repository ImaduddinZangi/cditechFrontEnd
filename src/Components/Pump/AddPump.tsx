import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../redux/api/pumpBrandApi";

interface AddPumpProps {
  onSubmit: (
    assetId: string,
    brandId: string,
    serial: string,
    warranty: string,
    installedDate: string,
    avgAmps: number,
    maxAmps: number,
    hp: number
  ) => void;
}

const AddPump: React.FC<AddPumpProps> = ({ onSubmit }) => {
  const { data: assets } = useGetAssetsQuery();
  const { data: pumpBrands } = useGetPumpBrandsQuery();

  const [formState, setFormState] = useState({
    assetId: "",
    brandId: "",
    serial: "",
    warranty: "1 Year",
    installedDate: "",
    avgAmps: 0,
    maxAmps: 0,
    hp: 0,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "avgAmps" || name === "maxAmps" || name === "hp" ? Number(value) : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      formState.assetId,
      formState.brandId,
      formState.serial,
      formState.warranty,
      formState.installedDate,
      formState.avgAmps,
      formState.maxAmps,
      formState.hp
    );
  };

  const handleCancel = () => {
    navigate("/client-dashboard");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Pump</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Brand:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name="brandId"
                value={formState.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Select Brand</option>
                {pumpBrands?.map((pumpBrand: any) => (
                  <option key={pumpBrand.id} value={pumpBrand.id}>
                    {pumpBrand.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Asset:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                name="assetId"
                value={formState.assetId}
                onChange={handleChange}
                required
              >
                <option value="">Select Asset</option>
                {assets?.map((asset: any) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">AVG-Amps:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter number of AVG-Amps"
                name="avgAmps"
                value={formState.avgAmps}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Max-Amps:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter number of pump"
                name="maxAmps"
                value={formState.maxAmps}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">HP:</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter number of HP"
                name="hp"
                value={formState.hp}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Serial:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter serial"
                name="serial"
                value={formState.serial}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Warranty:</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
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
            <div>
              <label className="block mb-1 font-medium">Installed Date:</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md"
                name="installedDate"
                value={formState.installedDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-0 text-white rounded-md"
            >
              Save & Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPump;
