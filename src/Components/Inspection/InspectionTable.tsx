import React, { useEffect, useState } from "react";
import {
  useGetInspectionsQuery,
  useDeleteInspectionMutation,
  useMarkInspectionSubmitAndBillMutation,
  useMarkInspectionSubmitWithoutBillingMutation,
  useAddToExistingInvoiceMutation,
} from "../../redux/api/inspectionApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../Constants/ConfirmationModal";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import Loader from "../Constants/Loader";
import { getUserId } from "../../utils/utils";
import { Inspection } from "../../redux/features/inspectionSlice";

const InspectionTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<string | null>(null);
  const { data: inspectionsData, isLoading } = useGetInspectionsQuery();
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [invoices, setInvoices] = useState<Inspection[]>([]);
  const [deleteInspection] = useDeleteInspectionMutation();
  const navigate = useNavigate();
  const clientId = getUserId();
  const [markSubmitAndBill] = useMarkInspectionSubmitAndBillMutation();
  const [markSubmitWithoutBilling] =
    useMarkInspectionSubmitWithoutBillingMutation();
  const [addToExistingInvoiceMutation] = useAddToExistingInvoiceMutation();
  const [inspectionIdToDelete, setInspectionIdToDelete] = useState<
    string | undefined | null
  >(null);
  const [selectFieldOptions, setSelectFieldOptions] = useState<
    { id: string | undefined; name: string }[] | undefined
  >(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const inspectionsPerPage = 10;

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

  useEffect(() => {
    if (inspectionsData && clientId) {
      const invoices = inspectionsData.filter(
        (inspection) =>
          inspection.client &&
          inspection.client.id === clientId &&
          inspection.status === "Complete Not-Billed"
      );

      setInvoices(invoices);
    }
  }, [inspectionsData, clientId]);

  const filteredInspections = inspections?.filter((inspection, index) => {
    const indexString = (
      index +
      1 +
      (currentPage - 1) * inspectionsPerPage
    ).toString();
    return (
      indexString.includes(searchTerm) ||
      inspection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleConfirmDelete = async () => {
    if (inspectionIdToDelete) {
      try {
        await deleteInspection(inspectionIdToDelete).unwrap();
        toast.success("Inspection deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Error deleting inspection!");
      } finally {
        setIsModalOpen(false);
        setInspectionIdToDelete(null);
      }
    }
  };

  const handleCompleteAction = (id: string | undefined, action: string) => {
    setInspectionIdToDelete(id);
    setIsModalOpen(true);
    setActionType(action);

    if (action === "existingInvoice") {
      const options = invoices.map((invoice) => ({
        id: invoice.id,
        name: invoice.name,
      }));
      setSelectFieldOptions(options);
    } else {
      setSelectFieldOptions(undefined);
    }
  };

  const handleConfirmComplete = async (selectedOption: string | undefined) => {
    if (inspectionIdToDelete) {
      try {
        if (actionType === "billed") {
          await markSubmitAndBill(inspectionIdToDelete).unwrap();
          toast.success("Inspections marked as complete and billed!", {
            onClose: () => window.location.reload(),
            autoClose: 500,
          });
        } else if (actionType === "notBilled") {
          await markSubmitWithoutBilling(inspectionIdToDelete).unwrap();
          toast.success("Inspection marked as complete without billing!", {
            onClose: () => window.location.reload(),
            autoClose: 500,
          });
        } else if (actionType === "existingInvoice") {
          await addToExistingInvoiceMutation({
            inspectionId: inspectionIdToDelete!,
            invoiceId: selectedOption,
          }).unwrap();
          toast.success("Inspection marked as complete without billing!", {
            onClose: () => window.location.reload(),
            autoClose: 500,
          });
        }
      } catch (error) {
        toast.error("Error completing inspection!");
      } finally {
        setIsModalOpen(false);
        setInspectionIdToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setInspectionIdToDelete(null);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
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
                Status
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Scheduled Date
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
                      {inspection.status === "Complete Billed" ? (
                        highlightText(
                          inspection.status ? inspection.status : "N/A",
                          searchTerm
                        )
                      ) : (
                        <select
                          onChange={(e) =>
                            handleCompleteAction(inspection.id, e.target.value)
                          }
                          defaultValue=""
                          className="appearance-none border-none bg-transparent cursor-pointer text-gray-600 hover:underline focus:outline-none"
                        >
                          <option value="" disabled>
                            {highlightText(
                              inspection.status ? inspection.status : "N/A",
                              searchTerm
                            )}
                          </option>
                          <option value="billed">Submit & Bill</option>
                          <option value="notBilled">
                            Submit & Don't Billed
                          </option>
                          <option value="existingInvoice">
                            Submit & Add to Existing Invoice
                          </option>
                        </select>
                      )}
                    </td>
                    <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                      {highlightText(
                        new Date(inspection.scheduledDate).toLocaleDateString(),
                        searchTerm
                      )}
                    </td>
                    <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                      <PurpleButton
                        text="Download PDF"
                        onClick={() => {
                          const url = `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${inspection.pdfFilePath}`;
                          window.open(url, "_blank");
                        }}
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
      <ConfirmationModal
        isOpen={isModalOpen}
        message={
          actionType === "existingInvoice"
            ? "Select an inspection to add to the existing invoice."
            : "Are you sure you want to mark this inspection as complete?"
        }
        onConfirm={
          actionType === "delete" ? handleConfirmDelete : handleConfirmComplete
        }
        onCancel={handleCancelDelete}
        selectFieldOptions={selectFieldOptions}
      />
    </div>
  );
};

export default InspectionTable;
