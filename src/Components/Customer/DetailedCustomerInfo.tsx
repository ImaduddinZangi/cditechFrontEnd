
import React from "react";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { getUserId } from "../../utils/utils";

const DetailedCustomerInfo: React.FC = () => {
  const clientId = getUserId();
  const {
    data: client,
    error,
    isLoading,
  } = useGetClientByIdQuery(clientId || "");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading client details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {client && (
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Client Name:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.name}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Type:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.type}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Status:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.account_status}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Client ID:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.id}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Client Address:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.address}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Billing Address:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.billing_address}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Phone:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.phone}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Client Email:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.email}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Payment method:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.payment_method}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Next bill date:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {client.next_bill_date}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedCustomerInfo;
