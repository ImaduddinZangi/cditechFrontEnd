import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import SelectField, { Option } from "../../Tags/SelectField";
import { useGetServicesQuery } from "../../../redux/api/serviceApi";
import { useNavigate } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "../Constants/MyDocument";
import {
  useGetInspectionByIdQuery,
  useGetInspectionsQuery,
  useMarkInspectionSubmitAndBillMutation,
  useMarkInspectionSubmitWithoutBillingMutation,
  useAddToExistingInvoiceMutation,
} from "../../../redux/api/inspectionApi";
import { toast } from "react-toastify";
import Loader from "../../Constants/Loader";
import { getUserId } from "../../../utils/utils";
import { useGenerateReportMutation } from "../../../redux/api/inspectionReportsApi";
import { useUpdateInspectionMutation } from "../../../redux/api/inspectionApi";

interface SubmitInvoiceModalProps {
  isOpen: boolean;
  inspectionId: string;
  onCancel: () => void;
}

const SubmitInvoiceModal: React.FC<SubmitInvoiceModalProps> = ({
  isOpen,
  onCancel,
  inspectionId,
}) => {
  const [serviceFee, setServiceFee] = useState<Option | null>(null);
  const [services, setServices] = useState<Option[]>([]);
  const { data: servicesData } = useGetServicesQuery();
  const { data: inspection } = useGetInspectionByIdQuery(inspectionId || "", {
    skip: !inspectionId,
  });
  const [updateInspection] = useUpdateInspectionMutation();
  const [generateReport] = useGenerateReportMutation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const clientId = getUserId();
  const [markSubmitAndBill] = useMarkInspectionSubmitAndBillMutation();
  const [markSubmitWithoutBilling] =
    useMarkInspectionSubmitWithoutBillingMutation();
  const [addToExistingInvoiceMutation] = useAddToExistingInvoiceMutation();
  const [showExistingInvoiceOptions, setShowExistingInvoiceOptions] =
    useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Option | null>(null);
  const [existingInvoices, setExistingInvoices] = useState<Option[]>([]);
  const { data: inspectionsData } = useGetInspectionsQuery();

  useEffect(() => {
    if (inspectionsData && clientId) {
      const invoices = inspectionsData
        .filter(
          (insp) =>
            insp.client?.id === clientId &&
            insp.status === "Complete Not-Billed" &&
            insp.id !== inspectionId
        )
        .map((insp) => ({
          label: `${insp.customer.name} - ${insp.asset.name}`,
          value: insp.id,
        }));
      setExistingInvoices(invoices);
    }
  }, [inspectionsData, clientId, inspectionId]);

  useEffect(() => {
    if (servicesData) {
      const serviceOptions = servicesData.map((service) => ({
        label: `${service.name} - $${service.price}`,
        value: service.id,
      }));
      setServices(serviceOptions);

      if (serviceOptions.length > 0) {
        setServiceFee(serviceOptions[0]);
      }
    }
  }, [servicesData]);

  if (!isOpen) return null;

  const handleUpdateService = async (selectedServiceId: string) => {
    try {
      await updateInspection({
        id: inspectionId,
        serviceFeeId: selectedServiceId,
      }).unwrap();
      toast.success(
        "Inspection updated successfully with the selected service!"
      );
    } catch (error) {
      if (error) {
        toast.error("Error Updating Inspection: " + error);
      } else {
        toast.error("An unknown error occurred!");
      }
      console.error("Error Updating Inspection:", error);
    }
  };

  const handleUpload = async () => {
    if (!inspectionId || !inspection) return;
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
        inspectionId,
        clientId: inspection.client.id,
      });
      toast.success("PDF uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload PDF");
      throw error;
    }
  };

  const handleActionSubmit = async (actionType: string) => {
    if (!inspectionId || !clientId || !serviceFee?.value) return;
    try {
      setLoading(true);
      if (!inspection?.pdfFilePath) {
        await handleUpload();
      }

      await handleUpdateService(serviceFee.value);

      const requestBody = {
        inspectionId,
        serviceFee: parseFloat(serviceFee.label.split("- $")[1]),
      };

      if (actionType === "Submit & Bill Customer") {
        await markSubmitAndBill(requestBody).unwrap();
        toast.success("Inspection marked as complete and billed!");
        window.location.reload();
      } else if (actionType === "Submit & Don't Bill Customer") {
        await markSubmitWithoutBilling(requestBody).unwrap();
        toast.success("Inspection marked as complete without billing!");
        window.location.reload();
      } else if (actionType === "Submit & Add to Existing Invoice") {
        if (!selectedInvoice?.value) {
          toast.error("Please select an existing invoice.");
          return;
        }
        await addToExistingInvoiceMutation({
          inspectionId,
          invoiceId: selectedInvoice.value,
          serviceFee: parseFloat(serviceFee.label.split("- $")[1]),
        }).unwrap();
        toast.success("Inspection added to existing invoice!");
        window.location.reload();
      }

      navigate("/manage-inspections");
    } catch (error) {
      toast.error("Error completing the inspection action!");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (option: string) => {
    if (option === "Submit & Add to Existing Invoice") {
      setShowExistingInvoiceOptions(true);
    } else {
      handleActionSubmit(option);
    }
  };

  const handleSubmitExistingInvoice = () => {
    handleActionSubmit("Submit & Add to Existing Invoice");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-[1.5vw] rounded-lg shadow-lg w-[90%] max-w-[50vw]">
        <p className="text-[1.2vw] font-semibold text-darkgray-0 mb-[1vw]">
          Asset Inspection
        </p>
        <p className="text-darkgray-0 mb-[1.5vw]">
          Are you sure you want to complete this inspection?
        </p>

        {loading ? (
          <div className="flex justify-center">
            <Loader text="Processing..." />
          </div>
        ) : showExistingInvoiceOptions ? (
          <>
            <div className="mt-[1vw]">
              <SelectField
                label="Select Existing Invoice"
                value={selectedInvoice}
                onChange={setSelectedInvoice}
                options={existingInvoices}
                required
              />
            </div>
            <div className="mt-[1vw]">
              <SelectField
                label="Service Fee"
                value={serviceFee}
                onChange={setServiceFee}
                options={services}
                required
              />
            </div>
            <div className="flex justify-end space-x-[1vw] mt-[1vw]">
              <PurpleButton
                text="Submit"
                onClick={handleSubmitExistingInvoice}
              />
              <WhiteButton
                text="Cancel"
                onClick={() => {
                  setShowExistingInvoiceOptions(false);
                  onCancel();
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full grid grid-cols-2 mb-[1vw]">
              <div className="w-full">
                <PurpleButton
                  text="Submit & Bill Customer"
                  onClick={() => handleConfirm("Submit & Bill Customer")}
                  className="w-full"
                />
                <p className="text-[1vw] text-gray-0 mt-[0.5vw]">OR</p>
                <PurpleButton
                  text="Submit & Don't Bill Customer"
                  onClick={() => handleConfirm("Submit & Don't Bill Customer")}
                  className="mt-[0.5vw] w-full"
                />
                <p className="text-[1vw] text-gray-0 mt-[0.5vw]">OR</p>
                <PurpleButton
                  text="Submit & Add to Existing Invoice"
                  onClick={() =>
                    handleConfirm("Submit & Add to Existing Invoice")
                  }
                  className="mt-[0.5vw] w-full"
                />
                <div className="mt-[1vw]">
                  <SelectField
                    label="Service Fee"
                    value={serviceFee}
                    onChange={setServiceFee}
                    options={services}
                    required
                  />
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex justify-end space-x-[1vw]">
              <WhiteButton text="Cancel" onClick={onCancel} />
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default SubmitInvoiceModal;
