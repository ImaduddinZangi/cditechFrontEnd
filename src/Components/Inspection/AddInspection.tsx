import React, { useState } from "react";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetClientUsersQuery } from "../../redux/api/clientUserApi";
import { getUserId } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import {
  GetInspection,
  Inspection,
  IDs,
} from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { Customer } from "../../redux/features/customerSlice";
import { Asset } from "../../redux/features/assetSlice";
import { ClientUser } from "../../redux/features/clientUserSlice";
import { useGetInspectionChecklistsQuery } from "../../redux/api/inspectionChecklistApi";
import { useGetInspectionScoresQuery } from "../../redux/api/inspectionScoresApi";
import { Scores } from "../../redux/features/inspectionScoresSlice";
import { Checklist } from "../../redux/features/inspectionChecklistSlice";

interface InspectionFormProps {
  onSubmit: (data: Inspection) => void;
  initialData?: Partial<GetInspection>;
}

const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const initialChecklistObjects: IDs[] = initialData?.checklists
    ? initialData.checklists
        .filter(
          (checklist): checklist is Checklist => checklist.id !== undefined
        )
        .map((checklist) => ({ id: checklist.id as string }))
    : [];

  const [assetId, setAssetId] = useState<string>(initialData?.asset?.id || "");
  const [scoreId, setScoreId] = useState<string>(
    initialData?.scores?.[0]?.id ?? "" // Select the first score if available
  );
  const [checklistIds, setChecklistIds] = useState<IDs[]>(
    initialChecklistObjects
  );
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
  const { data: users } = useGetClientUsersQuery();
  const { data: scores } = useGetInspectionScoresQuery();
  const { data: checklists } = useGetInspectionChecklistsQuery();

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
      score: { scoreId }, // Use the selected scoreId
      scheduledDate,
      completedDate: initialData?.completedDate || null,
      comments,
      serviceFee,
      checklists: checklistIds, // Now an array of objects with { id }
      recording,
      route: initialData?.route || [],
    });
  };

  const handleCancel = () => {
    navigate("/inspection-table");
  };

  const handleChecklistSelection = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedChecklistId = e.target.value;
    if (!checklistIds.some((item) => item.id === selectedChecklistId)) {
      setChecklistIds([...checklistIds, { id: selectedChecklistId }]);
    }
  };

  const removeChecklist = (checklistId: string) => {
    setChecklistIds(checklistIds.filter((item) => item.id !== checklistId));
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1vw]">
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
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Customer:
            </label>
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
          <InputField
            htmlFor="serviceFee"
            label="Service Fee"
            fieldType="number"
            id="serviceFee"
            value={serviceFee}
            onChange={(e) => setServiceFee(parseFloat(e.target.value))}
            required
            autoComplete="serviceFee"
          />
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Asset:
            </label>
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Assigned To:
            </label>
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Scores:
            </label>
            <select
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              name="scoreId"
              value={scoreId}
              onChange={(e) => setScoreId(e.target.value)} // Update scoreId directly
              required
            >
              <option value="">Select Score</option>
              {scores?.map((score: Scores) => (
                <option key={score.id} value={score.id}>
                  {score.overallScore}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Checklists:
            </label>
            <select
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              onChange={handleChecklistSelection}
            >
              <option value="">Select Checklist</option>
              {checklists?.map((checklist: Checklist) => (
                <option key={checklist.id} value={checklist.id}>
                  {checklist.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-[1vw]">
            {checklistIds.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>{checklists?.find((c) => c.id === item.id)?.name}</span>
                <button
                  type="button"
                  onClick={() => removeChecklist(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[1vw]">
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
