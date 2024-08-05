import React, { useState } from "react";

interface ClientRegistrationProps {
  onSubmit: (
    name: string,
    email: string,
    industry: string,
    password: string,
    phone: string,
    address: string,
    companyName: string,
    companyType: string,
    billingAddress: string,
    paymentMethod: string,
    customPortalUrl: string,
    nextBillDate: string
  ) => void;
}

const ClientRegistration: React.FC<ClientRegistrationProps> = ({
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    industry: "",
    password: "",
    phone: "",
    address: "",
    companyName: "",
    companyType: "",
    billingAddress: "",
    paymentMethod: "",
    customPortalUrl: "",
    nextBillDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      formData.name,
      formData.email,
      formData.industry,
      formData.password,
      formData.phone,
      formData.address,
      formData.companyName,
      formData.companyType,
      formData.billingAddress,
      formData.paymentMethod,
      formData.customPortalUrl,
      formData.nextBillDate
    );
  };

  const renderInputField = (
    id: string,
    label: string,
    type: string,
    value: string,
    placeholder: string,
    required: boolean = true
  ) => (
    <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
      <label
        htmlFor={id}
        className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <div className="flex w-full my-[3vw] font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[50vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[5vw] md:text-[2.5vw] text-dark-0 font-semibold text-center">
          Client Portal
        </p>
        <form
          className="space-y-[3vw] md:space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-wrap -mx-[1vw]">
            {renderInputField(
              "name",
              "Name",
              "text",
              formData.name,
              "Enter your name"
            )}
            {renderInputField(
              "email",
              "Email",
              "email",
              formData.email,
              "Enter your email"
            )}
            {renderInputField(
              "industry",
              "Industry",
              "text",
              formData.industry,
              "Enter your industry"
            )}
            {renderInputField(
              "password",
              "Password",
              "password",
              formData.password,
              "Enter your password"
            )}
            {renderInputField(
              "phone",
              "Phone",
              "text",
              formData.phone,
              "Enter your phone number"
            )}
            {renderInputField(
              "address",
              "Address",
              "text",
              formData.address,
              "Enter your address"
            )}
            {renderInputField(
              "companyName",
              "Company Name",
              "text",
              formData.companyName,
              "Enter your company name"
            )}
            {renderInputField(
              "companyType",
              "Company Type",
              "text",
              formData.companyType,
              "Enter your company type"
            )}
            {renderInputField(
              "billingAddress",
              "Billing Address",
              "text",
              formData.billingAddress,
              "Enter your billing address"
            )}
            {renderInputField(
              "paymentMethod",
              "Payment Method",
              "text",
              formData.paymentMethod,
              "Enter your payment method"
            )}
            {renderInputField(
              "customPortalUrl",
              "Custom Portal URL",
              "text",
              formData.customPortalUrl,
              "Enter your custom portal URL"
            )}
            {renderInputField(
              "nextBillDate",
              "Next Bill Date",
              "date",
              formData.nextBillDate,
              "",
              false
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-[2vw] md:px-[1vw] py-[1vw] md:py-[0.5vw] text-[2.5vw] md:text-[1vw] font-semibold text-white bg-purple-0 rounded-[1vw] md:rounded-[0.5vw] hover:bg-opacity-95 focus:outline-none focus:opacity-90"
            >
              Register
            </button>
          </div>
          <div className="text-center text-[2.5vw] md:text-[1vw] flex flex-row w-full items-center justify-center">
            <p className="text-gray-0">Already have an account?&nbsp;</p>
            <a
              href="/client-login"
              className="text-purple-0 font font-semibold"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientRegistration;
