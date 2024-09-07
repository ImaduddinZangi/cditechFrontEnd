import React, { useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import {
  useGetInspectionByIdQuery,
  useGetInspectionsQuery,
} from "../../redux/api/inspectionApi";
import { useGenerateReportMutation } from "../../redux/api/inspectionReportsApi";
import MyDocument from "./Constants/MyDocument";
import { getUserId } from "../../utils/utils";
import { pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Constants/Loader";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

const GenerateReports: React.FC = () => {
  const { data: inspections } = useGetInspectionsQuery();
  const [selectedInspectionId, setSelectedInspectionId] = useState<
    string | null
  >(null);
  const { data: inspection, isLoading } = useGetInspectionByIdQuery(
    selectedInspectionId || "",
    {
      skip: !selectedInspectionId,
    }
  );
  const [generateReport] = useGenerateReportMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    const clientId = getUserId();
    if (clientId && selectedInspectionId && inspection) {
      try {
        setLoading(true);

        const doc = <MyDocument data={inspection} />;
        const pdfBlob = await pdf(doc).toBlob();

        const pdfFile = new File([pdfBlob], "inspection_report.pdf", {
          type: "application/pdf",
          lastModified: Date.now(),
        });

        const formData = new FormData();
        formData.append("file", pdfFile);

        await generateReport({
          file: pdfFile,
          inspectionId: selectedInspectionId,
          clientId,
        });
        toast.success("PDF uploaded successfully", {
          onClose: () => navigate("/client-dashboard"),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Failed to upload PDF");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = () => {
    toast.success("PDF downloaded successfully");
  };

  const handleCancel = () => {
    setSelectedInspectionId(null);
    navigate("/client-dashboard");
  };

  const handleSelectInspection = (id: string) => {
    setSelectedInspectionId(id);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <h1 className="text-[1.5vw] font-bold mb-[1vw]">
        Generate Inspection Report
      </h1>
      <div className="mb-[1vw]">
        <label className="block text-darkgray-0 font-medium text-[1vw]">
          Select an Inspection:
        </label>
        <select
          className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
          onChange={(e) => handleSelectInspection(e.target.value)}
          value={selectedInspectionId || ""}
        >
          <option value="" disabled>
            Select Inspection
          </option>
          {inspections?.map((inspection) => (
            <option key={inspection.id} value={inspection.id}>
              {inspection.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading && (
        <p>
          <Loader />
        </p>
      )}
      {inspection && (
        <>
          <div className="mb-4 border rounded-lg overflow-hidden shadow-lg">
            <PDFViewer className="w-full h-96">
              <MyDocument data={inspection} />
            </PDFViewer>
          </div>
          <div className="flex justify-center space-x-4">
            <PurpleButton
              type="button"
              text={loading ? "Uploading..." : "Upload"}
              onClick={handleUpload}
              disabled={loading}
            />
            <PDFDownloadLink
              document={<MyDocument data={inspection} />}
              fileName="inspection_report.pdf"
            >
              {({ loading: pdfLoading }) => (
                <PurpleButton
                  type="button"
                  text={pdfLoading ? "Generating..." : "Download"}
                  onClick={handleDownload}
                  disabled={pdfLoading}
                />
              )}
            </PDFDownloadLink>
            <PurpleButton
              type="button"
              text="Edit"
              onClick={() => alert("Edit functionality is not implemented yet")}
            />
            <WhiteButton type="button" text="Cancel" onClick={handleCancel} />
          </div>
        </>
      )}
    </div>
  );
};

export default GenerateReports;
