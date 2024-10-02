import React, { useState, useMemo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";

interface Log {
  action: string;
  dateTime: string;
  logLevel: string;
  userId: string;
}

const ManagementLogsTable: React.FC = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const logs: Log[] = [
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
    {
      action: "Action/Event",
      dateTime: "Date/Time",
      logLevel: "LOG Level",
      userId: "User ID",
    },
  ];

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

  // Memoized filtered logs based on the search term
  const filteredLogs = useMemo(() => {
    return logs.filter(
      (log) =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.dateTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.logLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, logs]);

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <OutlinePurpleButton text="Sort Table" />
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
                LOG Level
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                User ID
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">No logs found</p>
                </td>
              </tr>
            ) : (
              filteredLogs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.action, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.dateTime, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.logLevel, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(log.userId, searchTerm)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default ManagementLogsTable;
