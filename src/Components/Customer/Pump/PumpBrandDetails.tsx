import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPumpBrandByIdQuery } from "../../../redux/api/pumpBrandApi";
import { useGetPhotosQuery } from "../../../redux/api/uploadPhotosApi";
import PurpleButton from "../../Tags/PurpleButton";
import Loader from "../../Constants/Loader";

const PumpBrandDetails: React.FC = () => {
  const { pumpBrandId } = useParams<{ pumpBrandId?: string }>();
  const navigate = useNavigate();

  const { data: photosData } = useGetPhotosQuery();

  const {
    data: pumpBrand,
    isLoading,
    error,
  } = useGetPumpBrandByIdQuery(pumpBrandId!);

  if (!pumpBrandId) {
    return <div>Error: Pump Brand ID is not available.</div>;
  }

  const brandPhoto = photosData?.find(
    (photo) => photo.pumpBrandId === pumpBrandId
  );
  const photoUrl = brandPhoto
    ? `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${brandPhoto.url}`
    : "/assets/no-image.jpg";

  const handleEditClick = () => {
    navigate(`/edit-pump-brand/${pumpBrandId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error || !pumpBrand) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <p>Error loading pump brand details</p>
      </div>
    );
  }

  return (
    <div className="p-[2vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="grid grid-cols-3 gap-[2vw]">
        <div className="col-span-2">
          <div className="flex space-x-[4vw] mb-[3vw]">
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold">
                Brand Name:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium">
                {pumpBrand.name}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold">
                Brand Model:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium">
                {pumpBrand.model}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold">
                Brand ID:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium">
                {pumpBrand.id}
              </p>
            </div>
          </div>
          <div className="flex space-x-[4vw] mb-[3vw]">
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold">
                Brand Website:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium">
                {pumpBrand.website}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold">
                Brand Phone No:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium">
                {pumpBrand.phone}
              </p>
            </div>
          </div>
          <div className="mb-[3vw]">
            <p className="text-[1.1vw] text-darkgray-0 font-semibold">
              Brand Address:
            </p>
            <p className="text-[1vw] text-gray-0 font-medium">
              {pumpBrand.address}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-[1.1vw] text-darkgray-0 font-semibold mr-[2vw]">
              Made in USA:
            </p>
            {/* <div className="flex items-center space-x-[1vw]">
              <label className="text-[1vw] text-gray-0 font-medium">
                <input
                  type="radio"
                  value="yes"
                  checked={pumpBrand.madeInUsa === true}
                  readOnly
                  className="mr-[0.5vw] accent-purple-0"
                />
                Yes
              </label>
              <label className="text-[1vw] text-gray-0 font-medium">
                <input
                  type="radio"
                  value="no"
                  checked={pumpBrand.madeInUsa === false}
                  readOnly
                  className="mr-[0.5vw] accent-purple-0"
                />
                No
              </label>
            </div> */}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={photoUrl}
            alt={`${pumpBrand.name} logo`}
            className="w-[6vw] h-[6vw] object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-end mt-[2vw] gap-[2vw]">
        <PurpleButton text="Edit Brand" onClick={handleEditClick} />
        <PurpleButton text="Upload Photo" onClick={() => navigate(`/add-photos/pumpBrand/${pumpBrandId}`)} />
      </div>
    </div>
  );
};

export default PumpBrandDetails;
