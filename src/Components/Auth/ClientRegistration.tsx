import React, { useState } from "react";

interface ClientRegistrationProps {
  onSubmit: (
    name: string,
    email: string,
    industry: string,
    password: string,
    phone: string,
    address: string,
    billingAddress: string,
    paymentMethod: string,
    type: string,
    status: string,
    nextBillDate: string
  ) => void;
}

const ClientRegistration: React.FC<ClientRegistrationProps> = ({
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [type, setType] = useState("");
  const [nextBillDate, setNextBillDate] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(
      name,
      email,
      industry,
      password,
      phone,
      address,
      billingAddress,
      paymentMethod,
      type,
      "Inactive",
      nextBillDate
    );
  };

  return (
    <div className="flex w-full my-[3vw] font-inter items-center justify-center h-full">
      <div className="w-full max-w-[80vw] md:max-w-[50vw] p-[4vw] md:p-[2vw] space-y-[0.5vh] bg-white rounded shadow-lg">
        <p className="text-[5vw] md:text-[2.5vw] text-dark-0 font-semibold text-center">
          Client Portal
        </p>
        <form className="space-y-[3vw] md:space-y-[1.5vw]" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-[1vw]">
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="name"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="email"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="industry"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Industry
              </label>
              <input
                id="industry"
                name="industry"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="password"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="phone"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="address"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="billingAddress"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Billing Address
              </label>
              <input
                id="billingAddress"
                name="billingAddress"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your billing address"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="paymentMethod"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Payment Method
              </label>
              <input
                id="paymentMethod"
                name="paymentMethod"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your payment method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="type"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Type
              </label>
              <input
                id="type"
                name="type"
                type="text"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                placeholder="Enter your type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-[1vw] mt-[2vw]">
              <label
                htmlFor="nextBillDate"
                className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
              >
                Next Bill Date
              </label>
              <input
                id="nextBillDate"
                name="nextBillDate"
                type="date"
                required
                className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                value={nextBillDate}
                onChange={(e) => setNextBillDate(e.target.value)}
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
            <a href="/client-login" className="text-purple-0 font font-semibold">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientRegistration;
