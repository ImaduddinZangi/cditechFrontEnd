import React, { useState, useRef, useEffect } from "react";
import { getUserId } from "../../../utils/utils";
import { useGetAssetTypesQuery } from "../../../redux/api/assetTypeApi";
import { useGetCustomersQuery } from "../../../redux/api/customerApi";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import SelectField from "../../Tags/SelectField";
import Loader from "../../Constants/Loader";
import { useNavigate } from "react-router-dom";
import { Asset, CreateAsset } from "../../../redux/features/assetSlice";

interface Option {
  label: string;
  value: string;
}

interface AddAssetProps {
  onSubmit: (data: CreateAsset) => void;
  initialData?: Partial<Asset>;
}

const statusOptions: Option[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Maintenance", value: "maintenance" },
];

const inspectionIntervalOptions: Option[] = [
  { label: "Daily", value: "Daily" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Annually", value: "Annually" },
];

const smartOptions: Option[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const sizeOptions: Option[] = [
  { label: "Small", value: "Small" },
  { label: "Medium", value: "Medium" },
  { label: "Large", value: "Large" },
  { label: "XLarge", value: "XLarge" },
  { label: "XXLarge", value: "XXLarge" },
];

const materialOptions: Option[] = [
  { label: "Concrete", value: "Concrete" },
  { label: "Cement", value: "Cement" },
  { label: "Brass", value: "Brass" },
  { label: "Iron", value: "Iron" },
];

const deleteProtectOptions: Option[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const railsOptions: Option[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const libraries: ("places" | "drawing")[] = ["places"];

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit, initialData }) => {
  const [customers, setCustomers] = useState<Option[]>([]);
  const [assetTypes, setAssetTypes] = useState<Option[]>([]);

  const [name, setName] = useState<string>(initialData?.name || "");
  const [type, setType] = useState<Option | null>(
    initialData?.type
      ? { label: initialData.type.name, value: initialData.type.id }
      : null
  );
  const [customerId, setCustomerId] = useState<Option | null>(
    initialData?.customer
      ? { label: initialData.customer.name, value: initialData.customer.id }
      : null
  );
  const [location, setLocation] = useState<string>(initialData?.location || "");
  const [latitude, setLatitude] = useState<number>(initialData?.latitude || 0);
  const [longitude, setLongitude] = useState<number>(
    initialData?.longitude || 0
  );
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [status, setStatus] = useState<Option | null>(
    initialData?.status
      ? { label: initialData.status, value: initialData.status }
      : null
  );
  const [inspectionInterval, setInspectionInterval] = useState<Option | null>(
    initialData?.inspectionInterval
      ? {
          label: initialData.inspectionInterval,
          value: initialData.inspectionInterval,
        }
      : null
  );
  const [qrCode, setQrCode] = useState<string>(initialData?.qrCode || "");
  const [nfcCode, setNfcCode] = useState<string>(initialData?.nfcCode || "");
  const [pipeDia, setPipeDia] = useState<number>(initialData?.pipeDia || 0);
  const [smart, setSmart] = useState<Option | null>(
    initialData?.smart
      ? { label: initialData.smart, value: initialData.smart }
      : null
  );
  const [size, setSize] = useState<Option | null>(
    initialData?.size
      ? { label: initialData.size, value: initialData.size }
      : null
  );
  const [material, setMaterial] = useState<Option | null>(
    initialData?.material
      ? { label: initialData.material, value: initialData.material }
      : null
  );
  const [deleteProtect, setDeleteProtect] = useState<Option | null>(
    initialData?.deleteProtect
      ? { label: initialData.deleteProtect, value: initialData.deleteProtect }
      : null
  );
  const [duty, setDuty] = useState<string>(initialData?.duty || "");
  const [rails, setRails] = useState<Option | null>(
    initialData?.rails
      ? { label: initialData.rails, value: initialData.rails }
      : null
  );
  const [floatVal, setFloat] = useState<number>(initialData?.float || 0);
  const [pumps, setPumps] = useState<number>(initialData?.pumps || 0);

  const clientId = getUserId();
  const navigate = useNavigate();
  const { data: assetTypeData } = useGetAssetTypesQuery();
  const { data: customersData } = useGetCustomersQuery();

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
        setLocation(place.formatted_address || "");
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
      }
    }
  };

  useEffect(() => {
    if (customersData) {
      const customerOptions = customersData.map((customer) => ({
        label: customer.name,
        value: customer.id,
      }));
      setCustomers(customerOptions);

      // Set initial customer if initialData is provided
      if (initialData?.customer) {
        const selectedCustomer = customerOptions.find(
          (c) => c.value === initialData.customer?.id
        );
        setCustomerId(selectedCustomer || null);
      }
    }
  }, [customersData, initialData]);

  useEffect(() => {
    if (assetTypeData) {
      const assetTypeOptions = assetTypeData.map((assetType) => ({
        label: assetType.name,
        value: assetType.id,
      }));
      setAssetTypes(assetTypeOptions);

      // Set initial asset type if initialData is provided
      if (initialData?.type) {
        const selectedAssetType = assetTypeOptions.find(
          (a) => a.value === initialData.type?.id
        );
        setType(selectedAssetType || null);
      }
    }
  }, [assetTypeData, initialData]);

  const handleCancel = () => {
    navigate("/customer-table");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      type: type?.value || "",
      customerId: customerId?.value || "",
      clientId: clientId ?? undefined,
      location,
      latitude,
      longitude,
      description,
      status: status?.value || "",
      inspectionInterval: inspectionInterval?.value || "",
      qrCode,
      nfcCode,
      pipeDia,
      smart: smart?.value || "",
      size: size?.value || "",
      material: material?.value || "",
      deleteProtect: deleteProtect?.value || "",
      duty,
      rails: rails?.value || "",
      float: floatVal,
      pumps,
    });
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
          <SelectField
            label="Customer"
            value={customerId}
            onChange={(option) => setCustomerId(option)}
            options={customers}
            placeholder="Select a customer"
            required
          />
        </div>
        <div>
          <SelectField
            label="Asset Type"
            value={type}
            onChange={(option) => setType(option)}
            options={assetTypes}
            placeholder="Select an asset type"
            required
          />
        </div>
        <div>
          <InputField
            label="Asset Name"
            name="name"
            fieldType="text"
            value={name}
            placeholder="Enter asset name"
            onChange={(e) => setName(e.target.value)}
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
                value={location}
                placeholder="Enter asset location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </Autocomplete>
          )}
        </div>
        <div>
          <InputField
            label="Description"
            name="description"
            fieldType="text"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <SelectField
            label="Status"
            value={status}
            onChange={(option) => setStatus(option)}
            options={statusOptions}
            placeholder="Select status"
            required
          />
        </div>
        <div>
          <SelectField
            label="Inspection Interval"
            value={inspectionInterval}
            onChange={(option) => setInspectionInterval(option)}
            options={inspectionIntervalOptions}
            placeholder="Select Inspection Interval"
            required
          />
        </div>
        <div>
          <InputField
            label="QR Code"
            name="qrCode"
            fieldType="text"
            value={qrCode}
            placeholder="Enter QR code"
            onChange={(e) => setQrCode(e.target.value)}
          />
        </div>
        <div>
          <InputField
            label="NFC Code"
            name="nfcCode"
            fieldType="text"
            value={nfcCode}
            placeholder="Enter NFC code"
            onChange={(e) => setNfcCode(e.target.value)}
          />
        </div>
        <div>
          <InputField
            label="Pipe Diameter"
            name="pipeDia"
            fieldType="number"
            value={pipeDia}
            placeholder="Enter pipe diameter"
            onChange={(e) => setPipeDia(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <SelectField
            label="Smart"
            value={smart}
            onChange={(option) => setSmart(option)}
            options={smartOptions}
            required
          />
        </div>
        <div>
          <SelectField
            label="Size"
            value={size}
            onChange={(option) => setSize(option)}
            options={sizeOptions}
            placeholder="Select Size"
            required
          />
        </div>
        <div>
          <SelectField
            label="Material"
            value={material}
            onChange={(option) => setMaterial(option)}
            options={materialOptions}
            placeholder="Select Material"
            required
          />
        </div>
        <div>
          <SelectField
            label="Delete Protect"
            value={deleteProtect}
            onChange={(option) => setDeleteProtect(option)}
            options={deleteProtectOptions}
            required
          />
        </div>
        <div>
          <InputField
            label="Duty"
            name="duty"
            fieldType="text"
            value={duty}
            placeholder="Enter duty"
            onChange={(e) => setDuty(e.target.value)}
          />
        </div>
        <div>
          <SelectField
            label="Rails"
            value={rails}
            onChange={(option) => setRails(option)}
            options={railsOptions}
            required
          />
        </div>
        <div>
          <InputField
            label="Float"
            name="float"
            fieldType="number"
            value={floatVal}
            placeholder="Enter float"
            onChange={(e) => setFloat(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <InputField
            label="Pumps"
            name="pumps"
            fieldType="number"
            value={pumps}
            placeholder="Enter pumps"
            onChange={(e) => setPumps(parseFloat(e.target.value))}
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
