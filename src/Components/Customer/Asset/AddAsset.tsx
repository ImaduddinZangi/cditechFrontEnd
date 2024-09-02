import React, { useState, useRef, useEffect } from "react";
import { getUserId } from "../../../utils/utils";
import { useGetAssetTypesQuery } from "../../../redux/api/assetTypeApi";
import { useGetCustomersQuery } from "../../../redux/api/customerApi";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Select from "react-select";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import Loader from "../../Constants/Loader";
import { useNavigate } from "react-router-dom";

interface InitialData {
  name?: string;
  type?: { id: string; name: string };
  customer?: { id: string; name: string };
  location?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  status?: string;
  inspectionInterval?: string;
  qrCode?: string;
  nfcCode?: string;
  pipeDia?: number;
  smart?: string;
  size?: string;
  material?: string;
  deleteProtect?: string;
  duty?: string;
  rails?: string;
  float?: number;
  pumps?: number;
}

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
  initialData?: Partial<InitialData>;
}

const libraries: ("places" | "drawing")[] = ["places"];

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit, initialData }) => {
  const [customers, setCustomers] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [assetType, setAssetType] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedAssetType, setSelectedAssetType] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const clientId = getUserId();
  const navigate = useNavigate();
  const { data: assetTypeData } = useGetAssetTypesQuery();
  const { data: customersData } = useGetCustomersQuery();

  const [formState, setFormState] = useState({
    name: initialData?.name || "",
    type: initialData?.type?.id || "",
    customerId: initialData?.customer?.id || "",
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

  const handleCustomerChange = (selectedOption: any) => {
    setSelectedCustomer(selectedOption);
    setFormState((prevState) => ({
      ...prevState,
      customerId: selectedOption?.value || "",
    }));
  };

  const handleAssetTypeChange = (selectedOption: any) => {
    setSelectedAssetType(selectedOption);
    setFormState((prevState) => ({
      ...prevState,
      type: selectedOption?.value || "",
    }));
  };

  useEffect(() => {
    if (customersData) {
      setCustomers(
        customersData.map((customer) => ({
          label: customer.name,
          value: customer.id,
        }))
      );
    }
  }, [customersData]);

  useEffect(() => {
    if (assetTypeData) {
      setAssetType(
        assetTypeData.map((assetType) => ({
          label: assetType.name,
          value: assetType.id,
        }))
      );
    }
  }, [assetTypeData]);

  useEffect(() => {
    if (initialData && customers.length > 0) {
      const selectedCustomerData = customers.find(
        (c) => c.value === initialData.customer?.id
      );
      setSelectedCustomer(selectedCustomerData || null);
      setFormState((prevState) => ({
        ...prevState,
        customerId: initialData.customer?.id || "",
      }));
    }
  }, [initialData, customers]);

  useEffect(() => {
    if (initialData && assetType.length > 0) {
      const selectedAssetTypeData = assetType.find(
        (a) => a.value === initialData.type?.id
      );
      setSelectedAssetType(selectedAssetTypeData || null);
      setFormState((prevState) => ({
        ...prevState,
        type: initialData.type?.id || "",
      }));
    }
  }, [initialData, assetType]);

  const handleCancel = () => {
    navigate("/customer-table");
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
  if (!isLoaded)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1vw] relative pb-[5vw]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Customer:
          </label>
          <Select
            id="customer"
            options={customers}
            placeholder="Search"
            className="mt-1"
            isClearable
            value={selectedCustomer}
            onChange={handleCustomerChange}
            required
          />
        </div>
        <div>
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Asset Type:
          </label>
          <Select
            id="type"
            options={assetType}
            placeholder="Search"
            className="mt-1"
            isClearable
            value={selectedAssetType}
            onChange={handleAssetTypeChange}
            required
          />
        </div>
        <div>
          <InputField
            label="Asset Name"
            name="name"
            fieldType="text"
            value={formState.name}
            placeholder="Enter asset name"
            onChange={handleChange}
          />
        </div>
        <div>
          {isLoaded && (
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <InputField
                ref={inputRef}
                label="Location"
                name="location"
                fieldType="text"
                value={formState.location}
                placeholder="Enter asset location"
                onChange={handleChange}
              />
            </Autocomplete>
          )}
        </div>
        <div>
          <InputField
            label="Description"
            name="description"
            fieldType="text"
            value={formState.description}
            placeholder="Enter description"
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
          <InputField
            label="QR Code"
            name="qrCode"
            fieldType="text"
            value={formState.qrCode}
            placeholder="Enter QR code"
            onChange={handleChange}
          />
        </div>
        <div>
          <InputField
            label="NFC Code"
            name="nfcCode"
            fieldType="text"
            value={formState.nfcCode}
            placeholder="Enter NFC code"
            onChange={handleChange}
          />
        </div>
        <div>
          <InputField
            label="Pipe Diameter"
            name="pipeDia"
            fieldType="number"
            value={formState.pipeDia}
            placeholder="Enter pipe diameter"
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
          <InputField
            label="Duty"
            name="duty"
            fieldType="text"
            value={formState.duty}
            placeholder="Enter duty"
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
          <InputField
            label="Float"
            name="float"
            fieldType="number"
            value={formState.float}
            placeholder="Enter float"
            onChange={handleChange}
          />
        </div>
        <div>
          <InputField
            label="Pumps"
            name="pumps"
            fieldType="number"
            value={formState.pumps}
            placeholder="Enter pumps"
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2 absolute bottom-0 right-0 flex justify-end space-x-[1vw]">
          <PurpleButton type="submit" text="Save" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
