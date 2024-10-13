import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import SelectField, { Option } from "../../Tags/SelectField";
import { useGetServicesQuery } from "../../../redux/api/serviceApi";

interface SubmitInvoiceModalProps {
  isOpen: boolean;
  onConfirm: (option: string) => void;
  onCancel: () => void;
}

const SubmitInvoiceModal: React.FC<SubmitInvoiceModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const [serviceFee, setServiceFee] = useState<Option | null>(null);
  const [services, setServices] = useState<Option[]>([]);

  const { data: servicesData } = useGetServicesQuery();

  useEffect(() => {
    if (servicesData) {
      const serviceOptions = servicesData.map((service) => ({
        label: `${service.name} - $${service.price.toFixed(2)}`,
        value: service.id,
      }));
      setServices(serviceOptions);

      if (serviceOptions.length > 0) {
        setServiceFee(serviceOptions[0]);
      }
    }
  }, [servicesData]);

  if (!isOpen) return null;

  const handleConfirm = (option: string) => {
    onConfirm(option);
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
              onClick={() => handleConfirm("Submit & Add to Existing Invoice")}
              className="mt-[0.5vw] w-full"
            />
            <div className="mt-[1vw]">
              <SelectField
                label="Service Fee"
                value={serviceFee}
                onChange={setServiceFee}
                options={services}
              />
            </div>
          </div>
          <div></div>
        </div>

        <div className="flex justify-end space-x-[1vw]">
          <WhiteButton text="Cancel" onClick={onCancel} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SubmitInvoiceModal;
