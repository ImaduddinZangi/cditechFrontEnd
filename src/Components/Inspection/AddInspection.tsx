import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { getUserId } from "../../utils/utils";

interface InspectionData {
  clientId: string | null;
  customerId: string;
  assetId: string;
  assignedTo: string;
  status: string;
  scheduledDate: string;
  completedDate: string | null;
  comments: string;
  serviceFee: number;
  recording: string;
}

interface InspectionFormProps {
  onSubmit: (data: InspectionData) => void;
}

const InspectionForm: React.FC<InspectionFormProps> = ({ onSubmit }) => {
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
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [serviceFee, setServiceFee] = useState<number>(0);
  const [recording, setRecording] = useState<string>("no");

  const { data: customersData } = useGetCustomersQuery();
  const { data: assetsData } = useGetAssetsQuery();
  const clientId = getUserId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inspectionData: InspectionData = {
      clientId: clientId,
      customerId: selectedCustomer?.value || "",
      assetId: selectedAsset?.value || "",
      assignedTo: "",
      status,
      scheduledDate,
      completedDate: null,
      comments,
      serviceFee,
      recording,
    };

    onSubmit(inspectionData);
  };

  useEffect(() => {
    if (customersData) {
      setCustomers(
        customersData.map((customer: any) => ({
          label: customer.name,
          value: customer.id,
        }))
      );
    }
  }, [customersData]);

  useEffect(() => {
    if (assetsData) {
      setAssets(
        assetsData.map((asset: any) => ({
          label: asset.name,
          value: asset.id,
        }))
      );
    }
  }, [assetsData]);

  return (
    <div className="p-[1.5vw] bg-white shadow-lg rounded-lg font-inter m-[2vw]">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1vw] mb-6">
          <div className="space-y-[1vw]">
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
                onChange={setSelectedCustomer}
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
          <button
            type="submit"
            className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw] text-[1vw] font-inter font-medium"
          >
            Complete New Inspection
          </button>
          <button
            type="button"
            className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
          >
            Do Not Save And Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default InspectionForm;
