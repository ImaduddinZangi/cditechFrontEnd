import React, { useState } from "react";
import InputField from "../Tags/InputField";

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

  return (
    <div className="flex w-full my-[3vw] font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[50vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[2vw] text-dark-0 font-semibold text-center">
          Client Registration
        </p>
        <form
          className="space-y-[1.5vw]"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2">
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="name"
                label="Name"
                name="name"
                fieldType="text"
                value={formData.name}
                placeholder="Enter your name"
                autoComplete="name"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="email"
                label="Email"
                name="email"
                fieldType="email"
                value={formData.email}
                placeholder="Enter your email"
                autoComplete="email"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="industry"
                label="Industry"
                name="industry"
                fieldType="text"
                value={formData.industry}
                placeholder="Enter your industry"
                autoComplete="industry"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="password"
                label="Password"
                name="password"
                fieldType="password"
                value={formData.password}
                placeholder="Enter your password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="phone"
                label="Phone"
                name="phone"
                fieldType="text"
                value={formData.phone}
                placeholder="Enter your phone number"
                autoComplete="tel"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="address"
                label="Address"
                name="address"
                fieldType="text"
                value={formData.address}
                placeholder="Enter your address"
                autoComplete="street-address"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="companyName"
                label="Company Name"
                name="companyName"
                fieldType="text"
                value={formData.companyName}
                placeholder="Enter your company name"
                autoComplete="organization"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="companyType"
                label="Company Type"
                name="companyType"
                fieldType="text"
                value={formData.companyType}
                placeholder="Enter your company type"
                autoComplete="organization"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="billingAddress"
                label="Billing Address"
                name="billingAddress"
                fieldType="text"
                value={formData.billingAddress}
                placeholder="Enter your billing address"
                autoComplete="billing street-address"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="paymentMethod"
                label="Payment Method"
                name="paymentMethod"
                fieldType="text"
                value={formData.paymentMethod}
                placeholder="Enter your payment method"
                autoComplete="cc-number"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="customPortalUrl"
                label="Custom Portal URL"
                name="customPortalUrl"
                fieldType="text"
                value={formData.customPortalUrl}
                placeholder="Enter your custom portal URL"
                autoComplete="url"
                onChange={handleChange}
              />
            </div>
            <div className="w-full px-[1vw] mt-[2vw]">
              <InputField
                id="nextBillDate"
                label="Next Bill Date"
                name="nextBillDate"
                fieldType="date"
                value={formData.nextBillDate}
                placeholder=""
                autoComplete="off"
                onChange={handleChange}
              />
            </div>
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
