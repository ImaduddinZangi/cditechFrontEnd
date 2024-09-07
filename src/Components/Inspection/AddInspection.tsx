import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { getUserId } from "../../utils/utils";
import { Asset } from "../../redux/features/assetSlice";
import { useNavigate } from "react-router-dom";
import { Inspection } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";

interface InspectionFormProps {
  onSubmit: (data: Inspection) => void;
  initialData?: Partial<Inspection>;
}

const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [assets, setAssets] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [customers, setCustomers] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<{
    label: string;
    value: string;
  } | null>(null);

  const [name, setName] = useState<string>(initialData?.name || "");
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialData?.scheduledDate || ""
  );
  const [comments, setComments] = useState<string>(initialData?.comments || "");
  const [serviceFee, setServiceFee] = useState<number>(
    initialData?.serviceFee || 0
  );
  const [recording, setRecording] = useState<string>(
    initialData?.recording || "no"
  );

  const { data: customersData } = useGetCustomersQuery();
  const { data: assetsData } = useGetAssetsQuery();
  const clientId = getUserId();
  const navigate = useNavigate();

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
    if (initialData && customers.length > 0) {
      const selectedCustomerData = customers.find(
        (c) => c.value === initialData.customerId
      );
      setSelectedCustomer(selectedCustomerData || null);
    }
  }, [initialData, customers]);

  useEffect(() => {
    if (assetsData) {
      setAssets(
        assetsData.map((asset: Asset) => ({
          label: asset.name,
          value: asset.id,
        }))
      );

      if (initialData?.assetId) {
        const selectedAssetData = assetsData.find(
          (asset: Asset) => asset.id === initialData.assetId
        );
        if (selectedAssetData) {
          setSelectedAsset({
            label: selectedAssetData.name,
            value: selectedAssetData.id,
          });
        }
      }
    }
  }, [assetsData, initialData]);

  const handleCustomerChange = (selectedOption: { label: string; value: string; } | null) => {
    setSelectedCustomer(selectedOption);
  };

  const handleAssetChange = (selectedOption: { label: string; value: string; } | null) => {
    setSelectedAsset(selectedOption);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      clientId: initialData?.clientId ?? clientId,
      customerId: selectedCustomer?.value || initialData?.customerId || "",
      assetId: selectedAsset?.value || initialData?.assetId || "",
      assignedTo: initialData?.assignedTo || "",
      scheduledDate,
      completedDate: initialData?.completedDate || null,
      comments,
      serviceFee,
      recording,
      checklists: initialData?.checklists || [],
      route: initialData?.route || [],
      scores: initialData?.scores || [],
    });
  };

  const handleCancel = () => {
    navigate("/inspection-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1vw] mb-6">
          <div className="space-y-[1vw]">
            <div>
              <InputField
                label="Name"
                htmlFor="name"
                fieldType="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="customer"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
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
              <InputField
                htmlFor="scheduledDate"
                label="Scheduled Date"
                fieldType="datetime-local"
                id="scheduledDate"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                required
                autoComplete="scheduledDate"
              />
            </div>
            <div>
              <InputField
                htmlFor="serviceFee"
                label="Service Fee"
                fieldType="number"
                id="serviceFee"
                value={serviceFee}
                onChange={(e) => setServiceFee(parseFloat(e.target.value))}
                required
                autoComplete="scheduledDate"
              />
            </div>
          </div>
          <div className="space-y-[1vw]">
            <div>
              <label
                htmlFor="asset"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
                Asset:
              </label>
              <Select
                id="asset"
                options={assets}
                placeholder="Search"
                className="mt-1"
                isClearable
                value={selectedAsset}
                onChange={handleAssetChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="comments"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
                Comments:
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                required
              />
            </div>
            <div className="col-span-2 flex items-center">
              <span className="mr-[1vw] text-sm font-medium text-gray-700">
                Inspection Recording:
              </span>
              <label className="mr-2">
                <input
                  type="radio"
                  id="recordingTrue"
                  name="recording"
                  value="yes"
                  checked={recording === "yes"}
                  onChange={() => setRecording("yes")}
                  className="mr-1 accent-darkpurple-0"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="recording"
                  id="recordingFalse"
                  value="no"
                  checked={recording === "no"}
                  onChange={() => setRecording("no")}
                  className="mr-1 accent-darkpurple-0"
                />
                No
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-[1vw]">
          <PurpleButton type="submit" text="Create" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;
