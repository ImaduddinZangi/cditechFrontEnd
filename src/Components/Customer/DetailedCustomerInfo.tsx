import React, { useEffect } from "react";
import { useGetCustomerByIdQuery } from "../../redux/api/customerApi";
import { useAppSelector } from "../../redux/store";
import Loader from "../Constants/Loader";

const DetailedCustomerInfo: React.FC = () => {
  const selectedCustomerId = useAppSelector(
    (state) => state.customer.selectedCustomerId
  );
  const {
    data: customer,
    error,
    isLoading,
  } = useGetCustomerByIdQuery(selectedCustomerId || "");

  useEffect(() => {
    if (!selectedCustomerId) {
      const idFromStorage = localStorage.getItem("selectedCustomerId");
      if (idFromStorage) {
        // Dispatch action to set selectedCustomerId from local storage if necessary
      }
    }
  }, [selectedCustomerId]);

  if (isLoading)
    return (
      <p>
        <Loader />
      </p>
    );
  if (error) return <p>Error loading customer details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {customer && (
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Name:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.name}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Service Address:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.service_address}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Type:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.type}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Status:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.status}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Billing Address:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.billing_address}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Service Contact:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.service_contact}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Gate Code:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.gate_code}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Previous Phone Number:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {customer.previous_phone_number}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedCustomerInfo;
