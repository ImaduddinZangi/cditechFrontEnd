import React, { useState } from "react";
import ReactDOM from "react-dom";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: (selectedOption?: string) => void;
  onCancel: () => void;
  selectFieldOptions?: { id: string | undefined; name: string }[];
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title = "Confirmation",
  message,
  onConfirm,
  onCancel,
  selectFieldOptions,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    selectFieldOptions ? selectFieldOptions[0].id : undefined
  );

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedOption);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-[500px]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        {selectFieldOptions && (
          <div className="mb-6">
            <label className="block text-darkgray-0 font-medium text-[1vw]" htmlFor="modal-select">
              Select an option:
            </label>
            <select
              id="modal-select"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="mt-1 block w-full border py-[0.2vw] px-[0.5vw] rounded-[0.4vw] placeholder:text-[1vw] placeholder:text-lightgray-0 opacity-[60%] focus:outline-none"
            >
              {selectFieldOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <PurpleButton text="Confirm" onClick={handleConfirm} />
          <WhiteButton text="Cancel" onClick={onCancel} />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
