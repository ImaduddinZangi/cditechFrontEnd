import React, { useState, useEffect } from "react";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../redux/api/pumpBrandApi";
import { useGetPumpsQuery } from "../../redux/api/pumpApi";

interface AddPhotosProps {
  onSubmit: (file: File, id: string, type: string) => void;
}

const AddPhotos: React.FC<AddPhotosProps> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [assets, setAssets] = useState<any[]>([]);
  const [pumpBrands, setPumpBrands] = useState<any[]>([]);
  const [pumps, setPumps] = useState<any[]>([]);
  const { data: assetsData } = useGetAssetsQuery();
  const { data: pumpBrandsData } = useGetPumpBrandsQuery();
  const { data: pumpsData } = useGetPumpsQuery();

  useEffect(() => {
    if (assetsData) {
      setAssets(assetsData);
    }
  }, [assetsData]);

  useEffect(() => {
    if (pumpBrandsData) {
      setPumpBrands(pumpBrandsData);
    }
  }, [pumpBrandsData]);

  useEffect(() => {
    if (pumpsData) {
      setPumps(pumpsData);
    }
  }, [pumpsData]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const isValid = await validateFile(file);
      if (isValid) {
        setPhoto(file);
      } else {
        alert(
          "Invalid file type or size. Please upload an image with max. 800x400px size."
        );
      }
    }
  };

  const validateFile = (file: File): Promise<boolean> => {
    const validTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve(
          validTypes.includes(file.type) &&
            img.width <= 800 &&
            img.height <= 400
        );
      };
    });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (photo && selectedId) {
      onSubmit(photo, selectedId, selectedType);
    } else {
      alert("Please select a type and a photo.");
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setSelectedId(null);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(event.target.value);
  };

  return (
    <form
      className="p-[1vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter"
      onSubmit={handleSave}
    >
      <h2 className="text-xl font-semibold mb-6">Add Photos</h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-darkgray-0">Select Type:</label>
          <select
            name="type"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
            onChange={handleTypeChange}
            value={selectedType}
          >
            <option value="">Select Type</option>
            <option value="asset">Asset</option>
            <option value="pump">Pump</option>
            <option value="pumpBrand">Pump Brand</option>
          </select>
        </div>
        {selectedType && (
          <div>
            <label className="block text-darkgray-0">
              {selectedType === "asset"
                ? "Asset:"
                : selectedType === "pump"
                ? "Pump:"
                : "Pump Brand:"}
            </label>
            <select
              name={selectedType}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none"
              onChange={handleIdChange}
              value={selectedId || ""}
            >
              {(selectedType === "asset"
                ? assets
                : selectedType === "pump"
                ? pumps
                : pumpBrands
              )?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="border rounded-lg p-4 relative mb-4">
        <h3 className="text-lg font-medium mb-4">Photo</h3>
        <div className="flex flex-col space-y-4">
          <label className="bg-purple-200 text-purple-700 py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept=".svg,.png,.jpg,.jpeg,.gif"
              className="hidden"
              onChange={handleFileChange}
            />
            <span>📤</span>
            <span className="ml-2">Click to upload asset photo</span>
          </label>
          <p className="text-gray-500 text-center">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </p>
          {photo && (
            <p className="text-center text-green-500">
              Photo uploaded: {photo.name}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          type="submit"
          className="bg-purple-0 text-white py-2 px-6 rounded-lg"
        >
          Save & Close
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg"
        >
          Do Not Save And Close
        </button>
      </div>
    </form>
  );
};

export default AddPhotos;
