import React, { forwardRef } from "react";

interface InputFieldProps {
  label?: string;
  name?: string;
  fieldType: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  fieldClassName?: string;
  disabled?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      name,
      fieldType,
      placeholder,
      value,
      required = false,
      onChange,
      labelClassName,
      fieldClassName,
      disabled,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={name}
            className={`block text-[1vw] font-medium text-darkgray-0 ${labelClassName}`}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          type={fieldType}
          autoComplete="on"
          required={required}
          className={`mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none ${fieldClassName}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
    );
  }
);

export default InputField;
