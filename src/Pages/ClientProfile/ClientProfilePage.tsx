import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ClientLayout from "../../Layouts/ClientLayout";
import DetailedClientInfo from "../../Components/ClientProfile/DetailedClientInfo";
import { useGetQuickBookSignUpLinkQuery } from "../../redux/api/clientApi";
import { setQuickBooksAuthUrl } from "../../redux/features/clientSlice";
import { RootState } from "../../redux/store";
import { useGetClientByIdQuery } from "../../redux/api/clientApi";
import { getUserId } from "../../utils/utils";
import CompanyExtraDetails from "../../Components/ClientProfile/CompanyExtraDetails";
import PurpleButton from "../../Components/Tags/PurpleButton";
import { useNavigate } from "react-router-dom";

const ClientProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetQuickBookSignUpLinkQuery();
  const clientId = getUserId();
  const navigate = useNavigate();
  const { data: client } = useGetClientByIdQuery(clientId as string);
  const quickbooksAuthUrl = useSelector(
    (state: RootState) => state.client.quickbooksAuthUrl
  );

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
        <PurpleButton
          text="Quickbook Sign Up"
          disabled={client?.quickbooksAccessToken != null}
          onClick={handleQuickBookSignUpClick}
        />
        <PurpleButton text="Edit Profile" />
        <PurpleButton text="Edit Payment" />
        <PurpleButton
          text="Edit Company"
          onClick={() => navigate("/update-company")}
        />
        <PurpleButton text="Change Fee Plan" />
      </div>
      <CompanyExtraDetails />
    </ClientLayout>
  );
};

export default ClientProfilePage;
