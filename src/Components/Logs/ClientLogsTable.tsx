import React, { useState, useMemo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import Loader from "../Constants/Loader";
import { useGetClientLogsQuery } from "../../redux/api/clientLogsApi";

const ClientLogsTable: React.FC = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const { data: logs, isLoading } = useGetClientLogsQuery();

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

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

  const filteredLogs = useMemo(() => {
    return logs?.filter(
      (log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(log.timestamp).toLocaleString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.logLevel.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, logs]);

  const totalPages = Math.ceil((filteredLogs?.length || 0) / logsPerPage);
  const paginatedData = filteredLogs?.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center py-[1vw]">
        <PurpleButton text="Sort Table" />
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search logs"
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
                Action/Event
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Date/Time
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                User First, Last
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                LOG Level
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
            {!isLoading && paginatedData?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">No logs found</p>
                </td>
              </tr>
            )}
            {!isLoading &&
              paginatedData?.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.action, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(new Date(log.timestamp).toLocaleString(), searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.user.username, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.logLevel, searchTerm)}
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
    </div>
  );
});

export default ClientLogsTable;
