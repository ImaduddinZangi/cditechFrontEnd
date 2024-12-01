import React from "react";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import PurpleButton from "../../Tags/PurpleButton";

interface TaskTypesCardProps {
  title: string;
  pairedService: string;
  serviceFee: number;
  onViewDetails: () => void;
  onPayServiceFee: () => void;
}

const TaskTypesCard: React.FC<TaskTypesCardProps> = ({
  title,
  pairedService,
  serviceFee,
  onViewDetails,
  onPayServiceFee,
}) => {
  return (
    <div className="p-[1vw] w-full bg-white shadow-md rounded-lg font-inter">
      <div className="w-full flex flex-row justify-between items-center">
        <div>
          <h3 className="block text-[1vw] font-medium text-gray-0">{title}</h3>
          <p className="block text-[1vw] font-medium text-gray-0">Paired Service:</p>
          <p className="block text-[1vw] font-medium text-darkgray-0">
            {pairedService} - ${serviceFee}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-center space-x-[1vw]">
          <OutlinePurpleButton text="View Details" onClick={onViewDetails} />
          <PurpleButton text="Pay Service Fee" onClick={onPayServiceFee} />
        </div>
      </div>
    </div>
  );
};

export default TaskTypesCard;
