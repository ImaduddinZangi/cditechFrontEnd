import React, { useEffect, useState } from "react";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetClientUsersQuery } from "../../redux/api/clientUserApi";
import { getUserId } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import {
  CreateInspection,
  Inspection,
} from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { useGetInspectionChecklistsQuery } from "../../redux/api/inspectionChecklistApi";
import SelectField, { Option } from "../Tags/SelectField";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import AddPhotos from "../Customer/AddPhotos";

interface InspectionFormProps {
  onSubmit: (data: CreateInspection) => void;
  onPhotosSubmit?: (photos: File[]) => void;
  initialData?: Partial<Inspection>;
}

const InspectionForm: React.FC<InspectionFormProps> = ({
  onSubmit,
  initialData,
  onPhotosSubmit,
}) => {
  const [customers, setCustomers] = useState<Option[]>([]);
  const [customerId, setCustomerId] = useState<Option | null>(
    initialData?.customer
      ? { label: initialData.customer.name, value: initialData.customer.id }
      : null
  );
  const [assets, setAssets] = useState<Option[]>([]);
  const [assetId, setAssetId] = useState<Option | null>(
    initialData?.asset
      ? { label: initialData.asset.name, value: initialData.asset.id }
      : null
  );

  const [users, setUsers] = useState<Option[]>([]);
  const [userId, setUserId] = useState<Option | null>(
    initialData?.assignedTo
      ? { label: initialData.assignedTo.name, value: initialData.assignedTo.id }
      : null
  );
  const [checklists, setChecklists] = useState<Option[]>([]);
  const [checklistId, setChecklistId] = useState<Option | null>(
    initialData?.checklists
      ? {
          label: initialData.checklists[0].overallScore,
          value: initialData.checklists[0].overallScore,
        }
      : null
  );
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialData?.scheduledDate || ""
  );
  const [reocurring, setReocurring] = useState<boolean>(
    initialData?.isReocurring || false
  );
  const [inspectionInterval, setinspectionInterval] = useState<number>(
    initialData?.inspectionInterval || 0
  );
  const [reocurrenceEndDate, setReocurrenceEndDate] = useState<string>(
    initialData?.reocurrenceEndDate || ""
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data: customersData } = useGetCustomersQuery();
  const { data: assetsData } = useGetAssetsQuery();
  const { data: usersData } = useGetClientUsersQuery();
  const { data: checklistsData } = useGetInspectionChecklistsQuery();

  const clientId = getUserId();
  const navigate = useNavigate();

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
    if (assetsData) {
      const assetOptions = assetsData.map((asset) => ({
        label: asset.name,
        value: asset.id,
      }));
      setAssets(assetOptions);

      if (initialData?.asset) {
        const selectedAsset = assetOptions.find(
          (c) => c.value === initialData.asset?.id
        );
        setAssetId(selectedAsset || null);
      }
    }
  }, [assetsData, initialData]);

  useEffect(() => {
    if (usersData) {
      const userOptions = usersData.map((user) => ({
        label: user.name,
        value: user.id,
      }));
      setUsers(userOptions);

      if (initialData?.assignedTo) {
        const selecteduser = userOptions.find(
          (c) => c.value === initialData.assignedTo?.id
        );
        setUserId(selecteduser || null);
      }
    }
  }, [usersData, initialData]);

  useEffect(() => {
    if (checklistsData) {
      const checklistOptions = checklistsData.map((checklist) => ({
        label: checklist.overallScore,
        value: checklist.overallScore,
      }));
      setChecklists(checklistOptions);

      if (initialData?.assignedTo) {
        const selectedchecklist = checklistOptions.find(
          (c) => c.value === initialData.assignedTo?.id
        );
        setChecklistId(selectedchecklist || null);
      }
    }
  }, [checklistsData, initialData]);

  const handlePhotosSubmit = (uploadedPhotos: File[]) => {
    setPhotos(uploadedPhotos);
    handleCloseModal();
    if (onPhotosSubmit) {
      onPhotosSubmit(uploadedPhotos);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      clientId: initialData?.client?.id ?? clientId,
      customerId: customerId?.value || "",
      assetId: assetId?.value || "",
      assignedTo: userId?.value || "",
      status: "Not-Done",
      scheduledDate,
      isReocurring: reocurring,
      inspectionInterval,
      reocurrenceEndDate,
      checklists: [],
    });
  };

  useEffect(() => {
    if (onPhotosSubmit && photos.length > 0) {
      onPhotosSubmit(photos);
    }
  }, [photos, onPhotosSubmit]);

  const handleCancel = () => {
    navigate("/inspection-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1vw]">
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
              label="Asset"
              value={assetId}
              onChange={(option) => setAssetId(option)}
              options={assets}
              placeholder="Select a asset"
              required
            />
          </div>
          <div>
            <SelectField
              label="Checklist"
              value={checklistId}
              onChange={(option) => setChecklistId(option)}
              options={checklists}
              placeholder="Select a checklist"
              required
            />
          </div>
          <div>
            <SelectField
              label="Assigned To"
              value={userId}
              onChange={(option) => setUserId(option)}
              options={users}
              placeholder="Select a user"
              required
            />
          </div>
          <div>
            <InputField
              label="Scheduled Date"
              fieldType="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-[1vw]">
            <div className="col-span-2 flex items-center mt-[2vw]">
              <span className="mr-[1vw] text-[1vw] font-medium text-darkgray-0">
                Inspection Reocurring:
              </span>
              <label className="mr-2">
                <input
                  type="radio"
                  id="reocurringTrue"
                  name="reocurring"
                  value="yes"
                  checked={reocurring === true}
                  onChange={() => setReocurring(true)}
                  className="mr-1 accent-darkpurple-0"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="reocurring"
                  id="reocurringFalse"
                  value="no"
                  checked={reocurring === false}
                  onChange={() => setReocurring(false)}
                  className="mr-1 accent-darkpurple-0"
                />
                No
              </label>
            </div>
            {reocurring && (
              <div>
                <InputField
                  label="Reoccurence End Date"
                  fieldType="Date"
                  value={reocurrenceEndDate}
                  onChange={(e) => setReocurrenceEndDate(e.target.value)}
                  required
                />
              </div>
            )}
            {reocurring && (
              <div>
                <InputField
                  label="inspectionInterval"
                  fieldType="number"
                  value={inspectionInterval}
                  onChange={(e) =>
                    setinspectionInterval(parseFloat(e.target.value))
                  }
                />
              </div>
            )}
            <OutlinePurpleButton
              onClick={handleOpenModal}
              text="Upload Photos"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-[1vw] mt-[2vw]">
          <PurpleButton type="submit" text="Create" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
      {isModalOpen && (
        <AddPhotos
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handlePhotosSubmit}
          type="Pump"
        />
      )}
    </div>
  );
};

export default InspectionForm;
