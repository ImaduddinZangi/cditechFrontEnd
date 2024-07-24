import React from "react";

interface AssetDetailsProps {
  assetName: string;
  assetType: string;
  size: string;
  rails: string;
  floats: number;
  smart: string;
  inspectionInterval: string;
  lastInspectionDate: string;
  power: string;
  assetId: string;
  pipeDia: string;
  material: string;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({
  assetName,
  assetType,
  size,
  rails,
  floats,
  smart,
  inspectionInterval,
  lastInspectionDate,
  power,
  assetId,
  pipeDia,
  material,
}) => {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="flex space-x-2 mb-4">
        <button className="flex-1 py-2 bg-gray-200 rounded text-center">
          Assets
        </button>
        <button className="flex-1 py-2 bg-gray-200 rounded text-center">
          Inspection History
        </button>
        <button className="flex-1 py-2 bg-gray-200 rounded text-center">
          Up-Coming Inspection
        </button>
        <button className="flex-1 py-2 bg-gray-200 rounded text-center">
          Photos
        </button>
        <button className="flex-1 py-2 bg-gray-200 rounded text-center">
          Notes
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div className="flex flex-row">
          <div className="flex flex-row justify-between">
            <strong>Asset Name:</strong> {assetName}
          </div>
          <div>
            <strong>Asset Type:</strong> {assetType}
          </div>
          <div>
            <strong>Size:</strong> {size}
          </div>
          <div>
            <strong>Power:</strong> {power}
          </div>
        </div>
        <div className="flex flex-row">
          <div>
            <strong>Asset ID:</strong> {assetId}
          </div>
          <div>
            <strong>Rails:</strong> {rails}
          </div>
          <div>
            <strong>Floats:</strong> {floats}
          </div>
          <div>
            <strong>Smart:</strong> {smart}
          </div>
        </div>

        <div className="flex flex-row justify-between">
          <div >
            <strong>Pipe Dia:</strong> {pipeDia}
          </div>
          <div>
            <strong>Material:</strong> {material}
          </div>
          <div>
            <strong>Inspection Interval:</strong> {inspectionInterval}
          </div>
          <div>
            <strong>Last Inspection Date:</strong> {lastInspectionDate}
          </div>
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="flex-1 py-2 bg-blue-500 text-white rounded text-center">
          Asset Details
        </button>
        <button className="flex-1 py-2 bg-blue-500 text-white rounded text-center">
          Map Asset
        </button>
        <button className="flex-1 py-2 bg-blue-500 text-white rounded text-center">
          Asset Photos
        </button>
        <button className="flex-1 py-2 bg-blue-500 text-white rounded text-center">
          Manage Asset
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
