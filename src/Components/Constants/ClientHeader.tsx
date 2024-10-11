import React, { useEffect } from "react";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { useGetPhotosQuery } from "../../redux/api/uploadPhotosApi";
import { useGetCompanyByClientIdQuery } from "../../redux/api/companyApi";
import { getUserId } from "../../utils/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import { Link } from "react-router-dom";

interface ClientHeaderProps {
  breadcrumb: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ breadcrumb }) => {
  const clientId = getUserId();
  const { data: photosData } = useGetPhotosQuery();
  const {
    data: client,
    error,
    isLoading,
  } = useGetClientByIdQuery(clientId || "");

  const { data: company } = useGetCompanyByClientIdQuery(clientId || "");

  useEffect(() => {
    if (error) {
      toast.error("Error loading client details");
    }
  }, [error]);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  const photo = photosData?.find(
    (photo) =>
      photo.clientId === clientId &&
      !photo.assetId &&
      !photo.customerId &&
      !photo.inspectionId &&
      !photo.pumpBrandId &&
      !photo.pumpId
  );
  const photoUrl = photo
    ? `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${photo.url}`
    : "/assets/no-image.jpg";

  return (
    <div className="flex justify-between items-center p-[2vw]">
      <div className="flex items-center">
        <img
          src="/assets/home-line.png"
          alt="icon"
          className="w-[1.5vw] h-[1.5vw]"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <img src="/assets/chevron-right.png" alt="icon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-[1vw] font-inter font-semibold text-darkgray-0">
          {breadcrumb}
        </span>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-end">
          <p className="text-darkgray-0 text-[1vw] font-semibold leading-none font-inter">
            {client?.first_name}, {client?.last_name}
          </p>
          <p className="text-gray-0 text-[1vw] font-inter">
            {company?.company_name}
          </p>
          <p className="text-gray-0 text-[1vw] font-inter">
            {client?.userGroups?.find(() => true)?.name || "No group assigned"}
          </p>
        </div>
        <Link to={`/add-photos/client/${clientId}`}>
          <img
            className="ml-[1vw] w-[4vw] h-[4vw] rounded-full cursor-pointer"
            src={photoUrl || "https://via.placeholder.com/150"}
            alt={client?.first_name || "Client Image"}
          />
        </Link>
      </div>
    </div>
  );
};

export default ClientHeader;
