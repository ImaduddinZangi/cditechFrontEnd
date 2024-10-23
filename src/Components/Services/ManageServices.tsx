import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import ConfirmationModal from "../Constants/ConfirmationModal";
import { useGetServicesQuery } from "../../redux/api/serviceApi";
import { useNavigate } from "react-router-dom";
import Loader from "../Constants/Loader";

const ManageServices: React.FC = () => {
  const { data: servicesData, isLoading } = useGetServicesQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = servicesData?.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredData?.length || 0) / servicesPerPage);
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton
            text="Add New Service"
            onClick={() => navigate("/add-service/")}
          />
          <PurpleButton text="Import Services" onClick={() => { }} />
          <PurpleButton text="Sort" onClick={() => { }} />
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal">
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Service Name
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Description
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Price
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {isLoading && (
              <tr>
                <td colSpan={4} className="text-center py-[2vw]">
                  <Loader />
                </td>
              </tr>
            )}
            {!isLoading &&
              (!paginatedData || paginatedData.length === 0) && (
                <tr>
                  <td colSpan={4} className="text-center py-[2vw]">
                    <p className="text-[1.5vw] font-semibold">
                      No services found
                    </p>
                  </td>
                </tr>
              )}
            {!isLoading &&
              paginatedData &&
              paginatedData.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {service.name}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {service.description}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {`$${service.price}`}
                  </td>
                  <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                    <PurpleButton
                      text="Manage"
                      onClick={() => navigate(`/services/${service.id}`)}
                    />
                    <WhiteButton
                      text="Delete"
                      onClick={() => handleDelete()}
                    />
                  </td>
                </tr>
              ))}
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

      <ConfirmationModal
        isOpen={isModalOpen}
        message={"Are you sure you want to delete this service?"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ManageServices;
