import React from "react";
import ClientLayout from "../../Layouts/ClientLayout";
import AssetsMap from "../../Components/Maps/AssetsMap";

const AssetsMapPage: React.FC = () => {

    return (
        <ClientLayout breadcrumb="Assets Map">
            <AssetsMap />
        </ClientLayout>
    );
};

export default AssetsMapPage;
