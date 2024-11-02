import React, { useEffect, useState } from "react";
import { useGetInspectionsQuery, useMarkInspectionBeginMutation } from "../../redux/api/inspectionApi";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import Loader from "../Constants/Loader";
import { getUserId } from "../../utils/utils";
import { Inspection } from "../../redux/features/inspectionSlice";
import WhiteButton from "../Tags/WhiteButton";
import SubmitInvoiceModal from "./Constants/SubmitInvoiceModal";
import ActiveBadge from "../Customer/Constants/ActiveBadge";

const ManageInspections: React.FC = () => {
  const { data: inspectionsData, isLoading } = useGetInspectionsQuery();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inspectionId, setInspectionId] = useState<string>("");
  const navigate = useNavigate();
  const clientId = getUserId();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const inspectionsPerPage = 15;

  const [markInspectionBegin] = useMarkInspectionBeginMutation();

  const handleBeginInspection = async (inspectionId: string) => {
    try {
      await markInspectionBegin(inspectionId).unwrap();
      navigate(`/inspection-checklist/${inspectionId}`);
    } catch (error) {
      console.error("Failed to mark inspection as begun:", error);
    }
  };

  useEffect(() => {
    if (inspectionsData && clientId) {
      const filteredInspections = inspectionsData.filter(
        (inspection) => inspection.client?.id === clientId
      );
      setInspections(filteredInspections);
    }
  }, [inspectionsData, clientId]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const filteredInspections = inspections?.filter((inspection, index) => {
    const indexString = (
      index +
      1 +
      (currentPage - 1) * inspectionsPerPage
    ).toString();
    return (
      indexString.includes(searchTerm) ||
      inspection.customer.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      inspection.asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.checklists[0]?.template?.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      inspection.createdAt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(inspection.scheduledDate)
        .toLocaleDateString()
        .includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(
    (filteredInspections?.length || 0) / inspectionsPerPage
  );
  const paginatedInspections = filteredInspections?.slice(
    (currentPage - 1) * inspectionsPerPage,
    currentPage * inspectionsPerPage
  );

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = (id: string) => {
    setModalOpen(true);
    setInspectionId(id);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton
            text="Add New Inspection"
            onClick={() => navigate("/add-inspection")}
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
                Customer
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Asset
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Due By
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Status
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Assigned User
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
                  <Loader text="Loading details..." />
                </td>
              </tr>
            )}
            {!isLoading &&
              (!paginatedInspections || paginatedInspections.length === 0) && (
                <tr>
                  <td colSpan={6} className="text-center py-[2vw]">
                    <p className="text-[1.5vw] font-semibold">
                      No inspection found
                    </p>
                  </td>
                </tr>
              )}
            {!isLoading &&
              paginatedInspections &&
              paginatedInspections?.map((inspection) => {
                return (
                  <tr
                    key={inspection.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(inspection.customer.name, searchTerm)}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(inspection.asset.name, searchTerm)}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(
                        new Date(inspection.scheduledDate).toLocaleDateString(),
                        searchTerm
                      )}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      <ActiveBadge
                        iconColor={
                          inspection.status === "Not-Complete"
                            ? "bg-gray-0"
                            : inspection.status === "Past-Due"
                            ? "bg-red-500"
                            : inspection.status === "In-Progress"
                            ? "bg-blue-500"
                            : inspection.status === "Completed Billed"
                            ? "bg-green-500"
                            : inspection.status === "Complete Not-Billed"
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                        }
                        bgColor={
                          inspection.status === "Not-Complete"
                            ? "bg-lightgray-0"
                            : inspection.status === "Past-Due"
                            ? "bg-red-100"
                            : inspection.status === "In-Progress"
                            ? "bg-blue-100"
                            : inspection.status === "Completed Billed"
                            ? "bg-green-100"
                            : inspection.status === "Complete Not-Billed"
                            ? "bg-orange-100"
                            : "bg-yellow-100"
                        }
                        textColor={
                          inspection.status === "Not-Complete"
                            ? "bg-dark-0"
                            : inspection.status === "Past-Due"
                            ? "bg-red-800"
                            : inspection.status === "In-Progress"
                            ? "bg-blue-800"
                            : inspection.status === "Completed Billed"
                            ? "bg-green-800"
                            : inspection.status === "Complete Not-Billed"
                            ? "bg-orange-800"
                            : "bg-yellow-800"
                        }
                        text={inspection.status}
                      />
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(inspection.assignedTo?.username || "N/A", searchTerm)}
                    </td>
                    <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                      {(inspection.status === "Not-Complete" || inspection.status === "In-Progress") && (
                        <PurpleButton
                          text="Begin"
                          onClick={() => handleBeginInspection(inspection.id)}
                        />
                      )}
                      {inspection.status !== "Not-Complete"
                        && inspection.status !== "In-Progress"
                        && (
                          <PurpleButton
                            text="Submit"
                            onClick={() => handleModalOpen(inspection.id)}
                          />
                        )}
                      <WhiteButton
                        text="View"
                        onClick={() =>
                          navigate(`/inspection-details/${inspection.id}`)
                        }
                      />
                    </td>
                  </tr>
                );
              })}
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
        <SubmitInvoiceModal
          isOpen={isModalOpen}
          onCancel={handleModalClose}
          inspectionId={inspectionId}
        />
      </div>
    </div>
  );
};

export default ManageInspections;
