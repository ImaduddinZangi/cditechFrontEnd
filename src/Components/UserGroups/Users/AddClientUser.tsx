import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import {
  ClientUser,
  GetClientUser,
} from "../../../redux/features/clientUserSlice";
import { useGetUserGroupsQuery } from "../../../redux/api/userGroupApi";
import SelectField, { Option } from "../../Tags/SelectField";

interface AddClientUserProps {
  onSubmit: (data: ClientUser) => void;
  initialData?: Partial<GetClientUser>;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Disabled", value: "Disabled" },
];

const AddClientUser: React.FC<AddClientUserProps> = ({
  onSubmit,
  initialData,
}) => {
  const [groups, setGroups] = useState<Option[]>([]);
  const [city, setCity] = useState<string>(initialData?.city || "");
  const [state, setState] = useState<string>(initialData?.state || "");
  const [zipcode, setZipcode] = useState<string>(initialData?.zipcode || "");
  const [division, setDivision] = useState<string>(initialData?.division || "");
  const [lastName, setLastName] = useState<string>(initialData?.lastName || "");
  const [email, setEmail] = useState<string>(initialData?.email || "");
  const [password, setPassword] = useState<string>(initialData?.password || "");
  const [phone, setPhone] = useState<string>(initialData?.phone || "");
  const [firstName, setFirstName] = useState<string>(
    initialData?.firstName || ""
  );

  const [status, setStatus] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [addressLine1, setAddressLine1] = useState<string>(
    initialData?.addressLine1 || ""
  );

  const [receiveSms, setReceiveSms] = useState<boolean>(
    initialData?.receiveSms || false
  );
  const [requirePasswordChange, setRequirePasswordChange] = useState<boolean>(
    initialData?.requirePasswordChange || false
  );
  const [sendWelcomeMessage, setSendWelcomeMessage] = useState<boolean>(
    initialData?.sendWelcomeMessage || false
  );
  const [groupId, setGroupId] = useState<Option | null>(null);

  const { data: groupsData } = useGetUserGroupsQuery();

  const navigate = useNavigate();

  useEffect(() => {
    if (groupsData) {
      const groupOptions = groupsData.map((group) => ({
        label: group.name,
        value: group.id ? group.id : "",
      }));
      setGroups(groupOptions);

      if (initialData?.usergroups) {
        const selectedGroup = groupOptions.find(
          (c) => c.value === initialData.usergroups?.id
        );
        setGroupId(selectedGroup || null);
      }
    }
  }, [groupsData, initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      email,
      password,
      status: status?.value || "",
      phone,
      addressLine1,
      city,
      state,
      zipcode,
      division,
      receiveSms,
      requirePasswordChange,
      sendWelcomeMessage,
      groupId: groupId?.value || "",
    });
  };

  const handleCancel = () => {
    navigate("/client-user-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form className="w-full flex flex-col gap-[1vw]" onSubmit={handleSubmit}>
        <div className="w-full flex flex-row items-center gap-[1vw]">
          <InputField
            label="First Name"
            name="firstName"
            fieldType="text"
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            fieldType="text"
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <div className="w-full">
            <SelectField
              label="Status"
              name="status"
              value={status}
              placeholder="Active"
              options={statusOptions}
              onChange={(option) => setStatus(option)}
              required
            />
          </div>
        </div>
        <div className="w-full grid grid-cols-2 gap-[1vw]">
          <InputField
            label="Email"
            name="email"
            fieldType="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputField
            label="Password"
            name="password"
            fieldType="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <InputField
            label="Phone"
            name="phone"
            fieldType="tel"
            value={phone}
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <InputField
            label="Address Line 1"
            name="addressLine1"
            fieldType="text"
            value={addressLine1}
            placeholder="Enter Address"
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
          <InputField
            label="City"
            name="city"
            fieldType="text"
            value={city}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <InputField
            label="State"
            name="state"
            fieldType="text"
            value={state}
            placeholder="Enter State"
            onChange={(e) => setState(e.target.value)}
            required
          />
          <InputField
            label="Zip Code"
            name="zipcode"
            fieldType="text"
            value={zipcode}
            placeholder="Enter Zip Code"
            onChange={(e) => setZipcode(e.target.value)}
            required
          />
          <InputField
            label="Division"
            name="division"
            fieldType="text"
            value={division}
            placeholder="Enter Division"
            onChange={(e) => setDivision(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <input
            type="checkbox"
            name="receiveSms"
            id="receiveSms"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={receiveSms}
            onChange={(e) => setReceiveSms(e.target.checked)}
          />
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Receive SMS
          </label>
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <input
            type="checkbox"
            name="requirePasswordChange"
            id="requirePasswordChange"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={requirePasswordChange}
            onChange={(e) => setRequirePasswordChange(e.target.checked)}
          />
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Require Password Change
          </label>
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <input
            type="checkbox"
            name="sendWelcomeMessage"
            id="sendWelcomeMessage"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={sendWelcomeMessage}
            onChange={(e) => setSendWelcomeMessage(e.target.checked)}
          />
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Send Welcome Message
          </label>
        </div>
        <div className="mt-[1vw] w-1/2 pr-[1vw]">
          <SelectField
            label="User Group"
            name="groupId"
            value={groupId}
            options={groups}
            onChange={(option) => setGroupId(option)}
            required
          />
        </div>
        <div className="mt-[1vw] flex justify-end">
          <PurpleButton type="submit" text="Save" className="mr-[1vw]" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddClientUser;
