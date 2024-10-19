import React, { useState, useEffect, useRef } from "react";
import { countries, Country } from "./countries";
import { FiChevronDown } from "react-icons/fi";

interface PhoneInputProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  id?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  name,
  value = "",
  onChange,
  required = false,
  placeholder = "Enter phone number",
  disabled = false,
}) => {
  const defaultCountry = countries.find((country) => country.iso2 === "US") || null;
  const [inputValue, setInputValue] = useState<string>(defaultCountry ? defaultCountry.dialCode : value);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const parseCountryCode = () => {
      let matchedCountry: Country | null = null;
      for (const country of countries) {
        if (inputValue.startsWith(country.dialCode)) {
          matchedCountry = country;
          break;
        }
      }
      setSelectedCountry(matchedCountry);
    };

    parseCountryCode();
  }, [inputValue]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInputValue(val);
    onChange?.(val);
  };

  // Handle country selection from dropdown
  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);

    // Remove existing country code from inputValue
    let phoneWithoutCountryCode = inputValue;

    if (selectedCountry && inputValue.startsWith(selectedCountry.dialCode)) {
      phoneWithoutCountryCode = inputValue.slice(
        selectedCountry.dialCode.length
      );
    }

    // Prepend the new country code
    const newValue = country.dialCode + phoneWithoutCountryCode;
    setInputValue(newValue);
    onChange?.(newValue);

    // Focus the input field
    inputRef.current?.focus();
  };

  // Prepare country options for the dropdown
  const countryOptions = countries;

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-darkgray-0 font-medium text-[1vw]"
        >
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <div className="relative mt-1">
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center cursor-pointer focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="text-[1vw] font-medium px-2">
              {selectedCountry ? selectedCountry.iso2 : "Select"}
            </span>
            <FiChevronDown className="w-[1vw] h-[1vw] text-gray-0" />
          </button>
          <input
            ref={inputRef}
            type="tel"
            name={name}
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            autoComplete="on"
            id={name}
            className="block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] ml-[0.5vw] placeholder:text-lightgray-0 opacity-60 focus:outline-none"
          />
        </div>
        {isDropdownOpen && (
          <ul className="absolute z-10 mt-1 bg-white border rounded-md py-[0.25vw] text-[1vw] shadow-lg overflow-auto max-h-60 w-full">
            {countryOptions.map((country) => (
              <li
                key={country.iso2}
                className="cursor-pointer px-[0.5vw] py-1 hover:bg-purple-0 hover:text-white"
                onClick={() => handleCountryChange(country)}
              >
                {country.name} ({country.dialCode})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
