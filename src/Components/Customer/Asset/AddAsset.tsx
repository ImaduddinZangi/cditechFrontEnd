import React, { useState, useRef } from "react";
import { getUserId } from "../../../utils/utils";
import { useGetAssetTypesQuery } from "../../../redux/api/assetTypeApi";
import { useGetCustomersQuery } from "../../../redux/api/customerApi";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { Customer } from "../../../redux/features/customerSlice";
import { AssetType } from "../../../redux/features/assetTypeSlice";

interface AddAssetProps {
  onSubmit: (
    name: string,
    type: string,
    customerId: string,
    clientId: string | undefined,
    location: string,
    latitude: number,
    longitude: number,
    description: string,
    status: string,
    inspectionInterval: string,
    qrCode: string,
    nfcCode: string,
    pipeDia: number,
    smart: string,
    size: string,
    material: string,
    deleteProtect: string,
    duty: string,
    rails: string,
    float: number,
    pumps: number
  ) => void;
  initialData?: Partial<{
    name: string;
    type: string;
    customerId: string;
    location: string;
    latitude: number;
    longitude: number;
    description: string;
    status: string;
    inspectionInterval: string;
    qrCode: string;
    nfcCode: string;
    pipeDia: number;
    smart: string;
    size: string;
    material: string;
    deleteProtect: string;
    duty: string;
    rails: string;
    float: number;
    pumps: number;
  }>;
}

const libraries: ("places" | "drawing")[] = ["places"];

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit, initialData }) => {
  const clientId = getUserId();
  const { data: assetTypes } = useGetAssetTypesQuery();
  const { data: customers } = useGetCustomersQuery();

  const [formState, setFormState] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    customerId: initialData?.customerId || "",
    location: initialData?.location || "",
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    description: initialData?.description || "",
    status: initialData?.status || "active",
    inspectionInterval: initialData?.inspectionInterval || "Monthly",
    qrCode: initialData?.qrCode || "",
    nfcCode: initialData?.nfcCode || "",
    pipeDia: initialData?.pipeDia || 0,
    smart: initialData?.smart || "No",
    size: initialData?.size || "Medium",
    material: initialData?.material || "Concrete",
    deleteProtect: initialData?.deleteProtect || "No",
    duty: initialData?.duty || "",
    rails: initialData?.rails || "No",
    float: initialData?.float || 0,
    pumps: initialData?.pumps || 0,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        setFormState({
          ...formState,
          location: place.formatted_address || "",
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      formState.name,
      formState.type,
      formState.customerId,
      clientId ?? undefined,
      formState.location,
      formState.latitude,
      formState.longitude,
      formState.description,
      formState.status,
      formState.inspectionInterval,
      formState.qrCode,
      formState.nfcCode,
      formState.pipeDia,
      formState.smart,
      formState.size,
      formState.material,
      formState.deleteProtect,
      formState.duty,
      formState.rails,
      formState.float,
      formState.pumps
    );
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1vw] relative pb-[5vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Customer:
          </label>
          <select
            name="customerId"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.customerId}
            onChange={handleChange}
          >
            <option value="">Select customer</option>
            {customers?.map((customer: Customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Asset Type:
          </label>
          <select
            name="type"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.type}
            onChange={handleChange}
          >
            {assetTypes?.map((assetType: AssetType) => (
              <option key={assetType.id} value={assetType.id}>
                {assetType.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Asset Name:
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter asset name"
            value={formState.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Location:
          </label>
          {isLoaded && (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <input
                ref={inputRef}
                type="text"
                name="location"
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                placeholder="Enter asset location"
                value={formState.location}
                onChange={handleChange}
              />
            </Autocomplete>
          )}
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Description:
          </label>
          <input
            type="text"
            name="description"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter description"
            value={formState.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Status:
          </label>
          <select
            name="status"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Inspection Interval:
          </label>
          <select
            name="inspectionInterval"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.inspectionInterval}
            onChange={handleChange}
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            QR Code:
          </label>
          <input
            type="text"
            name="qrCode"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter QR code"
            value={formState.qrCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            NFC Code:
          </label>
          <input
            type="text"
            name="nfcCode"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter NFC code"
            value={formState.nfcCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Pipe Diameter:
          </label>
          <input
            type="number"
            name="pipeDia"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter pipe diameter"
            value={formState.pipeDia}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Smart:
          </label>
          <select
            name="smart"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.smart}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Size:
          </label>
          <select
            name="size"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="XLarge">Xlarge</option>
            <option value="XXLarge">XXLarge</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Material:
          </label>
          <select
            name="material"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.material}
            onChange={handleChange}
          >
            <option value="Concrete">Concrete</option>
            <option value="Cement">Cement</option>
            <option value="Brass">Brass</option>
            <option value="Iron">Iron</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Delete Protect:
          </label>
          <select
            name="deleteProtect"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.deleteProtect}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Duty:
          </label>
          <input
            type="text"
            name="duty"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter duty"
            value={formState.duty}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Rails:
          </label>
          <select
            name="rails"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={formState.rails}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Float:
          </label>
          <input
            type="number"
            name="float"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter float"
            value={formState.float}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Pumps:
          </label>
          <input
            type="number"
            name="pumps"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            placeholder="Enter pumps"
            value={formState.pumps}
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 absolute bottom-0 right-0 flex justify-end space-x-[1vw]">
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
            Do Not Save & Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
