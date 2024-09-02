import React, { MutableRefObject } from "react";

interface InputFieldProps {
  label?: string;
  htmlFor?: string;
  id?: string;
  name?: string;
  fieldType: string;
  autoComplete?: string;
  placeholder?: string;
  value?: string | number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: MutableRefObject<HTMLInputElement | null>;
}

const InputField: React.FC<InputFieldProps> = ({
  htmlFor,
  label,
  id,
  name,
  fieldType,
  autoComplete,
  placeholder,
  value,
  required = false,
  onChange,
  ref,
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        name={name}
        type={fieldType}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
