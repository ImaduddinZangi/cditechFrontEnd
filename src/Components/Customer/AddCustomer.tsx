import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import Select, { SingleValue } from "react-select";
import "react-phone-input-2/lib/style.css";
import cities from "cities.json";
import { states } from "./Constants/usStates";

interface City {
  city: string;
  state: string;
}

interface Option {
  value: string;
  label: string;
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
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gateCode, setGateCode] = useState("");
  const [previousPhone, setPreviousPhone] = useState("");
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [billingState, setBillingState] = useState<Option | null>(null);
  const [billingCity, setBillingCity] = useState<Option | null>(null);
  const [streetAddress, setStreetAddress] = useState("");
  const [billingStreetAddress, setBillingStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");
  const [citiesOfSelectedState, setCitiesOfSelectedState] = useState<Option[]>([]);
  const [billingCitiesOfSelectedState, setBillingCitiesOfSelectedState] = useState<Option[]>([]);

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

  useEffect(() => {
    const getCities = (stateValue: string | null) => {
      return stateValue
        ? (cities as City[])
            .filter((city) => city.state === stateValue)
            .map((city) => ({
              value: city.city,
              label: city.city,
            }))
        : [];
    };

    setCitiesOfSelectedState(getCities(selectedState?.value || null));
    setBillingCitiesOfSelectedState(getCities(billingState?.value || null));
  }, [selectedState, billingState]);

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">User</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Contact</label>
            <PhoneInput
              country={"us"}
              value={phone}
              onChange={setPhone}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="None"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Phone Number</label>
            <PhoneInput
              country={"us"}
              value={previousPhone}
              onChange={setPreviousPhone}
              containerStyle={{ width: "100%" }}
              inputStyle={{ width: "100%" }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gate Code</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="None"
              value={gateCode}
              onChange={(e) => setGateCode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="123 Main Street"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
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
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Select
              value={selectedCity}
              onChange={(option: SingleValue<Option>) => setSelectedCity(option)}
              options={citiesOfSelectedState}
              isDisabled={!selectedState}
              placeholder="Select City"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input
              type="text"
              value={billingStreetAddress}
              onChange={(e) => setBillingStreetAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="123 Main Street"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <Select
              value={billingCity}
              onChange={(option: SingleValue<Option>) => setBillingCity(option)}
              options={billingCitiesOfSelectedState}
              isDisabled={!billingState}
              placeholder="Select City"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter zip code"
              value={billingZipCode}
              onChange={(e) => setBillingZipCode(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            Do Not Save And Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700"
          >
            Save & create user
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
