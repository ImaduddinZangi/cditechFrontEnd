import React from "react";
import Sidebar from "../Components/Constants/Sidebar";
import CustomerHeader from "../Components/Constants/CustomerHeader";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const CustomerLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <Sidebar>
      <CustomerHeader />
      {children}
    </Sidebar>
  );
};

export default CustomerLayout;
