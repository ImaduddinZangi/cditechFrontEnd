import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import FeePlan from '../../Components/Packages/FeePlan';

const FeePlansPage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Fee Plan'>
      <FeePlan />
    </ClientLayout>
  )
}

export default FeePlansPage;