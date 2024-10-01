import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedClientInfo from "../../Components/ClientDashboard/DetailedClientInfo";
import { useGetQuickBookSignUpLinkQuery } from "../../redux/api/clientApi";
import { setQuickBooksAuthUrl } from "../../redux/features/clientSlice";
import { RootState } from "../../redux/store";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { getUserId } from "../../utils/utils";
import CompanyExtraDetails from "../../Components/Extras/CompanyExtraDetails";

const ClientProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetQuickBookSignUpLinkQuery();
  const clientId = getUserId();
  const { data: client } = useGetClientByIdQuery(clientId as string);
  const quickbooksAuthUrl = useSelector((state: RootState) => state.client.quickbooksAuthUrl);

  useEffect(() => {
    if (data && data.url) {
      dispatch(setQuickBooksAuthUrl(data.url));
    }
  }, [data, dispatch]);

  const handleQuickBookSignUpClick = () => {
    if (quickbooksAuthUrl) {
      window.open(quickbooksAuthUrl, "_blank");
    }
  };

  return (
    <ClientLayout breadcrumb="Manage Client">
      <DetailedClientInfo />
      <div className="m-[2vw] flex flex-row items-center gap-[1vw]">
        <button
          disabled={client?.quickbooksAccessToken != null}
          onClick={handleQuickBookSignUpClick}
          className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md"
        >
          Quickbook Sign Up
        </button>
        <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
          Edit Profile
        </button>
        <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
          Edit Payment
        </button>
        <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
          Edit Company Logo
        </button>
        <button className="bg-purple-0 text-[1vw] text-white font-inter font-medium px-[1vw] py-[0.5vw] rounded-md">
          Change Fee Plan
        </button>
      </div>
      <CompanyExtraDetails />
    </ClientLayout>
  );
};

export default ClientProfilePage;
