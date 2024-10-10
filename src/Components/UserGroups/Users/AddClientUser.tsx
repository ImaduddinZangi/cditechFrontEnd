import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../Tags/InputField";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { ClientUser } from "../../../redux/features/clientUserSlice";
import { useGetUserGroupsQuery } from "../../../redux/api/userGroupApi";

interface AddClientUserProps {
  onSubmit: (data: ClientUser) => void;
  initialData?: Partial<ClientUser>;
}

const AddClientUser: React.FC<AddClientUserProps> = ({
  onSubmit,
  initialData,
}) => {
  const [firstName, setFirstName] = useState<string>(
    initialData?.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(initialData?.lastName || "");
  const [email, setEmail] = useState<string>(initialData?.email || "");
  const [password, setPassword] = useState<string>(initialData?.password || "");
  const [phone, setPhone] = useState<string>(initialData?.phone || "");
  const [status, setStatus] = useState<string>(initialData?.status || "");
  const [addressLine1, setAddressLine1] = useState<string>(
    initialData?.addressLine1 || ""
  );
  const [city, setCity] = useState<string>(initialData?.city || "");
  const [state, setState] = useState<string>(initialData?.state || "");
  const [zipcode, setZipcode] = useState<string>(initialData?.zipcode || "");
  const [division, setDivision] = useState<string>(initialData?.division || "");
  const [receiveSms, setReceiveSms] = useState<boolean>(
    initialData?.receiveSms || false
  );
  const [requirePasswordChange, setRequirePasswordChange] = useState<boolean>(
    initialData?.requirePasswordChange || false
  );
  const [sendWelcomeMessage, setSendWelcomeMessage] = useState<boolean>(
    initialData?.sendWelcomeMessage || false
  );
  const [groupId, setGroupId] = useState<string>(initialData?.groupId || "");
  const { data: userGroups } = useGetUserGroupsQuery();

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: initialData?.id,
      firstName,
      lastName,
      email,
      password,
      phone,
      addressLine1,
      city,
      state,
      zipcode,
      division,
      receiveSms,
      requirePasswordChange,
      sendWelcomeMessage,
      groupId,
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
          />
          <InputField
            label="Address Line 1"
            name="addressLine1"
            fieldType="text"
            value={addressLine1}
            placeholder="Enter Address"
            onChange={(e) => setAddressLine1(e.target.value)}
          />
          <InputField
            label="City"
            name="city"
            fieldType="text"
            value={city}
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
          />
          <InputField
            label="State"
            name="state"
            fieldType="text"
            value={state}
            placeholder="Enter State"
            onChange={(e) => setState(e.target.value)}
          />
          <InputField
            label="Zip Code"
            name="zipcode"
            fieldType="text"
            value={zipcode}
            placeholder="Enter Zip Code"
            onChange={(e) => setZipcode(e.target.value)}
          />
          <InputField
            label="Division"
            name="division"
            fieldType="text"
            value={division}
            placeholder="Enter Division"
            onChange={(e) => setDivision(e.target.value)}
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
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            User Group
          </label>
          <select
            name="groupId"
            id="groupId"
            className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            required
          >
            <option value="">Select a group</option>
            {userGroups?.map((group) => (
              <option value={group.id} key={group.id}>
                {group.name}
              </option>
            ))}
          </select>
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
