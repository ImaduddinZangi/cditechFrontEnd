import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Constants/Loader";
import { useGetInvoiceByIdQuery } from "../../redux/api/invoiceApi";
import { useGetPhotosQuery } from "../../redux/api/uploadPhotosApi";
import { useGetInspectionByIdQuery } from "../../redux/api/inspectionApi";
import PurpleButton from "../Tags/PurpleButton";

interface InspectionData {
  id: string;
  name: string;
  pdfReportPath: string;
}

const InvoiceDetails: React.FC = () => {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { data: photosData } = useGetPhotosQuery();
  const {
    data: invoice,
    error,
    isLoading,
  } = useGetInvoiceByIdQuery(invoiceId || "");

  const [inspections, setInspections] = useState<InspectionData[]>([]);

  const { data: fallbackInspection } = useGetInspectionByIdQuery(
    invoice?.inspection?.id || ""
  );

  useEffect(() => {
    if (invoice?.items && invoice.items.length > 0) {
      const inspectionData = invoice.items.map(
        (item: { inspectionId: string; pdfReportPath: string }) => ({
          id: item.inspectionId,
          name: "",
          pdfReportPath: item.pdfReportPath,
        })
      );
      setInspections(inspectionData);
    }
  }, [invoice]);

  const getInspectionPhotos = (inspectionId: string) => {
    if (!photosData) return [];
    return photosData.filter((photo) => photo.inspectionId === inspectionId);
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  if (error) return <p>Error loading invoice details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {invoice && (
        <div className="flex flex-col items-start space-y-[2vw]">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Invoice ID:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.quickbooks_invoice_id}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Status:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.status}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Amount Due:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                ${invoice.amount_due}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Amount Paid:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                ${invoice.amount_paid}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Paid Date:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.paid_date
                  ? new Date(invoice.paid_date).toLocaleDateString()
                  : "Not Paid"}
              </p>
            </div>
          </div>

          {/* Client and Customer Info */}
          {invoice.client && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Client:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.client.first_name},&nbsp;{invoice.client.last_name}
              </p>
            </div>
          )}
          {invoice.customer && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Customer:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.customer.name}
              </p>
            </div>
          )}

          {/* Display default Inspection (directly from invoice) */}
          {invoice.inspection && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Inspection Related:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {invoice.inspection.id}
              </p>
              {fallbackInspection && (
                <div className="mt-[1vw]">
                  <PurpleButton
                    text="Download PDF"
                    onClick={() => {
                      const url = `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${fallbackInspection.pdfFilePath}`;
                      window.open(url, "_blank");
                    }}
                  />
                  {getInspectionPhotos(fallbackInspection.id).length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-[2vw]">
                      {getInspectionPhotos(fallbackInspection.id).map(
                        (photo, index) => (
                          <img
                            key={index}
                            src={`https://inspection-point-s3.s3.us-east-2.amazonaws.com/${photo.url}`}
                            alt={`Inspection photo ${index + 1}`}
                            className="w-full h-auto rounded-md shadow-md"
                          />
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Display Inspections fetched from items array */}
          {inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="border p-[1vw] rounded-lg mt-[2vw]"
            >
              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                    Inspection Name:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.name || `Inspection ID: ${inspection.id}`}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                    PDF File:&nbsp;&nbsp;&nbsp;
                  </p>
                  <PurpleButton
                    text="Download PDF"
                    onClick={() => {
                      const url = `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${inspection.pdfReportPath}`;
                      window.open(url, "_blank");
                    }}
                  />
                </div>
              </div>

              {/* Photos Grid */}
              {getInspectionPhotos(inspection.id).length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-[2vw]">
                  {getInspectionPhotos(inspection.id).map((photo, index) => (
                    <img
                      key={index}
                      src={`https://inspection-point-s3.s3.us-east-2.amazonaws.com/${photo.url}`}
                      alt={`Inspection photo ${index + 1}`}
                      className="w-full h-auto rounded-md shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceDetails;
