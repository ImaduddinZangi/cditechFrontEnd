import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import Select, { SingleValue } from "react-select";
import "react-phone-input-2/lib/style.css";
import cities from "cities.json";
import { states } from "./Constants/usStates";
import { useNavigate } from "react-router-dom";
import InputField from "../Tags/InputField";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

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

interface AddCustomerProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    gate_code: string;
    previousPhone: string;
    streetAddress: string;
    billingAddress: string;
  }) => void;
  initialData?: {
    name: string;
    email: string;
    phone: string;
    gate_code: string;
    previous_phone_number: string;
    address: string;
    billing_address: string;
  };
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [gateCode, setGateCode] = useState(initialData?.gate_code || "");
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
      const addressParts = initialData.address.split(", ");
      const billingAddressParts = initialData.billing_address.split(", ");

      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setGateCode(initialData.gate_code);
      setPreviousPhone(initialData.previous_phone_number);
      setStreetAddress(addressParts.slice(1, -2).join(", "));
      setSelectedCity({
        value: addressParts[addressParts.length - 2],
        label: addressParts[addressParts.length - 2],
      });
      setSelectedState({
        value: addressParts[addressParts.length - 1],
        label: addressParts[addressParts.length - 1],
      });
      setZipCode(addressParts[0]);

      setBillingStreetAddress(billingAddressParts.slice(1, -2).join(", "));
      setBillingCity({
        value: billingAddressParts[billingAddressParts.length - 2],
        label: billingAddressParts[billingAddressParts.length - 2],
      });
      setBillingState({
        value: billingAddressParts[billingAddressParts.length - 1],
        label: billingAddressParts[billingAddressParts.length - 1],
      });
      setBillingZipCode(billingAddressParts[0]);
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
      previousPhone,
      streetAddress: combinedStreetAddress,
      billingAddress: combinedBillingAddress,
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Service Contact
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
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              Previous Phone Number
            </label>
            <PhoneInput
              country={"us"}
              value={previousPhone}
              onChange={setPreviousPhone}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
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
            />
          </div>
          <div>
            <label className="block text-darkgray-0 font-medium text-[1vw]">
              City
            </label>
            <Select
              value={billingCity}
              onChange={(option: SingleValue<Option>) => setBillingCity(option)}
              options={billingCitiesOfSelectedState}
              isDisabled={!billingState}
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
