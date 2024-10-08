import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

export interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label?: string;
  name?: string;
  options?: Option[];
  value?: Option | null;
  onChange: (option: Option | null) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-darkgray-0 font-medium text-[1vw]"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <Combobox
        value={value}
        onChange={(selectedValue) => {
          onChange(selectedValue);
          setIsOpen(false);
          setQuery("");
        }}
      >
        <div className="relative mt-1">
          <Combobox.Input
            className="block w-full border py-[0.3vw] px-[0.5vw] pr-[2vw] rounded-[0.4vw] text-[1vw] placeholder:text-lightgray-0 opacity-60 focus:outline-none"
            displayValue={(option: Option) => option?.label || ""}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            required={required}
            name={name}
            id={name}
            disabled={disabled}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-[0.5vw]">
            <FiChevronDown
              className="w-[1vw] h-[1vw] text-gray-0"
              aria-hidden="true"
            />
          </Combobox.Button>
          {isOpen && (
            <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border max-h-60 rounded-md py-[0.25vw] text-[1vw] shadow-lg overflow-auto focus:outline-none">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="cursor-default select-none py-[0.5vw] px-[1vw] text-darkgray-0">
                  No options found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-[0.5vw] pl-[0.67vw] pr-[2.2vw] ${
                        active ? "bg-purple-0 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-[1vw] ${
                              active ? "text-white" : "text-purple-0"
                            }`}
                          >
                            {/* Optional check icon */}
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  );
};

export default SelectField;
