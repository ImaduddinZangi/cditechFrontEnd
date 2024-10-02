import React, { useState, useMemo, useCallback } from "react";
import { FiSearch } from "react-icons/fi";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface Session {
  timeDate: string;
  gpsLocation: string;
  ipType: string;
  deviceType: string;
  browserType: string;
  ipLocation: string;
  userName: string;
}

const ClientUsersSessionsTable: React.FC = React.memo(() => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [totalUsers] = useState<number>(100);

  const sessions: Session[] = [
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
    },
    {
      timeDate: "Time/Date",
      gpsLocation: "GPS Location",
      ipType: "IPv4 & IPv6",
      deviceType: "Device Type",
      browserType: "Browser Type",
      ipLocation: "IP Location",
      userName: "User Name",
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

  const filteredSessions = useMemo(() => {
    return sessions.filter(
      (session) =>
        session.timeDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.gpsLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.ipType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.deviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.browserType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.ipLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, sessions]);

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <div>
          <p className="text-[1.2vw]">
            Users <span className="text-purple-0">Total: {totalUsers}</span>
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
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Time/Date
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                GPS Location
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                IPv4 & IPv6
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Device Type
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Browser Type
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                IP Location
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                User Name
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {filteredSessions.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">
                    No sessions found
                  </p>
                </td>
              </tr>
            ) : (
              filteredSessions.map((session, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.timeDate, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.gpsLocation, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.ipType, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.deviceType, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.browserType, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.ipLocation, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {highlightText(session.userName, searchTerm)}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left">
                    <WhiteButton text="Revoke Session" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <button
          className="px-4 py-2 text-[1vw] bg-gray-200 text-gray-700 rounded-[0.5vw] hover:bg-gray-300"
          onClick={() => alert("Previous page")}
        >
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 rounded text-[1vw] bg-gray-200">
            1
          </button>
          <button className="px-2 py-1 rounded text-[1vw]">2</button>
          <button className="px-2 py-1 rounded text-[1vw]">3</button>
          {/* You can add more pages here */}
          <span className="px-2 py-1 text-gray-500">...</span>
          <button className="px-2 py-1 rounded text-[1vw]">10</button>
        </div>
        <button
          className="px-4 py-2 text-[1vw] bg-gray-200 text-gray-700 rounded-[0.5vw] hover:bg-gray-300"
          onClick={() => alert("Next page")}
        >
          Next
        </button>
      </div>
    </div>
  );
});

export default ClientUsersSessionsTable;
