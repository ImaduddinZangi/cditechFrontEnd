import React, { useState } from "react";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface ServiceDetails {
  serviceName: string;
  serviceNo: string;
  description: string;
  billingId: string;
  versionDate: string;
  price: string;
  isTaxable: boolean;
}

const ManageServices: React.FC = () => {
  const [serviceDetails] = useState<ServiceDetails>({
    serviceName: "Monthly Lift Station Inspection",
    serviceNo: "918267",
    description:
      "Complete Inspection of Lift Station\nAll Pumps, Parts, Basin with report",
    billingId: "ID Number is Billing Software",
    versionDate: "07-26-19, 12:00",
    price: "$125.00",
    isTaxable: true,
  });

  const handleEdit = () => {
    console.log("Edit service");
  };

  const handleRefresh = () => {
    console.log("Refresh service");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      <div className="grid grid-cols-2 gap-[1vw]">
        {/* Left Section */}
        <div>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
            Service Name:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter">
            {serviceDetails.serviceName}
          </p>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter mt-[1vw]">
            Service Description:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter whitespace-pre-line">
            {serviceDetails.description}
          </p>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter mt-[1vw]">
            Price:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter">
            {serviceDetails.price}
          </p>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter mt-[1vw]">
            Taxable:
          </p>
          <div className="flex space-x-4 text-[1vw]">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="Yes"
                checked={serviceDetails.isTaxable}
                readOnly
                className="accent-purple-0"
              />
              <span className="text-gray-0">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="No"
                checked={!serviceDetails.isTaxable}
                readOnly
                className="accent-purple-0"
              />
              <span className="text-gray-0">No</span>
            </label>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
            Service No:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter">
            {serviceDetails.serviceNo}
          </p>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter mt-[1vw]">
            Billing ID:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter">
            {serviceDetails.billingId}
          </p>
          <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter mt-[1vw]">
            Version Date:
          </p>
          <p className="text-[1vw] text-gray-0 font-medium font-inter">
            {serviceDetails.versionDate}
          </p>
        </div>
      </div>
      <div className="flex justify-end space-x-4 mt-[-2vw]">
        <PurpleButton text="Edit Service" onClick={handleEdit} />
        <WhiteButton text="Refresh" onClick={handleRefresh} />
      </div>
    </div>
  );
};

export default ManageServices;
