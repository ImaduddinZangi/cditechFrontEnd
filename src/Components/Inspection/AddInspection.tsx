import React, { useState } from "react";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetClientUsersQuery } from "../../redux/api/clientUserApi";
import { getUserId } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { GetInspection, Inspection } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { Customer } from "../../redux/features/customerSlice";
import { Asset } from "../../redux/features/assetSlice";
import { ClientUser } from "../../redux/features/clientUserSlice";

interface InspectionFormProps {
  onSubmit: (data: Inspection) => void;
  initialData?: Partial<GetInspection>;
}

const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [assetId, setAssetId] = useState<string>(initialData?.asset?.id || "");
  const [customerId, setCustomerId] = useState<string>(
    initialData?.customer?.id || ""
  );
  const [name, setName] = useState<string>(initialData?.name || "");
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialData?.scheduledDate || ""
  );
  const [assignedTo, setAssignedTo] = useState<string>(
    initialData?.assignedTo?.id || ""
  );
  const [comments, setComments] = useState<string>(initialData?.comments || "");
  const [serviceFee, setServiceFee] = useState<number>(
    initialData?.serviceFee || 0
  );
  const [recording, setRecording] = useState<string>(
    initialData?.recording || "no"
  );

  const { data: customers } = useGetCustomersQuery();
  const { data: assets } = useGetAssetsQuery();
  const {data: users} = useGetClientUsersQuery();

  const clientId = getUserId();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      clientId: initialData?.client?.id ?? clientId,
      customerId,
      assetId,
      assignedTo,
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
                placeholder="Inspection name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Customer:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
              >
                <option value="">Select Customer</option>
                {customers?.map((customer: Customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
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
              <label className="block mb-1 font-medium">Asset:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="assetId"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                required
              >
                <option value="">Select Asset</option>
                {assets?.map((asset: Asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Assigned To:</label>
              <select
                className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
                name="assignedTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="">Select User</option>
                {users?.map((user: ClientUser) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
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
