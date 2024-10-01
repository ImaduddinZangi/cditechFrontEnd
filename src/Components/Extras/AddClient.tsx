import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import Select, { SingleValue } from "react-select";
import "react-phone-input-2/lib/style.css";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { useNavigate } from "react-router-dom";
import { states } from "../Customer/Constants/usStates";

const statuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const industries = [
  { value: "tech", label: "Technology" },
  { value: "health", label: "Healthcare" },
];

const companyTypes = [
  { value: "llc", label: "LLC" },
  { value: "corporation", label: "Corporation" },
];

const AddClient: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [status, setStatus] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [companyEmail, setCompanyEmail] = useState("");
  const [industry, setIndustry] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyType, setCompanyType] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Addresses
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyState, setCompanyState] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [companyZipCode, setCompanyZipCode] = useState("");

  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] =
    useState<SingleValue<{ value: string; label: string }>>(null);
  const [billingZipCode, setBillingZipCode] = useState("");
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      companyName,
      status,
      companyEmail,
      industry,
      companyWebsite,
      companyType,
      phone,
      firstName,
      lastName,
      companyAddress,
      companyCity,
      companyState,
      companyZipCode,
      billingAddress: sameAsCompanyAddress ? companyAddress : billingAddress,
      billingCity: sameAsCompanyAddress ? companyCity : billingCity,
      billingState: sameAsCompanyAddress ? companyState : billingState,
      billingZipCode: sameAsCompanyAddress ? companyZipCode : billingZipCode,
    });
    navigate("/client-dashboard");
  };

  const handleCancel = () => {
    navigate("/client-dashboard");
  };

  return (
    <div className="p-[2vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[2vw]">
          {/* Company Information */}
          <div>
            <InputField
              label="Company Name:"
              name="companyName"
              fieldType="text"
              value={companyName}
              placeholder="Enter company name"
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-darkgray-0 font-medium">Status:</label>
            <Select
              value={status}
              onChange={(option) => setStatus(option)}
              options={statuses}
              placeholder="Select status"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-[2vw] mt-[1vw]">
          <div className="grid gap-y-[1vw]">
            <h2 className="font-semibold text-[1.1vw]">Company Address</h2>
            <InputField
              label="Line 1"
              name="companyAddress"
              fieldType="text"
              value={companyAddress}
              placeholder="Address"
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
            <InputField
              label="Line 2"
              name="companyAddressLine2"
              fieldType="text"
              placeholder="Address"
            />
            <div className="grid grid-cols-2 gap-[2vw]">
              <InputField
                label="City"
                name="companyCity"
                fieldType="text"
                value={companyCity}
                placeholder="Enter City"
                onChange={(e) => setCompanyCity(e.target.value)}
              />
              <div>
                <label className="block text-darkgray-0 font-medium">
                  State
                </label>
                <Select
                  value={companyState}
                  onChange={(option) => setCompanyState(option)}
                  options={states}
                  placeholder="Select State"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[2vw]">
              <div>
                <InputField
                  label="Zipcode"
                  name="companyZipCode"
                  fieldType="text"
                  value={companyZipCode}
                  placeholder="Enter Zip Code"
                  onChange={(e) => setCompanyZipCode(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-darkgray-0 font-medium">
                  Phone
                </label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={setPhone}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-y-[1vw]">
            <h2 className="font-semibold text-[1.1vw]">Billing Address</h2>
            <InputField
              label="Line 1"
              name="billingAddress"
              fieldType="text"
              value={billingAddress}
              placeholder="Billing Address"
              onChange={(e) => setBillingAddress(e.target.value)}
            />
            <InputField
              label="Line 2"
              name="billingAddressLine2"
              fieldType="text"
              placeholder="Billing Address"
            />
            <div className="grid grid-cols-2 gap-[2vw]">
              <InputField
                label="City"
                name="billingCity"
                fieldType="text"
                value={billingCity}
                placeholder="Enter City"
                onChange={(e) => setBillingCity(e.target.value)}
              />
              <div>
                <label className="block text-darkgray-0 font-medium">
                  State
                </label>
                <Select
                  value={billingState}
                  onChange={(option) => setBillingState(option)}
                  options={states}
                  placeholder="Select State"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[2vw]">
              <div>
                <InputField
                  label="Zipcode"
                  name="billingZipCode"
                  fieldType="text"
                  value={billingZipCode}
                  placeholder="Enter Zip Code"
                  onChange={(e) => setBillingZipCode(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-darkgray-0 font-medium">
                  Phone
                </label>
                <PhoneInput
                  country={"us"}
                  value={phone}
                  onChange={setPhone}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-[2vw] mt-[1vw]">
          <div className="flex items-center space-x-2 mt-[1vw]">
            <input
              type="checkbox"
              checked={sameAsCompanyAddress}
              onChange={() => setSameAsCompanyAddress(!sameAsCompanyAddress)}
              className="accent-purple-0"
            />
            <span className="text-darkgray-0">Same as company address</span>
          </div>
          <div>
            <InputField
              label="Company Email"
              name="companyEmail"
              fieldType="email"
              value={companyEmail}
              placeholder="Enter company email"
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            <Select
              value={industry}
              onChange={(option) => setIndustry(option)}
              options={industries}
              placeholder="Select Industry"
              className="mt-[1vw]"
            />
          </div>
          <div>
            <InputField
              label="Company Website"
              name="companyWebsite"
              fieldType="text"
              value={companyWebsite}
              placeholder="Enter company website"
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
            <Select
              value={companyType}
              onChange={(option) => setCompanyType(option)}
              options={companyTypes}
              placeholder="Select Company Type"
              className="mt-[1vw]"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-[2vw] mt-[1vw]">
          <InputField
            label="First Name"
            name="firstName"
            fieldType="text"
            value={firstName}
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Last Name"
            name="lastName"
            fieldType="text"
            value={lastName}
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-[1.5vw] mt-8">
          <PurpleButton text="Save" type="submit" />
          <WhiteButton
            text="Do Not Save"
            type="button"
            onClick={handleCancel}
          />
        </div>
      </form>
    </div>
  );
};

export default AddClient;
