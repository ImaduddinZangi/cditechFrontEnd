import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Select, { SingleValue } from "react-select";
import "react-phone-input-2/lib/style.css";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import InputField from "../Tags/InputField";
import { useNavigate } from "react-router-dom";
import { states } from "../Customer/Constants/usStates";
import cities from "cities.json";
import { ClientRegisterRequest } from "../../redux/api/authApi";
import { Client } from "../../redux/features/clientSlice";

interface Option {
  value: string;
  label: string;
}

interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
}

interface AddClientProps {
  onSubmit: (data: ClientRegisterRequest) => void;
  initialData?: Partial<Client>
}

const AddClient: React.FC<AddClientProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyType, setCompanyType] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [billingPhone, setBillingPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [nextBillDate, setNextBillDate] = useState<string>("");

  // Addresses
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [billingState, setBillingState] = useState<Option | null>(null);
  const [billingCity, setBillingCity] = useState<Option | null>(null);
  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState<Option[]>(
    []
  );
  const [billingCitiesOfSelectedState, setBillingCitiesOfSelectedState] =
    useState<Option[]>([]);
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyAddressLine2, setCompanyAddressLine2] = useState("");
  const [companyZipCode, setCompanyZipCode] = useState("");

  const [billingAddress, setBillingAddress] = useState("");
  const [billingAddressLine2, setBillingAddressLine2] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [sameAsCompanyAddress, setSameAsCompanyAddress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getCities = (stateValue: string | null): Option[] => {
      return stateValue
        ? (cities as City[])
            .filter((city) => city.admin1 === stateValue)
            .map((city) => ({
              value: city.name,
              label: city.name,
            }))
        : [];
    };

    setCitiesOfSelectedState(getCities(selectedState?.value || null));
    setBillingCitiesOfSelectedState(getCities(billingState?.value || null));
  }, [selectedState, billingState]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const name = `${firstName} ${lastName}`;

    const companyFullAddress = `${companyAddress}, ${
      companyAddressLine2 ? companyAddressLine2 + ", " : ""
    } ${selectedCity?.label}, ${selectedState?.label}, ${companyZipCode}`;

    const billingFullAddress = sameAsCompanyAddress
      ? companyFullAddress
      : `${billingAddress}, ${
          billingAddressLine2 ? billingAddressLine2 + ", " : ""
        } ${billingCity?.label}, ${billingState?.label}, ${billingZipCode}`;

    const combinedPhones = `Company: ${phone}, Billing: ${billingPhone}`;

    const clientRegisterRequest = {
      name,
      email: companyEmail,
      password,
      industry,
      phone: combinedPhones,
      address: companyFullAddress,
      company_name: companyName,
      company_type: companyType,
      billing_address: billingFullAddress,
      payment_method: paymentMethod,
      custom_portal_url: companyWebsite,
      next_bill_date: nextBillDate,
      account_status: "inactive",
    };

    onSubmit(clientRegisterRequest);
    navigate("/client-dashboard");
  };

  const handleCancel = () => {
    navigate("/client-dashboard");
  };

  return (
    <div className="p-[2vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-[1vw]">
          {/* User Information */}
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
          <InputField
            label="Password"
            name="password"
            fieldType="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
              value={companyAddressLine2}
              onChange={(e) => setCompanyAddressLine2(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-[2vw]">
              <div>
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  State
                </label>
                <Select
                  value={selectedState}
                  onChange={(option: SingleValue<Option>) => {
                    setSelectedState(option);
                    setSelectedCity(null);
                  }}
                  options={states}
                  placeholder="Select State"
                />
              </div>
              <div>
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  City
                </label>
                <Select
                  value={selectedCity}
                  onChange={(option: SingleValue<Option>) =>
                    setSelectedCity(option)
                  }
                  options={citiesOfSelectedState}
                  isDisabled={!selectedState}
                  placeholder="Select City"
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
                <label className="block text-darkgray-0 font-medium text-[1vw]">
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
              disabled={sameAsCompanyAddress}
            />
            <InputField
              label="Line 2"
              name="billingAddressLine2"
              fieldType="text"
              placeholder="Billing Address"
              value={billingAddressLine2}
              onChange={(e) => setBillingAddressLine2(e.target.value)}
              disabled={sameAsCompanyAddress}
            />
            <div className="grid grid-cols-2 gap-[2vw]">
              <div>
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  State
                </label>
                <Select
                  value={billingState}
                  onChange={(option: SingleValue<Option>) => {
                    setBillingState(option);
                    setBillingCity(null);
                  }}
                  options={states}
                  placeholder="Select State"
                  isDisabled={sameAsCompanyAddress} // Disable if same as company address
                />
              </div>
              <div>
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  City
                </label>
                <Select
                  value={billingCity}
                  onChange={(option: SingleValue<Option>) =>
                    setBillingCity(option)
                  }
                  options={billingCitiesOfSelectedState}
                  isDisabled={!billingState || sameAsCompanyAddress} // Disable if same as company address
                  placeholder="Select City"
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
                  disabled={sameAsCompanyAddress}
                />
              </div>
              <div>
                <label className="block text-darkgray-0 font-medium text-[1vw]">
                  Phone
                </label>
                <PhoneInput
                  country={"us"}
                  value={billingPhone}
                  onChange={setBillingPhone}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                  disabled={sameAsCompanyAddress} // Disable if same as company address
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <div className="flex items-center space-x-2 mt-[1vw]">
            <input
              type="checkbox"
              checked={sameAsCompanyAddress}
              onChange={() => setSameAsCompanyAddress(!sameAsCompanyAddress)}
              className="accent-purple-0"
            />
            <span className="text-darkgray-0">Same as company address</span>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-2 gap-[1vw]">
          <InputField
            label="Company Name:"
            name="companyName"
            fieldType="text"
            value={companyName}
            placeholder="Enter company name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <InputField
            label="Company Email"
            name="companyEmail"
            fieldType="email"
            value={companyEmail}
            placeholder="Enter company email"
            onChange={(e) => setCompanyEmail(e.target.value)}
          />
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Company Type:
            </label>
            <select
              name="companyType"
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
            >
              <option value="llc">LLC</option>
              <option value="corporation">Corporation</option>
            </select>
          </div>
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Industry:
            </label>
            <select
              name="industry"
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            >
              <option value="tech">Technology</option>
              <option value="health">Healthcare</option>
            </select>
          </div>
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Payment Method:
            </label>
            <select
              name="paymentMethod"
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit card">Credit Card</option>
              <option value="bank">Bank</option>
            </select>
          </div>
          <InputField
            label="Company Website"
            name="companyWebsite"
            fieldType="text"
            value={companyWebsite}
            placeholder="Enter company website"
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
          <InputField
            label="Next Bill Date"
            name="nextBillDate"
            fieldType="date"
            value={nextBillDate}
            placeholder="Select Next Bill Date"
            onChange={(e) => setNextBillDate(e.target.value)}
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
