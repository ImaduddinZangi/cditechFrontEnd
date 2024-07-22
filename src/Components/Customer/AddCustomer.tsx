// src/components/AddCustomer.tsx

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import Select, { SingleValue } from 'react-select';
import 'react-phone-input-2/lib/style.css';
import { getStates } from 'us-state-codes';
import cities from 'cities.json';

interface City {
  city: string;
  state: string;
}

interface Option {
  value: string;
  label: string;
}

const AddCustomer: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [previousPhone, setPreviousPhone] = useState('');
  const [selectedState, setSelectedState] = useState<Option | null>(null);
  const [selectedCity, setSelectedCity] = useState<Option | null>(null);
  const [billingState, setBillingState] = useState<Option | null>(null);
  const [billingCity, setBillingCity] = useState<Option | null>(null);

  const states = getStates().map((state) => ({ value: state, label: state }));
  const citiesOfSelectedState = selectedState ? (cities as City[]).filter((city) => city.state === selectedState.value).map((city) => ({ value: city.city, label: city.city })) : [];
  const billingCitiesOfSelectedState = billingState ? (cities as City[]).filter((city) => city.state === billingState.value).map((city) => ({ value: city.city, label: city.city })) : [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">User</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service Contact</label>
            <PhoneInput
              country={'us'}
              value={phone}
              onChange={setPhone}
              containerStyle={{ width: '100%' }}
              inputStyle={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="None" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Phone Number</label>
            <PhoneInput
              country={'us'}
              value={previousPhone}
              onChange={setPreviousPhone}
              containerStyle={{ width: '100%' }}
              inputStyle={{ width: '100%' }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gate Code</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="None" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="123 Main Street" />
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
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Select
              value={selectedState}
              onChange={(option: SingleValue<Option>) => setSelectedState(option)}
              options={states}
              placeholder="Select State"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter zip code" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Billing Address</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="123 Main Street" />
          </div>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <Select
              value={billingState}
              onChange={(option: SingleValue<Option>) => setBillingState(option)}
              options={states}
              placeholder="Select State"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Zipcode</label>
            <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Enter zip code" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700">Do Not Save And Cancel</button>
          <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700">Save & create user</button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
