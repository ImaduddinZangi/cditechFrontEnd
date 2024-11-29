import React, { useState, useMemo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import { useGetClientSessionsQuery } from "../../redux/api/clientSessionsApi";

const ClientUsersSessionsTable: React.FC = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;
  const { data: clientSessions, isLoading } = useGetClientSessionsQuery();

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const highlightText = useCallback((text: string, highlight: string) => {
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
  }, []);

  const filteredSessions = useMemo(() => {
    if (!clientSessions) return [];
    return clientSessions.filter((session) =>
      [
        `${formatTimestamp(session.created_at)} - ${formatTimestamp(session.expires_at)}`,
        session.gps_location || "N/A",
        session.ip_type,
        session.device_type,
        session.browser_type,
        session.ip_location,
        session.user.username || "N/A",
      ]
        .map((field) => field.toLowerCase())
        .some((field) => field.includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, clientSessions]);

  const totalPages = Math.ceil((filteredSessions?.length || 0) / logsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <p className="text-center">Loading sessions...</p>;
  }

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <div>
          <p className="text-[1.2vw]">
            Users <span className="text-purple-0">Total: {filteredSessions.length}</span>
          </p>
        </div>
        <div className="flex items-center space-x-[1vw]">
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
          <OutlinePurpleButton text="Sort By" />
        </div>
        <div>
          <PurpleButton text="Revoke All Sessions" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal">
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">Time Span</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">GPS Location</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">IPv4 & IPv6</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">Device Type</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">Browser Type</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">IP Location</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">User Name</th>
              <th className="py-[1vw] px-[1.5vw] font-medium text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {paginatedSessions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">No sessions found</p>
                </td>
              </tr>
            ) : (
              paginatedSessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(
                      `${formatTimestamp(session.created_at)} - ${formatTimestamp(session.expires_at)}`,
                      searchTerm
                    )}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.gps_location || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.ip_type || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.device_type || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.browser_type || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.ip_location || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    {highlightText(session.user.username || "N/A", searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw]">
                    <WhiteButton text="Revoke Session" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
              onClick={() => handlePageClick(page + 1)}
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
  );
});

export default ClientUsersSessionsTable;
