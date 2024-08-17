import React, { useState, useEffect } from "react";
import { useGetAssetsQuery } from "../../../redux/api/assetApi";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../../utils/utils";
import { Asset } from "../../../redux/features/assetSlice";

const AssetDetails: React.FC = () => {
  const [assetData, setAssetData] = useState<Asset[] | null>(null);
  const { data: assets } = useGetAssetsQuery();
  const clientId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (assets) {
      const filteredAssets = assets.filter(
        (asset) => asset.client?.id === clientId
      );
      setAssetData(filteredAssets);
    }
  }, [assets, clientId]);

  const handleEditAsset = (id: string) => {
    navigate(`/edit-asset/${id}`);
  };

  const handleShowPumps = (id: string) => {
    localStorage.setItem("assetId", id);
    navigate(`/asset-pumps`);
  };

  return (
    <div className="p-[1vw] m-[2vw] font-inter bg-white shadow-lg rounded-lg">
      <div className="flex p-[0.2vw] justify-between bg-textpurple-0 rounded-[0.5vw] bg-opacity-5 font-semibold">
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center shadow-lg rounded-[0.5vw] bg-white">
          Assets
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Inspection History
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Up-Coming Inspection
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Photos
        </button>
        <button className="flex-1 py-[0.5vw] text-[1vw] text-darkgray-0 text-center">
          Notes
        </button>
      </div>
      {assetData?.map((asset) => (
        <div
          key={asset.id}
          className="border rounded p-[1vw] mt-[1vw] relative"
        >
          <div className="grid grid-cols-5 gap-y-[3vw] gap-x-[1vw] w-full text-darkgray-0">
            <div>
              <p className="text-[1vw] font-semibold">Asset Name:</p>
              <p className="text-[1vw]">{asset.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Asset Duty:</p>
              <p className="text-[1vw]">{asset.duty || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Size:</p>
              <p className="text-[1vw]">{asset.size || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Pumps:</p>
              <p className="text-[1vw]">
                {asset.pumps !== null ? asset.pumps : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Asset ID:</p>
              <p className="text-[1vw]">{asset.id || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Rails:</p>
              <p className="text-[1vw]">{asset.rails || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Floats:</p>
              <p className="text-[1vw]">
                {asset.float !== null ? asset.float : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Smart:</p>
              <p className="text-[1vw]">{asset.smart || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Pipe Diameter:</p>
              <p className="text-[1vw]">
                {asset.pipeDia !== null ? asset.pipeDia : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Material:</p>
              <p className="text-[1vw]">{asset.material || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Inspection Interval:</p>
              <p className="text-[1vw]">{asset.inspectionInterval || "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] font-semibold">Status:</p>
              <p className="text-[1vw]">{asset.status || "N/A"}</p>
            </div>
          </div>
          <div className="flex justify-between mt-[1vw] w-2/3 absolute bottom-[1vw] right-[1vw]">
            <button
              className="flex-1 py-[0.5vw] mx-[0.2vw] text-[1vw] font-semibold text-darkgray-0 bg-white border rounded text-center"
              onClick={() => handleEditAsset(asset.id)}
            >
              Edit Asset
            </button>
            <button
              className="flex-1 py-[0.5vw] mx-[0.2vw] text-[1vw] font-semibold text-darkgray-0 bg-white border rounded text-center"
              onClick={() => handleShowPumps(asset.id)}
            >
              Asset Pumps
            </button>
            <button className="flex-1 py-[0.5vw] mx-[0.2vw] text-[1vw] font-semibold text-darkgray-0 bg-white border rounded text-center">
              Asset Details
            </button>
            <button className="flex-1 py-[0.5vw] mx-[0.2vw] text-[1vw] font-semibold text-darkgray-0 bg-white border rounded text-center">
              Asset Photos
            </button>
            <button className="flex-1 py-[0.5vw] mx-[0.2vw] text-[1vw] font-semibold text-darkgray-0 bg-white border rounded text-center">
              Manage Asset
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetDetails;
