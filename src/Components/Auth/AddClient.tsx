import React, { useEffect, useState } from "react";
import PurpleButton from "../Tags/PurpleButton";
import InputField from "../Tags/InputField";
import { Link, useNavigate } from "react-router-dom";
import { states } from "../Customer/Constants/usStates";
import cities from "cities.json";
import { ClientRegisterRequest } from "../../redux/api/authApi";
import { Client } from "../../redux/features/clientSlice";
import SelectField, { Option } from "../Tags/SelectField";
import PhoneInput from "../Tags/PhoneInput";

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
  initialData?: Partial<Client>;
}

const companyTypeOptions: Option[] = [
  { label: "LLC", value: "llc" },
  { label: "Corporation", value: "corporation" },
];

const industryOptions: Option[] = [
  { label: "Technology", value: "tech" },
  { label: "Healthcare", value: "health" },
];

const paymentMethodOptions: Option[] = [
  { label: "Credit Card", value: "credit card" },
  { label: "Bank", value: "bank" },
];

const AddClient: React.FC<AddClientProps> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState<string>("");
  const [industry, setIndustry] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [companyWebsite, setCompanyWebsite] = useState<string>("");
  const [companyType, setCompanyType] = useState<Option | null>({
    label: "",
    value: "",
  });
  const [phone, setPhone] = useState<string>("");
  const [billingPhone, setBillingPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<Option | null>({
    label: "",
    value: "",
  });
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

    const companyFullAddress = `${companyAddress}, ${
      companyAddressLine2 ? companyAddressLine2 + ", " : ""
    } ${selectedCity?.label}, ${selectedState?.label}, ${companyZipCode}`;

    const billingFullAddress = sameAsCompanyAddress
      ? companyFullAddress
      : `${billingAddress}, ${
          billingAddressLine2 ? billingAddressLine2 + ", " : ""
        } ${billingCity?.label}, ${billingState?.label}, ${billingZipCode}`;

    const combinedPhones = `Company: ${phone}, Billing: ${billingPhone}`;
    const name = `${firstName} ${lastName}`;

    const clientRegisterRequest = {
      first_name: firstName,
      last_name: lastName,
      name,
      email: companyEmail,
      password,
      industry: industry?.value || "",
      phone: combinedPhones,
      address: companyFullAddress,
      company_name: companyName,
      company_type: companyType?.value || "",
      billing_address: billingFullAddress,
      payment_method: paymentMethod?.value || "",
      custom_portal_url: companyWebsite,
      next_bill_date: nextBillDate,
      account_status: "inactive",
    };

    onSubmit(clientRegisterRequest);
    navigate("/client-dashboard");
  };

  return (
    <div className="p-[2vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1vw]">
          {/* User Information */}
          <InputField
            label="First Name"
            name="firstName"
            fieldType="text"
            value={firstName}
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <InputField
            label="Last Name"
            name="lastName"
            fieldType="text"
            value={lastName}
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <InputField
            label="Email"
            name="email"
            fieldType="email"
            value={companyEmail}
            placeholder="Enter company email"
            onChange={(e) => setCompanyEmail(e.target.value)}
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
        </div>

        {/* Address Section */}
        <div className="grid grid-cols-2 gap-[1vw] mt-[1vw]">
          <div className="grid gap-y-[1vw]">
            <h2 className="font-semibold text-[1.1vw]">Company Address</h2>
            <InputField
              label="Line 1"
              name="companyAddressLine1"
              fieldType="text"
              value={companyAddress}
              placeholder="Address"
              onChange={(e) => setCompanyAddress(e.target.value)}
              required
            />
            <InputField
              label="Line 2"
              name="companyAddressLine2"
              fieldType="text"
              placeholder="Address"
              value={companyAddressLine2}
              onChange={(e) => setCompanyAddressLine2(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-[1vw]">
              <div>
                <SelectField
                  label="State"
                  value={selectedState}
                  placeholder="Select State"
                  onChange={(option) => {
                    setSelectedState(option);
                    setSelectedCity(null);
                  }}
                  options={states}
                  required
                />
              </div>
              <div>
                <SelectField
                  label="City"
                  value={selectedCity}
                  onChange={(option) => setSelectedCity(option)}
                  options={citiesOfSelectedState}
                  placeholder="Select City"
                  disabled={!selectedState}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-[1vw]">
              <div>
                <InputField
                  label="Zipcode"
                  name="companyZipCode"
                  fieldType="text"
                  value={companyZipCode}
                  placeholder="Enter Zip Code"
                  onChange={(e) => setCompanyZipCode(e.target.value)}
                  required
                />
              </div>
              <div>
                <PhoneInput
                  label="companyPhone"
                  name="companyPhone"
                  value={phone}
                  onChange={setPhone}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid gap-y-[1vw]">
            <h2 className="font-semibold text-[1.1vw]">Billing Address</h2>
            <InputField
              label="Line 1"
              name="billingAddressLine1"
              fieldType="text"
              value={billingAddress}
              placeholder="Billing Address"
              onChange={(e) => setBillingAddress(e.target.value)}
              disabled={sameAsCompanyAddress}
              required
            />
            <InputField
              label="Line 2"
              name="billingAddressLine2"
              fieldType="text"
              placeholder="Billing Address"
              value={billingAddressLine2}
              onChange={(e) => setBillingAddressLine2(e.target.value)}
              disabled={sameAsCompanyAddress}
              required
            />
            <div className="grid grid-cols-2 gap-[1vw]">
              <div>
                <SelectField
                  label="State"
                  value={billingState}
                  onChange={(option) => {
                    setBillingState(option);
                    setBillingCity(null);
                  }}
                  options={states}
                  placeholder="Select State"
                  disabled={sameAsCompanyAddress}
                  required
                />
              </div>
              <div>
                <SelectField
                  label="City"
                  value={billingCity}
                  onChange={(option) => setBillingCity(option)}
                  options={billingCitiesOfSelectedState}
                  disabled={!billingState || sameAsCompanyAddress}
                  placeholder="Select City"
                  required
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
                  required
                />
              </div>
              <div>
                <PhoneInput
                  label="Phone"
                  name="phone"
                  value={billingPhone}
                  onChange={setBillingPhone}
                  required
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
              className="accent-purple-0 w-[1vw] h-[1vw]"
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
            required
          />
          <div>
            <SelectField
              label="Company Type:"
              name="companyType"
              value={companyType}
              options={companyTypeOptions}
              onChange={(option) => setCompanyType(option)}
              required
            />
          </div>
          <div>
            <SelectField
              label="Industry"
              name="industry"
              value={industry}
              options={industryOptions}
              onChange={(option) => setIndustry(option)}
              required
            />
          </div>
          <div>
            <SelectField
              label="Payment Method"
              name="paymentMethod"
              value={paymentMethod}
              options={paymentMethodOptions}
              onChange={(option) => setPaymentMethod(option)}
              required
            />
          </div>
          <InputField
            label="Company Website"
            name="companyWebsite"
            fieldType="text"
            value={companyWebsite}
            placeholder="Enter company website"
            onChange={(e) => setCompanyWebsite(e.target.value)}
            required
          />
          <InputField
            label="Next Bill Date"
            name="nextBillDate"
            fieldType="date"
            value={nextBillDate}
            placeholder="Select Next Bill Date"
            onChange={(e) => setNextBillDate(e.target.value)}
            required
          />
        </div>
        <div className="mt-[2vw] w-full flex flex-col items-center">
          <PurpleButton text="Sign Up" type="submit" className="w-1/2" />
        </div>
        <div className="text-center text-[1vw] mt-[1vw] flex flex-row w-full items-center justify-center">
          <p className="text-gray-0 text-[1vw]">
            Already have an account?&nbsp;
          </p>
          <Link
            to="/client-login"
            className="text-purple-0 text-[1vw] font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddClient;
