import React from "react";
import { useParams } from "react-router-dom";
import { useGetAssetByIdQuery } from "../../../redux/api/assetApi";
import Loader from "../../Constants/Loader";

const DetailedAssets: React.FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const {
    data: asset,
    error,
    isLoading,
  } = useGetAssetByIdQuery(assetId || "");

  if (isLoading) return (
    <div className="w-full h-[80vh]">
      <Loader />
    </div>
  );
  if (error) return <p>Error loading asset details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {asset && (
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Asset Name:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.name}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Location:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.location}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Status:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.status}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Asset ID:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.id}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Description:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.description}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Latitude:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.latitude}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Longitude:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.longitude}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              Inspection Interval:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.inspectionInterval}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              QR Code:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.qrCode}
            </p>
          </div>
          <div>
            <p className="text-[1vw] text-gray-0 font-medium font-inter">
              NFC Code:
            </p>
            <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
              {asset.nfcCode}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedAssets;
