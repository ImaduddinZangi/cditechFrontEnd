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
import { Asset } from "../../../redux/features/assetSlice";
import AddPump from "../Pump/AddPump";
import { Pump } from "../../../redux/features/pumpSlice";
import AddPhotos from "../AddPhotos";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";

interface Option {
  label: string;
  value: string;
}

interface AddAssetProps {
  onSubmit: (assetData: FormData, pumpDataList: Pump[]) => void;
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

const powerOptions: Option[] = [
  { label: "1 Phase", value: "1 Phase" },
  { label: "2 Phase", value: "2 Phase" },
  { label: "3 Phase", value: "3 Phase" },
  { label: "Wild", value: "Wild" },
  { label: "Unknown", value: "Unknown" },
  { label: "Other", value: "Other" },
];

const materialOptions: Option[] = [
  { label: "Concrete", value: "Concrete" },
  { label: "Steel", value: "Steel" },
  { label: "Fiberglass", value: "Fiberglass" },
  { label: "Composite", value: "Composite" },
  { label: "Other", value: "Other" },
  { label: "Unknown", value: "Unknown" },
];

const dutyOptions: Option[] = [
  { label: "Lite", value: "Lite" },
  { label: "Normal", value: "Normal" },
  { label: "Heavy", value: "Heavy" },
  { label: "Severe", value: "Severe" },
];

const railsOptions: Option[] = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const pumpOptions: Option[] = [
  { label: "6", value: "6" },
  { label: "5", value: "5" },
  { label: "4", value: "4" },
  { label: "3", value: "3" },
  { label: "2", value: "2" },
  { label: "1", value: "1" },
];

const libraries: ("places" | "drawing")[] = ["places"];

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit, initialData }) => {
  const [customers, setCustomers] = useState<Option[]>([]);
  const [assetTypes, setAssetTypes] = useState<Option[]>([]);
  const [pumpDataList, setPumpDataList] = useState<Partial<Pump>[]>([]);
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
  const [status, setStatus] = useState<Option | null>(
    initialData?.status
      ? { label: initialData.status, value: initialData.status }
      : null
  );
  const [power, setPower] = useState<Option | null>(
    initialData?.power
      ? { label: initialData.power, value: initialData.power }
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
  const [photos, setPhotos] = useState<File[]>([]);
  const [pipeDia, setPipeDia] = useState<string>(initialData?.pipeDia || "");
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
  const [duty, setDuty] = useState<Option | null>(
    initialData?.duty
      ? { label: initialData.duty, value: initialData.duty }
      : null
  );
  const [rails, setRails] = useState<Option | null>(
    initialData?.rails
      ? { label: initialData.rails, value: initialData.rails }
      : null
  );
  const [pumps, setPumps] = useState<Option | null>(
    initialData?.pumps
      ? { label: initialData.pumps, value: initialData.pumps }
      : null
  );
  const [floatVal, setFloat] = useState<string>(initialData?.float || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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

      if (initialData?.type) {
        const selectedAssetType = assetTypeOptions.find(
          (a) => a.value === initialData.type?.id
        );
        setType(selectedAssetType || null);
      }
    }
  }, [assetTypeData, initialData]);

  useEffect(() => {
    if (pumps) {
      const numberOfPumps = Number(pumps.value);
      setPumpDataList(Array(numberOfPumps).fill({}));
    } else {
      setPumpDataList([]);
    }
  }, [pumps]);

  const handlePumpChange = (index: number, data: Pump) => {
    setPumpDataList((prevPumpDataList) => {
      const newPumpDataList = [...prevPumpDataList];
      newPumpDataList[index] = data;
      return newPumpDataList;
    });
  };

  const handleCancel = () => {
    navigate("/customer-table");
  };

  const handlePhotosSubmit = (uploadedPhotos: File[]) => {
    setPhotos(uploadedPhotos);
    handleCloseModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type?.value || "");
    formData.append("customerId", customerId?.value || "");
    if (clientId !== undefined && clientId != null) {
      formData.append("clientId", clientId);
    }
    formData.append("location", location);
    formData.append("latitude", latitude.toString());
    formData.append("longitude", longitude.toString());
    formData.append("status", status?.value || "");
    formData.append("inspectionInterval", inspectionInterval?.value || "");
    formData.append("qrCode", qrCode);
    formData.append("nfcCode", nfcCode);
    formData.append("pipeDia", pipeDia);
    formData.append("smart", smart?.value || "");
    formData.append("size", size?.value || "");
    formData.append("material", material?.value || "");
    formData.append("deleteProtect", "yes");
    formData.append("duty", duty?.value || "");
    formData.append("rails", rails?.value || "");
    formData.append("power", power?.value || "");
    formData.append("float", floatVal);
    formData.append("pumps", pumps?.value || "");
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    onSubmit(formData, pumpDataList as Pump[]);
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
      <form className="relative pb-[5vw]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-[1vw]">
          <div>
            <SelectField
              label="Customer"
              value={customerId}
              onChange={(option) => setCustomerId(option)}
              options={customers}
              placeholder="Select a customer"
              // required
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
                  label="Lat/Lng"
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
              onChange={(e) => setPipeDia(e.target.value)}
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
              label="Duty"
              name="duty"
              value={duty}
              placeholder="Select Duty"
              onChange={(option) => setDuty(option)}
              options={dutyOptions}
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
            <SelectField
              label="Power"
              value={power}
              onChange={(option) => setPower(option)}
              options={powerOptions}
              required
            />
          </div>
          <div>
            <InputField
              label="Floats"
              name="floats"
              fieldType="number"
              value={floatVal}
              placeholder="Enter float"
              onChange={(e) => setFloat(e.target.value)}
            />
          </div>
          <div>
            <SelectField
              label="Pumps"
              name="pumps"
              value={pumps}
              placeholder="Select pumps"
              onChange={(option) => setPumps(option)}
              options={pumpOptions}
            />
          </div>
          <OutlinePurpleButton onClick={handleOpenModal} text="Upload Photos" />
        </div>
        {pumps &&
          pumpDataList.map((pumpData, index) => (
            <div className="mt-[2vw]">
              <p className="text-[1.2vw] my-[1vw] font-semibold font-inter">
                Pump # {index + 1}
              </p>
              <AddPump
                key={index}
                onChange={(data) => handlePumpChange(index, data)}
                initialData={pumpData}
              />
            </div>
          ))}
        <div className="col-span-2 absolute bottom-0 right-0 flex justify-end space-x-[1vw]">
          <PurpleButton type="submit" text="Save" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
      {isModalOpen && (
        <AddPhotos
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handlePhotosSubmit}
          type="Asset"
        />
      )}
    </div>
  );
};

export default AddAsset;
