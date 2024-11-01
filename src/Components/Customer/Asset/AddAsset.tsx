import React, { useState, useEffect } from "react";
import { getUserId } from "../../../utils/utils";
import { useGetAssetTypesQuery } from "../../../redux/api/assetTypeApi";
import { useGetCustomersQuery } from "../../../redux/api/customerApi";
import { useJsApiLoader } from "@react-google-maps/api";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import SelectField, { Option } from "../../Tags/SelectField";
import Loader from "../../Constants/Loader";
import { useNavigate } from "react-router-dom";
import { Asset } from "../../../redux/features/assetSlice";
import AddPump from "../Pump/AddPump";
import AddPhotos from "../AddPhotos";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import { Pump } from "../../../redux/features/pumpSlice";
import LiftStationPropertiesForm from "./templates/LiftStationPropertiesForm";
import GreaseTrapPropertiesForm from "./templates/GreaseTrapPropertiesForm";
import LintTrapPropertiesForm from "./templates/LintTrapPropertiesForm";
import TreatmentPlantDigesterPropertiesForm from "./templates/TreatmentPlantDigesterPropertiesForm";
import StormDrainPropertiesForm from "./templates/StormDrainPropertiesForm";

interface AddAssetProps {
  onSubmit: (assetData: FormData, pumpDataList?: Pump[]) => void;
  initialData?: Partial<Asset>;
}

const statusOptions: Option[] = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Maintenance", value: "Maintenance" },
];

const libraries: ("places" | "drawing")[] = ["places"];

const AddAsset: React.FC<AddAssetProps> = ({ onSubmit, initialData }) => {
  const [customers, setCustomers] = useState<Option[]>([]);
  const [assetTypes, setAssetTypes] = useState<Option[]>([]);
  const [pumpDataList, setPumpDataList] = useState<Pump[]>([]);

  const [name, setName] = useState<string>(initialData?.name || "");
  const [type, setType] = useState<Option | null>(
    initialData?.assetType
      ? { label: initialData.assetType.name, value: initialData.assetType.id }
      : null
  );
  const [customerId, setCustomerId] = useState<Option | null>(
    initialData?.customer
      ? { label: initialData.customer.name, value: initialData.customer.id }
      : null
  );
  const [status, setStatus] = useState<Option | null>(
    initialData?.status
      ? { label: initialData.status, value: initialData.status }
      : null
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [properties, setProperties] = useState<Record<string, any>>({});

  const updateProperties = (key: string, value: any) => {
    setProperties((prevProps) => ({
      ...prevProps,
      [key]: value,
    }));
  };

  const handlePumpCountChange = (count: number) => {
    setPumpDataList(Array(count).fill({}));
  };

  const handlePumpChange = (index: number, data: Pump) => {
    setPumpDataList((prevPumpDataList) => {
      const newPumpDataList = [...prevPumpDataList];
      newPumpDataList[index] = data;
      return newPumpDataList;
    });
  };

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

      if (initialData?.assetType) {
        const selectedAssetType = assetTypeOptions.find(
          (a) => a.value === initialData.assetType?.id
        );
        setType(selectedAssetType || null);
      }
    }
  }, [assetTypeData, initialData]);

  const renderPropertiesForm = () => {
    switch (type?.label) {
      case 'Lift Station':
        return (
          <LiftStationPropertiesForm
            updateProperties={updateProperties}
            properties={properties}
            onPumpCountChange={handlePumpCountChange}
          />
        );
      case 'Grease Trap':
        return (
          <GreaseTrapPropertiesForm
            updateProperties={updateProperties}
            properties={properties}
          />
        );
      case 'Lint Trap':
        return (
          <LintTrapPropertiesForm
            updateProperties={updateProperties}
            properties={properties}
          />
        );
      case 'Treatment Plant Digester':
        return (
          <TreatmentPlantDigesterPropertiesForm
            updateProperties={updateProperties}
            properties={properties}
          />
        );
      case 'Storm Drain':
        return (
          <StormDrainPropertiesForm
            updateProperties={updateProperties}
            properties={properties}
          />
        );
      default:
        return null;
    }
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
    if (clientId !== undefined && clientId != null) {
      formData.append("clientId", clientId);
    }
    formData.append('customerId', customerId?.value || '');
    formData.append('name', name);
    formData.append('assetType', type?.value || '');
    formData.append('status', status?.value || '');
    formData.append('properties', JSON.stringify(properties));

    photos.forEach((photo) => {
      formData.append('photos', photo);
    });

    if (type?.label === 'Lift Station') {
      onSubmit(formData, pumpDataList);
    } else {
      onSubmit(formData);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded)
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form className="relative pb-[5vw]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-[1vw]">
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
            <SelectField
              label="Asset Type"
              value={type}
              onChange={(option) => setType(option)}
              options={assetTypes}
              placeholder="Select an asset type"
              required
            />
          </div>
          {type && (
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
          )}
          {type && (
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
          )}
          {type && renderPropertiesForm()}
          {type && (
            <OutlinePurpleButton
              onClick={handleOpenModal}
              text="Upload Photos"
            />
          )}
        </div>
        {type?.label === 'Lift Station' && pumpDataList.map((pumpData, index) => (
          <div key={index}>
            <p className="text-[1.2vw] my-[1vw] font-semibold font-inter">
              Pump # {index + 1}
            </p>
            <AddPump
              onChange={(data) => handlePumpChange(index, data)}
              initialData={pumpData}
            />
          </div>
        ))}
        <div className="col-span-2 absolute bottom-0 right-0 flex justify-end space-x-[1vw]">
          <PurpleButton type="submit" text="Save & Close" />
          <WhiteButton type="button" text="Do not Save & Cancel" onClick={handleCancel} />
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
