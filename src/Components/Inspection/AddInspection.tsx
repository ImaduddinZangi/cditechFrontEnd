import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { getUserId } from "../../utils/utils";
import { Asset } from "../../redux/features/assetSlice";
import { useNavigate } from "react-router-dom";
import {
  Checklist,
  RoutePoint,
  Scores,
} from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface InitialData {
  name?: string;
  customer?: { id: string; name: string };
  asset?: { id: string; name: string };
  scheduledDate?: string;
  comments?: string;
  status?: string;
  serviceFee?: number;
  recording?: string;
  clientId?: string;
  assignedTo?: string;
  completedDate?: string | null;
  checklists?: Checklist[];
  route?: RoutePoint[];
  scores?: Scores[];
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface InspectionFormProps {
  onSubmit: (
    name?: string,
    customerId?: string,
    assetId?: string,
    scheduledDate?: string,
    comments?: string,
    status?: string,
    serviceFee?: number,
    recording?: string,
    clientId?: string,
    assignedTo?: string,
    completedDate?: string | null,
    checklists?: Checklist[],
    route?: RoutePoint[],
    scores?: Scores[],
    id?: string,
    createdAt?: string,
    updatedAt?: string
  ) => void;
  initialData?: Partial<InitialData>;
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
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialData?.scheduledDate || ""
  );
  const [comments, setComments] = useState<string>(initialData?.comments || "");
  const [status, setStatus] = useState<string>(
    initialData?.status || "pending"
  );
  const [serviceFee, setServiceFee] = useState<number>(
    initialData?.serviceFee || 0
  );
  const [recording, setRecording] = useState<string>(
    initialData?.recording || "no"
  );
  const [name, setName] = useState<string>(initialData?.name || "");
  const { data: customersData } = useGetCustomersQuery();
  const { data: assetsData } = useGetAssetsQuery();
  const clientId = getUserId();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: initialData?.name || "",
    clientId: initialData?.clientId ?? clientId,
    customerId: selectedCustomer?.value || initialData?.customer?.id || "",
    assetId: selectedAsset?.value || initialData?.asset?.id || "",
    assignedTo: initialData?.assignedTo || "",
    status: initialData?.status || "pending",
    scheduledDate: initialData?.scheduledDate || "",
    completedDate: initialData?.completedDate || null,
    comments: initialData?.comments || "",
    serviceFee: initialData?.serviceFee || 0,
    recording: initialData?.recording || "no",
    checklists: initialData?.checklists || [],
    route: initialData?.route || [],
    scores: initialData?.scores || [],
  });

  const handleCustomerChange = (selectedOption: any) => {
    setSelectedCustomer(selectedOption);
    setFormState((prevState) => ({
      ...prevState,
      customerId: selectedOption?.value || "",
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
    if (assetsData) {
      setAssets(
        assetsData.map((asset: Asset) => ({
          label: asset.name,
          value: asset.id,
        }))
      );

      if (initialData?.asset?.id) {
        const selectedAssetData = assetsData.find(
          (asset: Asset) => asset.id === initialData.asset?.id
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      formState.name,
      formState.customerId,
      formState.assetId,
      formState.scheduledDate,
      formState.comments,
      formState.status,
      formState.serviceFee,
      formState.recording,
      clientId ?? undefined,
      formState.assignedTo,
      formState.completedDate,
      formState.checklists,
      formState.route,
      formState.scores
    );
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
              <label
                htmlFor="name"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                required
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
              <label className="block text-darkgray-0 font-medium text-[1vw]">
                Status:
              </label>
              <select
                name="status"
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="scheduledDate"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
                Scheduled Date:
              </label>
              <input
                type="datetime-local"
                id="scheduledDate"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                required
              />
            </div>
            <div>
              <label
                htmlFor="serviceFee"
                className="block text-darkgray-0 font-medium text-[1vw]"
              >
                Service Fee:
              </label>
              <input
                type="number"
                id="serviceFee"
                value={serviceFee}
                onChange={(e) => setServiceFee(parseFloat(e.target.value))}
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                required
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
                onChange={setSelectedAsset}
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
