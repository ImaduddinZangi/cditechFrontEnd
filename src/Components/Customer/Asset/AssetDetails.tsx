import React, { useState, useEffect } from "react";
import {
  useGetAssetsQuery,
  useDeleteAssetMutation,
} from "../../../redux/api/assetApi";
import { useNavigate } from "react-router-dom";
import { Asset } from "../../../redux/features/assetSlice";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Constants/ConfirmationModal";
import WhiteButton from "../../Tags/WhiteButton";

const AssetDetails: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetData, setAssetData] = useState<Asset[] | null>(null);
  const [deleteAsset] = useDeleteAssetMutation();
  const { data: assets } = useGetAssetsQuery();
  const [assetIdToDelete, setAssetIdToDelete] = useState<
    string | undefined | null
  >(null);
  const navigate = useNavigate();

  const customerId = localStorage.getItem("selectedCustomerId");

  useEffect(() => {
    if (assets) {
      const filteredAssets = assets.filter(
        (asset) => asset.customer?.id === customerId
      );
      setAssetData(filteredAssets);
    }
  }, [assets, customerId]);

  const handleEditAsset = (id: string) => {
    navigate(`/edit-asset/${id}`);
  };

  const handleShowPumps = (id: string) => {
    localStorage.setItem("assetId", id);
    navigate(`/asset-details/${id}`);
  };

  const handleOpenDeleteModal = (id: string | undefined) => {
    setAssetIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (assetIdToDelete) {
      try {
        await deleteAsset(assetIdToDelete).unwrap();
        toast.success("Asset deleted successfully!", {
          onClose: () => window.location.reload(),
          autoClose: 500,
        });
      } catch (error) {
        toast.error("Error deleting asset!");
      } finally {
        setIsModalOpen(false);
        setAssetIdToDelete(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setAssetIdToDelete(null);
  };

  return (
    <div className="p-[1vw] font-inter max-h-[93vh] overflow-y-auto">
      {assetData?.map((asset) => (
        <div
          key={asset.id}
          className="border-[0.15vw] rounded p-[1vw] mt-[1vw] relative"
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
          <div className="flex justify-between mt-[1vw] w-1/2 absolute bottom-[1vw] right-[1vw]">
            <WhiteButton
              type="button"
              className="shadow-md"
              text="Edit Asset"
              onClick={() => handleEditAsset(asset.id)}
            />
            <WhiteButton
              type="button"
              className="shadow-md"
              text="Asset Details"
              onClick={() => handleShowPumps(asset.id)}
            />
            <WhiteButton
              type="button"
              className="shadow-md"
              text="Asset Photos"
              onClick={() => navigate(`/add-photos/asset/${asset.id}`)}
            />
            <WhiteButton
              type="button"
              className="shadow-md"
              text="Delete Asset"
              onClick={() => handleOpenDeleteModal(asset.id)}
            />
          </div>
        </div>
      ))}
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this asset?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AssetDetails;
