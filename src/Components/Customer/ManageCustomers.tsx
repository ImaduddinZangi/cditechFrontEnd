import React, { useState } from "react";
import { useGetCustomersQuery } from "../../redux/api/customerApi";
import { useAppDispatch } from "../../redux/store";
import { setSelectedCustomerId } from "../../redux/features/customerSlice";
import ActiveBadge from "./Constants/ActiveBadge";
import { useNavigate } from "react-router-dom";
import Loader from "../Constants/Loader";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";

const truncateAddress = (address: string, maxLength = 25) => {
  if (address.length > maxLength) {
    return `${address.slice(0, maxLength)}...`;
  }
  return address;
};

const highlightText = (text: string, searchTerm: string) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const CustomerTable: React.FC = () => {
  const { data: customersData, isLoading } = useGetCustomersQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = customersData?.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredData?.length || 0) / customersPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * customersPerPage,
    currentPage * customersPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleClickManageCustomer = (customerId: string) => {
    dispatch(setSelectedCustomerId(customerId));
    navigate("/manage-customer");
  };

  const handleAddCustomer = () => {
    navigate("/add-customer");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center justify-center overflow-hidden">
          <div className="w-full">
            <div className="bg-white my-[1.5vw]">
              <div className="flex justify-between items-center py-[1vw]">
                <div className="flex space-x-[1vw]">
                  <PurpleButton
                    text="Add New Customer"
                    onClick={handleAddCustomer}
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    className="px-[1vw] py-[0.2vw] border rounded-[0.5vw] placeholder:text-[1vw] text-[1vw] focus:outline-none"
                  />
                  <FiSearch
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                    size={16}
                  />
                </div>
              </div>

              <table className="min-w-full bg-white border border-gray-200">
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
                  {isLoading && (
                    <tr>
                      <td colSpan={6} className="text-center py-[2vw]">
                        <Loader />
                      </td>
                    </tr>
                  )}
                  {!isLoading &&
                    (!paginatedData || paginatedData.length === 0) && (
                      <tr>
                        <td colSpan={6} className="text-center py-[2vw]">
                          <p className="text-[1.5vw] font-semibold">
                            No customers found
                          </p>
                        </td>
                      </tr>
                    )}
                  {!isLoading &&
                    paginatedData &&
                    paginatedData.map((customer) => {
                      return (
                        <tr
                          key={customer.id}
                          className="border-b border-gray-200 hover:bg-gray-100"
                        >
                          <td className="py-[1vw] px-[1.5vw] text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="mr-2">
                                <img
                                  className="w-6 h-6 rounded-full"
                                  src={
                                    customer.photos
                                      ? `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${customer.photos.find(
                                        () => true
                                      )}`
                                      : "/assets/no-image.jpg"
                                  }
                                  alt={customer.name}
                                />
                              </div>
                              <span className="font-inter font-medium text-[1vw]">
                                {highlightText(customer.name, searchTerm)}
                              </span>
                            </div>
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                            {highlightText(
                              truncateAddress(customer.address),
                              searchTerm
                            )}
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                            {highlightText(customer.type, searchTerm)}
                          </td>
                          <td className="py-[1vw] px-[1.5vw] text-center">
                            <ActiveBadge
                              iconColor={
                                customer.status === "Active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }
                              bgColor={
                                customer.status === "Active"
                                  ? "bg-green-100"
                                  : "bg-red-100"
                              }
                              textColor={
                                customer.status === "Active"
                                  ? "text-green-800"
                                  : "text-red-800"
                              }
                              text={customer.status}
                            />
                          </td>
                          <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                            <PurpleButton
                              type="button"
                              text="Manage"
                              onClick={() =>
                                handleClickManageCustomer(customer.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <div className="flex items-center justify-between py-[1vw]">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
                >
                  Previous
                </button>
                <div className="flex space-x-1">
                  {[...Array(totalPages).keys()].map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page + 1)}
                      className={`${currentPage === page + 1
                          ? "bg-purple-0 text-white"
                          : "bg-gray-300 text-gray-600"
                        } py-1 px-3 rounded`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-[1vw] py-[0.5vw] border bg-white text-darkgray-0 rounded-[0.4vw] text-[1vw] font-inter font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTable;
