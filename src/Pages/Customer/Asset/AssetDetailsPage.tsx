import React from 'react'
import ClientLayout from '../../../Layouts/ClientLayout'
import DetailedAssets from '../../../Components/Customer/Asset/DetailedAssets'
import AssetPumps from '../Pump/AssetPumps'
import { useGetAssetByIdQuery } from '../../../redux/api/assetApi'
import { useParams } from 'react-router-dom'

const AssetDetailsPage: React.FC = () => {
  const { assetId } = useParams<{ assetId: string }>();
  const { data: asset } = useGetAssetByIdQuery(assetId || "");

  return (
    <ClientLayout breadcrumb='Asset Details'>
      <DetailedAssets />
      {asset &&
        asset.assetType.name === "Lift Station" &&
        <AssetPumps />
      }
    </ClientLayout>
  )
}

export default AssetDetailsPage