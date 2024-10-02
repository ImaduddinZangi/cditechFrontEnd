import React, { useEffect } from "react";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { useGetPhotosQuery } from "../../redux/api/uploadPhotosApi";
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
  const photo = photosData?.find((photo) => photo.clientId === clientId);
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
      <div className="flex items-center">
        {/* Clickable image wrapped in Link */}
        <Link to={`/add-photos/client/${clientId}`}>
          <img
            className="w-[2.5vw] h-[2.5vw] rounded-full mr-[1vw] cursor-pointer"
            src={photoUrl || "https://via.placeholder.com/150"}
            alt={client?.name || "Client Image"}
          />
        </Link>
        <div>
          <p className="text-darkgray-0 text-[1vw] font-semibold leading-none font-inter">
            {client?.name}
          </p>
          <p className="text-gray-0 text-[1vw] font-inter">{client?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
