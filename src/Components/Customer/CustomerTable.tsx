import React from "react";
import {
  useGetCustomersQuery,
  useDeleteCustomerMutation,
} from "../../redux/api/customerApi";
import { useAppDispatch } from "../../redux/store";
import { setSelectedCustomerId } from "../../redux/features/customerSlice";
import NextButton from "./Constants/NextButton";
import PreviousButton from "./Constants/PreviousButton";
import ActiveBadge from "./Constants/ActiveBadge";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const truncateAddress = (address: string, maxLength = 25) => {
  if (address.length > maxLength) {
    return `${address.slice(0, maxLength)}...`;
  }
  return address;
};

const CustomerTable: React.FC = () => {
  const { data, error, isLoading } = useGetCustomersQuery();
  const [deleteCustomer] = useDeleteCustomerMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickManageCustomer = (customerId: string) => {
    dispatch(setSelectedCustomerId(customerId));
    navigate("/manage-customer");
  };

  const handleAddCustomer = () => {
    navigate("/add-customer");
  };

  const handleDeleteCustomer = async (id: string | undefined) => {
    if (window.confirm("Are you sure you want to delete this Customer?")) {
      try {
        await deleteCustomer(id || "").unwrap();
        toast.success("Customer deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Error deleting customer!");
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading customers</div>;
  }

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full">
            <div className="bg-white my-[1.5vw]">
              <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
                <div className="flex space-x-[1vw]">
                  <button
                    onClick={handleAddCustomer}
                    className="w-[12vw] h-[3vw] text-white font-inter font-semibold text-[1vw] bg-purple-0 text-purple-600 border rounded"
                  >
                    Add New Customer
                  </button>
                  <button className="w-[14vw] h-[3vw] text-white font-inter font-semibold text-[1vw] bg-purple-0 text-purple-600 border rounded">
                    Import New Customers
                  </button>
                </div>
              </div>
              {data && data.length > 0 ? (
                <>
                  <div className="flex justify-between border-t border-b items-center px-[1.5vw] py-[1vw]">
                    <h2 className="text-[1.5vw] font-semibold">
                      Customers
                      <span className="bg-custom-bg-color px-[0.5vw] py-[0.2vw] ml-[1vw] border rounded-[1vw] text-[1vw] text-purple-0 ">
                        Total={data.length}
                      </span>
                    </h2>
                    <div className="flex items-center space-x-[1vw]">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search"
                          className="px-[1vw] py-[0.2vw] border rounded-[0.5vw] placeholder:text-[1vw] text-[1vw] focus:outline-none"
                        />
                        <svg
                          className="w-[1vw] h-[1vw] absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <button className="px-[1vw] py-[0.2vw] rounded-[0.5vw] font-inter text-[1vw] font-semibold bg-purple-100 text-purple-0 border border-purple-600 hover:bg-purple-0 hover:text-white">
                        Sort By
                      </button>
                    </div>
                  </div>
                  <table className="min-w-max w-full table-auto">
                    <thead>
                      <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal">
                        <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                          Name
                        </th>
                        <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                          Address
                        </th>
                        <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                          Type
                        </th>
                        <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                          Status
                        </th>
                        <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 text-[1vw] font-light">
                      {data.map((customer, index) => (
                        <tr
                          key={customer.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-[1vw] px-[1.5vw] text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="w-[2.5vw] md:w-[1vw] h-[2.5vw] md:h-[1vw] accent-purple-0 border-lightgray-0 rounded focus:ring-offset-white focus:ring-purple-0 cursor-pointer mr-2"
                              />
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={`https://i.pravatar.cc/150?img=${index}`}
                                  alt={customer.name}
                                />
                              </div>
                              <span className="font-inter font-medium text-[1vw]">
                                {customer.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                            {truncateAddress(customer.address)}
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                            {customer.type}
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-center">
                            <ActiveBadge />
                          </td>
                          <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                            <button
                              onClick={() =>
                                handleClickManageCustomer(customer.id)
                              }
                              className="px-[1vw] py-[0.5vw] bg-purple-0 text-white rounded-[0.4vw]"
                            >
                              Manage
                            </button>
                            <button
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between py-[1vw] px-[1.5vw]">
                    <PreviousButton />
                    <div className="flex space-x-1">
                      {[...Array(10).keys()].map((page) => (
                        <button
                          key={page}
                          className="bg-gray-300 text-gray-600 py-1 px-3 rounded"
                        >
                          {page + 1}
                        </button>
                      ))}
                    </div>
                    <NextButton />
                  </div>
                </>
              ) : (
                <div className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">
                    No customers found
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
