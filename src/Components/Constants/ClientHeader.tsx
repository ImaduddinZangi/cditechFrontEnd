import React, { useEffect } from "react";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { getUserId } from "../../utils/utils";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ClientHeaderProps {
  breadcrumb: string;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ breadcrumb }) => {
  const clientId = getUserId();
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

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-between items-center p-[4vw] md:p-[2vw]">
      <div className="flex items-center">
        <img
          src="/assets/home-line.png"
          alt="icon"
          className="w-[3vw] md:w-[1.5vw] h-[3vw] md:h-[1.5vw]"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <img src="/assets/chevron-right.png" alt="icon" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span className="text-[2.5vw] md:text-[1vw] font-inter font-semibold text-darkgray-0">
          {breadcrumb}
        </span>
      </div>
      <div className="flex items-center">
        <img
          className="w-[5vw] md:w-[2.5vw] h-[5vw] md:h-[2.5vw] rounded-full mr-[2vw] md:mr-[1vw]"
          src="https://via.placeholder.com/150"
          alt="Oliver Ray"
        />
        <div>
          <p className="text-darkgray-0 text-[2.5vw] md:text-[1vw] font-semibold leading-none font-inter">
            {client?.name}
          </p>
          <p className="text-gray-0 text-[2.5vw] md:text-[1vw] font-inter">
            {client?.email}
          </p>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default ClientHeader;
