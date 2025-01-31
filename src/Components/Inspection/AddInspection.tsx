import React, { useEffect, useState } from "react";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useGetAssetsQuery } from "../../redux/api/assetApi";
import { useGetClientUsersQuery } from "../../redux/api/clientUserApi";
import { getUserId } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { CreateInspection, Inspection } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { useGetChecklistTemplatesQuery } from "../../redux/api/checklistTemplateApi";
import SelectField, { Option } from "../Tags/SelectField";

interface AddInspectionProps {
  onSubmit: (data: CreateInspection) => void;
  onSaveAndStart: (data: CreateInspection) => void;
  initialData?: Partial<Inspection>;
}

const intervalOptions = [
  { label: "Daily", value: "Daily" },
  { label: "Bi-Monthly", value: "Bi-Monthly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
  { label: "Bi-Annual", value: "Bi-Annual" },
  { label: "Annual", value: "Annual" },
  { label: "One-Time", value: "One-Time" },
];

const AddInspection: React.FC<AddInspectionProps> = ({
  onSubmit,
  initialData,
  onSaveAndStart,
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
  const [serviceFees, setserviceFees] = useState<Option[]>([]);
  const [serviceFeeId, setServiceFeeId] = useState<Option | null>(null);
  const [scheduledDate, setScheduledDate] = useState<string>(
    initialData?.scheduledDate ? new Date(initialData.scheduledDate).toISOString().slice(0, 10) : ""
  );
  const [inspectionInterval, setinspectionInterval] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [reocurrenceEndDate, setReocurrenceEndDate] = useState<string>(
    initialData?.reocurrenceEndDate ? new Date(initialData.reocurrenceEndDate).toISOString().slice(0, 10) : ""
  );
  const { data: customersData } = useGetCustomersQuery();
  const { data: assetsData } = useGetAssetsQuery();
  const { data: usersData } = useGetClientUsersQuery();
  const { data: checklistTemplatesData } = useGetChecklistTemplatesQuery();

  const clientId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (scheduledDate) {
      const scheduledDateObj = new Date(scheduledDate);
      const endDate = new Date(scheduledDateObj.setFullYear(scheduledDateObj.getFullYear() + 3))
        .toISOString()
        .split("T")[0];
      setReocurrenceEndDate(endDate);
    }
  }, [scheduledDate]);

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
        label: user.username || "N/A",
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
    if (checklistTemplatesData) {
      const serviceFeeOptions = checklistTemplatesData.map((template) => ({
        label: template.name,
        value: template.id,
      }));
      setserviceFees(serviceFeeOptions);

      if (initialData?.assignedTo) {
        const selectedserviceFee = serviceFeeOptions.find(
          (c) => c.value === initialData.assignedTo?.id
        );
        setServiceFeeId(selectedserviceFee || null);
      }
    }
  }, [checklistTemplatesData, initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requestData: CreateInspection = {
      clientId: clientId,
      customerId: customerId?.value || "",
      assetId: assetId?.value || "",
      serviceFeeId: serviceFeeId?.value || "",
      inspectionInterval: inspectionInterval?.value || "",
      scheduledDate,
      assignedTo: userId?.value || "",
    };

    if (inspectionInterval?.value && inspectionInterval.value !== "One-Time") {
      requestData.reocurrenceEndDate = reocurrenceEndDate;
    }

    onSubmit(requestData);
  };

  const handleSaveAndStart = () => {
    const requestData: CreateInspection = {
      clientId: clientId,
      customerId: customerId?.value || "",
      assetId: assetId?.value || "",
      serviceFeeId: serviceFeeId?.value || "",
      inspectionInterval: inspectionInterval?.value || "",
      scheduledDate,
      assignedTo: userId?.value || "",
    };

    if (inspectionInterval?.value && inspectionInterval.value !== "One-Time") {
      requestData.reocurrenceEndDate = reocurrenceEndDate;
    }

    onSaveAndStart(requestData);
  };

  const handleCancel = () => {
    navigate("/manage-inspections");
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
              value={serviceFeeId}
              onChange={(option) => setServiceFeeId(option)}
              options={serviceFees}
              placeholder="Select a checklist"
              required
            />
          </div>
          <div>
            <SelectField
              label="Inspection Interval"
              value={inspectionInterval}
              onChange={(option) => setinspectionInterval(option)}
              options={intervalOptions}
              required
            />
          </div>
          <div>
            <InputField
              label="First Inspection Due Date"
              fieldType="Date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
            />
          </div>
          {inspectionInterval?.value && inspectionInterval.value !== "One-Time" && (
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
        </div>
        <div className="flex justify-end space-x-[1vw] mt-[2vw]">
          <PurpleButton type="submit" text="Save New Inspection" />
          <PurpleButton
            type="button"
            text="Save & Start First Inspection"
            onClick={() => handleSaveAndStart()}
          />
          <WhiteButton type="button" text="Do Not Save & Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddInspection;
