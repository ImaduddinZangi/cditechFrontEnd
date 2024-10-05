import React, { useState, useEffect } from "react";
import cities from "cities.json";
import { states } from "./Constants/usStates";
import { useNavigate } from "react-router-dom";
import InputField from "../Tags/InputField";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import SelectField, { Option } from "../Tags/SelectField";
import PhoneInput from "../Tags/PhoneInput";
import { CreateCustomer, Customer } from "../../redux/features/customerSlice";

interface City {
  name: string;
  lat: string;
  lng: string;
  country: string;
  admin1: string;
  admin2: string;
}

interface AddCustomerProps {
  onSubmit: (data: CreateCustomer) => void;
  initialData?: Partial<Customer>;
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [gateCode, setGateCode] = useState(initialData?.gate_code || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [previousPhone, setPreviousPhone] = useState(
    initialData?.previous_phone_number || ""
  );
  const [streetAddress, setStreetAddress] = useState(
    initialData?.address || ""
  );
  const [billingStreetAddress, setBillingStreetAddress] = useState(
    initialData?.billing_address || ""
  );
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [billingState, setBillingState] = useState<Option | null>(null);
  const [billingCity, setBillingCity] = useState<Option | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState<Option[]>(
    []
  );
  const [billingCitiesOfSelectedState, setBillingCitiesOfSelectedState] =
    useState<Option[]>([]);
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

  useEffect(() => {
    if (initialData) {
      const addressParts = initialData.address
        ? initialData.address.split(", ")
        : [];
      const billingAddressParts = initialData.billing_address
        ? initialData.billing_address.split(", ")
        : [];

      setName(initialData.name ?? "");
      setEmail(initialData.email ?? "");
      setPhone(initialData.phone ?? "");
      setGateCode(initialData.gate_code ?? "");
      setPreviousPhone(initialData.previous_phone_number ?? "");

      if (addressParts.length > 0) {
        setStreetAddress(addressParts.slice(1, -2).join(", "));
        setSelectedCity({
          value: addressParts[addressParts.length - 2] ?? "",
          label: addressParts[addressParts.length - 2] ?? "",
        });
        setSelectedState({
          value: addressParts[addressParts.length - 1] ?? "",
          label: addressParts[addressParts.length - 1] ?? "",
        });
        setZipCode(addressParts[0] ?? "");
      }

      if (billingAddressParts.length > 0) {
        setBillingStreetAddress(billingAddressParts.slice(1, -2).join(", "));
        setBillingCity({
          value: billingAddressParts[billingAddressParts.length - 2] ?? "",
          label: billingAddressParts[billingAddressParts.length - 2] ?? "",
        });
        setBillingState({
          value: billingAddressParts[billingAddressParts.length - 1] ?? "",
          label: billingAddressParts[billingAddressParts.length - 1] ?? "",
        });
        setBillingZipCode(billingAddressParts[0] ?? "");
      }
    }
  }, [initialData]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const combinedStreetAddress = `${zipCode}, ${streetAddress}, ${selectedCity?.label}, ${selectedState?.label}`;
    const combinedBillingAddress = `${billingZipCode}, ${billingStreetAddress}, ${billingCity?.label}, ${billingState?.label}`;

    onSubmit({
      name,
      email,
      gate_code: gateCode,
      phone,
      previous_phone_number: previousPhone,
      address: combinedStreetAddress,
      billing_address: combinedBillingAddress,
      service_address: combinedStreetAddress,
      type: "customer",
      status: "active",
      service_contact: phone,
    });
  };

  const handleCancel = () => {
    navigate("/customer-table");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-[1.5vw]">
          <div>
            <InputField
              label="Customer Name"
              name="name"
              fieldType="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <PhoneInput
              label="Service Contact"
              name="phone"
              value={phone}
              onChange={setPhone}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1.5vw]">
          <div>
            <InputField
              label="Email Address"
              name="email"
              fieldType="email"
              value={email}
              placeholder="None"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <PhoneInput
              label="Previous Phone Number"
              name="previousPhone"
              value={previousPhone}
              onChange={setPreviousPhone}
            />
          </div>
          <div>
            <InputField
              label="Gate Code"
              name="gateCode"
              fieldType="text"
              value={gateCode}
              placeholder="None"
              onChange={(e) => setGateCode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-[1.5vw]">
          <div>
            <InputField
              label="Street Address"
              name="streetAddress"
              fieldType="text"
              value={streetAddress}
              placeholder="123 Main Street"
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
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
          <div>
            <InputField
              label="Zipcode"
              name="zipCode"
              fieldType="text"
              value={zipCode}
              placeholder="Enter zip code"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[1.5vw]">
          <div>
            <InputField
              label="Billing Address"
              name="billingStreetAddress"
              fieldType="text"
              value={billingStreetAddress}
              placeholder="123 Main Street"
              onChange={(e) => setBillingStreetAddress(e.target.value)}
            />
          </div>
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
            />
          </div>
          <div>
            <SelectField
              label="City"
              value={billingCity}
              onChange={(option) => setBillingCity(option)}
              options={billingCitiesOfSelectedState}
              disabled={!billingState}
              placeholder="Select City"
            />
          </div>
          <div>
            <InputField
              label="Zipcode"
              name="billingZipCode"
              fieldType="text"
              value={billingZipCode}
              placeholder="Enter zip code"
              onChange={(e) => setBillingZipCode(e.target.value)}
            />
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

export default AddCustomer;
