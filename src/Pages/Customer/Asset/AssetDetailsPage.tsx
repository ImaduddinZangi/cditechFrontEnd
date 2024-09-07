import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import DetailedAssets from '../../../Components/Customer/Asset/DetailedAssets'
import AssetPumps from '../Pump/AssetPumps'

const AssetDetailsPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Asset Details'>
        <DetailedAssets />
        <AssetPumps />
    </ClientLayout>
  )
}

export default AssetDetailsPage