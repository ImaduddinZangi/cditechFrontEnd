import React, { useState, useEffect, useRef } from "react";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetPumpBrandsQuery } from "../../redux/api/pumpBrandApi";
import { useGetPumpsQuery } from "../../redux/api/pumpApi";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { toast, ToastContainer } from "react-toastify";
import { Asset } from "../../redux/features/assetSlice";
import { PumpBrand } from "../../redux/features/pumpBrandSlice";
import { Pump } from "../../redux/features/pumpSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import Webcam from "react-webcam";
import { Customer } from "../../redux/features/customerSlice";
import { GetInspection } from "../../redux/features/inspectionSlice";
import { useGetInspectionsQuery } from "../../redux/api/inspectionApi";

interface AddPhotosProps {
  onSubmit: (files: File[], id: string, type: string) => void;
}

interface Item {
  id?: string;
  name: string;
}

const AddPhotos: React.FC<AddPhotosProps> = ({ onSubmit }) => {
  const [selectedType, setSelectedType] = useState<string>("");
  const [photos, setPhotos] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [pumpBrands, setPumpBrands] = useState<PumpBrand[]>([]);
  const [pumps, setPumps] = useState<Pump[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inspections, setInspections] = useState<GetInspection[]>([]);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
  const [webcamIndex, setWebcamIndex] = useState<number | null>(null);
  const [hasWebcam, setHasWebcam] = useState<boolean>(true);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  const { data: assetsData } = useGetAssetsQuery();
  const { data: pumpBrandsData } = useGetPumpBrandsQuery();
  const { data: pumpsData } = useGetPumpsQuery();
  const { data: customersData } = useGetCustomersQuery();
  const { data: inspectionsData } = useGetInspectionsQuery();

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

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData);
    }
  }, [customersData]);

  useEffect(() => {
    if (inspectionsData) {
      setInspections(inspectionsData);
    }
  }, [inspectionsData]);

  useEffect(() => {
    // Check if the webcam is available
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasWebcam(true))
      .catch(() => setHasWebcam(false));
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const isValid = await validateFile(file);
      if (isValid) {
        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos[index] = file;
          return updatedPhotos;
        });
      } else {
        toast.error(
          "Invalid file type or size. Please upload images with max. 1080x1080px size."
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
            img.width <= 1080 &&
            img.height <= 1080
        );
      };
    });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const validPhotos = photos.filter((photo): photo is File => photo !== null);
    if (validPhotos.length > 0 && selectedId) {
      onSubmit(validPhotos, selectedId, selectedType);
    } else {
      if (validPhotos.length === 0) {
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
      case "customer":
        return customers;
      case "inspection":
        return inspections;
      default:
        return [];
    }
  };

  const optionsAvailable = getSelectedTypeOptions().length > 0;

  const capturePhoto = () => {
    if (webcamRef.current && webcamIndex !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const byteString = atob(imageSrc.split(",")[1]);
        const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], `photo-${webcamIndex + 1}.jpg`, {
          type: mimeString,
        });

        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos[webcamIndex] = file;
          return updatedPhotos;
        });

        setIsWebcamOpen(false);
        setWebcamIndex(null);
      }
    }
  };

  const openWebcam = (index: number) => {
    if (hasWebcam) {
      setWebcamIndex(index);
      setIsWebcamOpen(true);
    } else {
      toast.error("No webcam found on your device.");
    }
  };

  const closeWebcam = () => {
    setIsWebcamOpen(false);
    setWebcamIndex(null);
  };

  const deletePhoto = (index: number) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index] = null;
      return updatedPhotos;
    });
  };

  const handleCancel = () => {
    navigate("/client-dashboard");
  };

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
            <option value="customer">Customer</option>
            <option value="asset">Asset</option>
            <option value="pump">Pump</option>
            <option value="pumpBrand">Pump Brand</option>
            <option value="inspection">Inspection</option>
          </select>
        </div>
        {selectedType && (
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              {selectedType === "customer"
                ? "Customer:"
                : selectedType === "asset"
                ? "Asset:"
                : selectedType === "inspection"
                ? "Inspection"
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
              <option>Select an Option</option>
              {getSelectedTypeOptions()?.map((item: Item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-[1.5vw]">
        {photos.map((_, index) => (
          <div key={index} className="border rounded-lg p-[1vw] relative">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[1.2vw] font-semibold mb-[1vw] font-inter">
                Photo {index + 1}
              </p>
              <button
                type="button"
                className="flex flex-row items-center text-red-500 font-inter font-medium text-[1vw]"
                onClick={() => deletePhoto(index)}
              >
                <RiDeleteBin6Line className="mr-[0.5vw]" /> Delete
              </button>
            </div>
            <div className="flex flex-col space-y-[0.5vw]">
              <button
                type="button"
                className="bg-purple-0 bg-opacity-20 py-[0.5vw] px-[1vw] rounded-lg flex items-center justify-center cursor-pointer border border-purple-0"
                onClick={() => openWebcam(index)}
              >
                <span className="ml-[0.2vw] text-[1vw] font-medium text-purple-0 font-inter">
                  Click to Take asset photo
                </span>
              </button>
              <label className="bg-white py-[0.5vw] px-[1vw] rounded-lg flex items-center justify-center cursor-pointer border border-purple-0">
                <input
                  type="file"
                  accept=".svg,.png,.jpg,.jpeg,.gif"
                  className="hidden"
                  onChange={(event) => handleFileChange(event, index)}
                  disabled={!optionsAvailable}
                />
                <span className="ml-[0.2vw] text-[1vw] font-medium text-purple-0 font-inter">
                  Click to upload asset photo
                </span>
              </label>
              <p className="text-lightgray-0 font-inter text-center text-[0.9vw]">
                SVG, PNG, JPG, JPEG or GIF (max. 1080x1080px each)
              </p>
              {photos[index] && (
                <p className="text-green-500 text-center">
                  {photos[index]!.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-[1vw] mt-[1.5vw]">
        <PurpleButton type="submit" text="Save" />
        <WhiteButton type="button" text="Close" onClick={handleCancel} />
      </div>

      {isWebcamOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
              videoConstraints={{
                width: 1080,
                height: 1080,
                facingMode: "user",
              }}
            />
            <div className="flex justify-end mt-4">
              <PurpleButton
                type="button"
                text="Capture"
                onClick={capturePhoto}
                className="mr-[1vw]"
              />
              <WhiteButton type="button" text="Cancel" onClick={closeWebcam} />
            </div>
          </div>
        </div>
      )}

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
    </form>
  );
};

export default AddPhotos;
