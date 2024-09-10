import React from "react";
import { Pump } from "../../../redux/features/pumpSlice";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

const PumpCard: React.FC<{
  pump: Pump;
  index: number;
  onEdit: (pump: Pump) => void;
  onDelete: () => void;
  photoUrl: string;
}> = ({ pump, index, onEdit, photoUrl, onDelete }) => (
  <div className="flex items-center justify-between border p-[1vw] mb-[1vw] rounded-lg">
    <div className="w-1/6">
      <div className="w-full flex flex-row items-center">
        <p className="text-gray-0 font-inter font-medium text-[1vw]">Pump #</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {index + 1}
        </p>
      </div>
      <img
        src={photoUrl}
        alt={pump.name}
        className="w-[8vw] h-[8vw] object-cover rounded-md mb-0"
      />
    </div>
    <div className="flex-1 w-2/3 grid grid-cols-4 gap-[1vw]">
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">Brand:</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.name}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">
          Avg-AMPS:
        </p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.avgAmps}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">
          Max-AMPS:
        </p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.maxAmps}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">
          Pump-ID:
        </p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.id}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">HP:</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.hp}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">
          Installed:
        </p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {formatDate(pump.installedDate)}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">
          Warranty:
        </p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.warranty}
        </p>
      </div>
      <div>
        <p className="text-gray-0 font-inter font-medium text-[1vw]">Serial:</p>
        <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
          {pump.serial}
        </p>
      </div>
    </div>
    <div className="w-1/6 flex justify-center space-x-[1vw]">
      <PurpleButton type="button" text="Edit" onClick={() => onEdit(pump)} />
      <WhiteButton type="button" text="Delete" onClick={onDelete} />
    </div>
  </div>
);

export default PumpCard;
