import React, { useState, useEffect } from "react";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../redux/api/pumpBrandApi";
import { useGetPumpsQuery } from "../../redux/api/pumpApi";
import { toast, ToastContainer } from "react-toastify";

interface AddPhotosProps {
  onSubmit: (files: File[], id: string, type: string) => void;
}

const AddPhotos: React.FC<AddPhotosProps> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);
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
    const files = Array.from(event.target.files || []);
    if (files.length > 4) {
      toast.error("You can only upload up to 4 images.");
      return;
    }

    const isValid = await Promise.all(files.map(validateFile));
    if (isValid.every(Boolean)) {
      setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    } else {
      toast.error(
        "Invalid file type or size. Please upload images with max. 800x400px size."
      );
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
    if (photos.length > 0 && selectedId) {
      onSubmit(photos, selectedId, selectedType);
    } else {
      if (photos.length === 0) {
        toast.error("Please upload at least one photo.");
      }
      if (!selectedId) {
        toast.error("Please select an ID.");
      }
      if (!selectedType) {
        toast.error("Please select a type.");
      }
    }
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
    setSelectedId(null);
  };

  const handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(event.target.value);
  };

  const getSelectedTypeOptions = () => {
    switch (selectedType) {
      case "asset":
        return assets;
      case "pump":
        return pumps;
      case "pumpBrand":
        return pumpBrands;
      default:
        return [];
    }
  };

  const optionsAvailable = getSelectedTypeOptions().length > 0;

  return (
    <form
      className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter"
      onSubmit={handleSave}
    >
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Select Type:
          </label>
          <select
            name="type"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              {selectedType === "asset"
                ? "Asset:"
                : selectedType === "pump"
                ? "Pump:"
                : "Pump Brand:"}
            </label>
            <select
              name={selectedType}
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              onChange={handleIdChange}
              value={selectedId || ""}
            >
              {getSelectedTypeOptions()?.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="border rounded-lg p-4 relative mb-4">
        <h3 className="text-lg font-medium mb-4">Photos</h3>
        <div className="flex flex-col space-y-4">
          {[...Array(4)].map((_, index) => (
            <label
              key={index}
              className={`bg-purple-200 text-purple-700 py-2 px-4 rounded-lg flex items-center justify-center cursor-pointer ${
                !optionsAvailable ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type="file"
                accept=".svg,.png,.jpg,.jpeg,.gif"
                className="hidden"
                multiple
                onChange={handleFileChange}
                disabled={!optionsAvailable}
              />
              <span className="ml-[0.2vw] text-[1vw] font-semibold text-darkgray-0">
                Click to upload photo {index + 1}
              </span>
            </label>
          ))}
          <p className="text-gray-0 text-center text-[0.9vw]">
            SVG, PNG, JPG or GIF (max. 800x400px each)
          </p>
          {photos.length > 0 && (
            <ul className="text-center text-green-500">
              {photos.map((photo, index) => (
                <li key={index}>{photo.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-center space-x-[1vw] mt-[2vw]">
        <button
          type="submit"
          className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw]"
        >
          Save & Close
        </button>
        <button
          type="button"
          className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw]"
        >
          Do Not Save And Close
        </button>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </form>
  );
};

export default AddPhotos;
