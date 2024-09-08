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
  const [username, setUsername] = useState<string>(initialData?.username || "");
  const [lastName, setLastName] = useState<string>(initialData?.lastName || "");
  const [email, setEmail] = useState<string>(initialData?.email || "");
  const [password, setPassword] = useState<string>(initialData?.password || "");
  const [phone, setPhone] = useState<string>(initialData?.phone || "");
  const [status, setStatus] = useState<string>(initialData?.status || "" );
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
      username,
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
      <form
        className="grid grid-cols-2 gap-[1vw] relative"
        onSubmit={handleSubmit}
      >
        <div>
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
              <option value={group.id} key={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
        <InputField
          label="Username"
          name="userame"
          id="username"
          autoComplete="userame"
          fieldType="text"
          value={username}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputField
          label="First Name"
          name="firstName"
          id="firstName"
          autoComplete="given-name"
          fieldType="text"
          value={firstName}
          placeholder="Enter First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <InputField
          label="Last Name"
          name="lastName"
          id="lastName"
          autoComplete="family-name"
          fieldType="text"
          value={lastName}
          placeholder="Enter Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <InputField
          label="Email"
          name="email"
          id="email"
          autoComplete="email"
          fieldType="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputField
          label="Password"
          name="password"
          id="password"
          autoComplete="new-password"
          fieldType="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
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
        <InputField
          label="Phone"
          name="phone"
          id="phone"
          autoComplete="tel"
          fieldType="tel"
          value={phone}
          placeholder="Enter Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          label="Address Line 1"
          name="addressLine1"
          id="addressLine1"
          autoComplete="address-line1"
          fieldType="text"
          value={addressLine1}
          placeholder="Enter Address"
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        <InputField
          label="City"
          name="city"
          id="city"
          autoComplete="address-level2"
          fieldType="text"
          value={city}
          placeholder="Enter City"
          onChange={(e) => setCity(e.target.value)}
        />
        <InputField
          label="State"
          name="state"
          id="state"
          autoComplete="address-level1"
          fieldType="text"
          value={state}
          placeholder="Enter State"
          onChange={(e) => setState(e.target.value)}
        />
        <InputField
          label="Zip Code"
          name="zipcode"
          id="zipcode"
          autoComplete="postal-code"
          fieldType="text"
          value={zipcode}
          placeholder="Enter Zip Code"
          onChange={(e) => setZipcode(e.target.value)}
        />
        <InputField
          label="Division"
          name="division"
          id="division"
          fieldType="text"
          value={division}
          placeholder="Enter Division"
          onChange={(e) => setDivision(e.target.value)}
        />
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Receive SMS
          </label>
          <input
            type="checkbox"
            name="receiveSms"
            id="receiveSms"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={receiveSms}
            onChange={(e) => setReceiveSms(e.target.checked)}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Require Password Change
          </label>
          <input
            type="checkbox"
            name="requirePasswordChange"
            id="requirePasswordChange"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={requirePasswordChange}
            onChange={(e) => setRequirePasswordChange(e.target.checked)}
          />
        </div>
        <div className="flex flex-row items-center gap-x-[1vw] mt-[0.5vw]">
          <label className="block text-darkgray-0 font-medium text-[1vw]">
            Send Welcome Message
          </label>
          <input
            type="checkbox"
            name="sendWelcomeMessage"
            id="sendWelcomeMessage"
            className="mt-[0.2vw] block accent-purple-0 border-gray-300 rounded-md shadow-sm cursor-pointer"
            checked={sendWelcomeMessage}
            onChange={(e) => setSendWelcomeMessage(e.target.checked)}
          />
        </div>
        <div className="mt-[1vw] flex justify-end">
          <PurpleButton type="submit" text="Create" className="mr-[1vw]" />
          <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default AddClientUser;
