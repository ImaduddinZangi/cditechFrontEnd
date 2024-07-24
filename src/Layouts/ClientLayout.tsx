import React from "react";
import Sidebar from "../Components/Constants/Sidebar";
import ClientHeader from "../Components/Constants/ClientHeader";

interface ClientLayoutProps {
  children: React.ReactNode;
  breadcrumb: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({
  children,
  breadcrumb,
}) => {
  return (
    <Sidebar>
      <ClientHeader breadcrumb={breadcrumb} />
      <div className="pb-[12vh]">{children}</div>
    </Sidebar>
  );
};

export default ClientLayout;
