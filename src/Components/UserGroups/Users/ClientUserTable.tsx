import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetClientUsersQuery } from "../../../redux/api/clientUserApi";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import Loader from "../../Constants/Loader";
import { FiSearch } from "react-icons/fi";

const highlightText = (text: string, highlight: string) => {
  if (!highlight) return text;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={index} className="bg-yellow-200">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
};

const ClientUserTable: React.FC = () => {
  const { data: clientUsers, isLoading } = useGetClientUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = clientUsers?.filter((user, index) => {
    const indexString = (
      index +
      1 +
      (currentPage - 1) * usersPerPage
    ).toString();
    const userStatus = user.status || "N/A";
    return (
      indexString.includes(searchTerm) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userStatus.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);
  const paginatedUsers = filteredUsers?.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleViewDetails = (id: string | undefined) => {
    navigate(`/client-user-details/${id}`);
  };

  const handleEdit = (id: string | undefined) => {
    navigate(`/edit-client-user/${id}`);
  };

  const handleAddClientUser = () => {
    navigate("/add-client-user");
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton
            text="Add New Client User"
            onClick={handleAddClientUser}
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal">
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Index
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Username
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Email
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Phone
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Status
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Actions
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
            {!isLoading && (!paginatedUsers || paginatedUsers.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">No user found</p>
                </td>
              </tr>
            )}
            {paginatedUsers &&
              paginatedUsers.map((user, index: number) => {
                const displayIndex =
                  index + 1 + (currentPage - 1) * usersPerPage;
                return (
                  <tr
                    key={user.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {displayIndex}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(user.username || `${user.firstName} ${user.lastName}`, searchTerm)}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(user.email, searchTerm)}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(
                        user.phone ? user.phone : "N/A",
                        searchTerm
                      )}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(
                        user.is_active ? "Active" : "Inactive",
                        searchTerm
                      )}
                    </td>
                    <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                      <PurpleButton
                        text="Details"
                        onClick={() => handleViewDetails(user.id)}
                      />
                      <WhiteButton
                        text="Edit"
                        onClick={() => handleEdit(user.id)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between py-[1vw] px-[1.5vw]">
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
              className={`${
                currentPage === page + 1
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
  );
};

export default ClientUserTable;
