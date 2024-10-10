import React, { useEffect, useState } from "react";
import {
  useGetInvoicesQuery,
  useDeleteInvoiceMutation,
} from "../../redux/api/invoiceApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationModal from "../Constants/ConfirmationModal";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import Loader from "../Constants/Loader";

const InvoiceTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceIdToDelete, setInvoiceIdToDelete] = useState<
    string | null | undefined
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 10;

  const { data: invoicesData, isLoading } = useGetInvoicesQuery();
  const [invoices, setInvoices] = useState(invoicesData || []);
  const [deleteInvoice] = useDeleteInvoiceMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (invoicesData) {
      setInvoices(invoicesData);
    }
  }, [invoicesData]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredInvoices = invoices?.filter((invoice) => {
    return (
      invoice.quickbooks_invoice_id.includes(searchTerm) ||
      invoice.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(invoice.due_date).toLocaleDateString().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(
    (filteredInvoices?.length || 0) / invoicesPerPage
  );
  const paginatedInvoices = filteredInvoices?.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleOpenDeleteModal = (id: string | undefined) => {
    setInvoiceIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (invoiceIdToDelete) {
      try {
        await deleteInvoice(invoiceIdToDelete).unwrap();
        toast.success("Invoice deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Error deleting invoice!");
      } finally {
        setIsModalOpen(false);
        setInvoiceIdToDelete(null);
      }
    }
  };

  const handleDetails = (id: string | undefined) => {
    navigate(`/invoice/${id}`);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setInvoiceIdToDelete(null);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton
            text="Inspections Table"
            onClick={() => navigate("/inspection-table")}
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
                Invoice ID
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Customer Name
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Status
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Due Amount
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Paid Amount
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Paid Date
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center py-[2vw]">
                  <Loader />
                </td>
              </tr>
            )}
            {!isLoading &&
              (!paginatedInvoices || paginatedInvoices.length === 0) && (
                <tr>
                  <td colSpan={7} className="text-center py-[2vw]">
                    <p className="text-[1.5vw] font-semibold">
                      No invoice found
                    </p>
                  </td>
                </tr>
              )}
            {!isLoading &&
              paginatedInvoices &&
              paginatedInvoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.quickbooks_invoice_id}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.customer?.name || "N/A"}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.status}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.amount_due}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.amount_paid}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {invoice.paid_date
                      ? new Date(invoice.paid_date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                    <PurpleButton
                      text="View Invoice"
                      onClick={() => handleDetails(invoice.id)}
                    />
                    <WhiteButton
                      text="Delete"
                      onClick={() => handleOpenDeleteModal(invoice.id)}
                    />
                  </td>
                </tr>
              ))}
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
        message="Are you sure you want to delete this invoice?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default InvoiceTable;
