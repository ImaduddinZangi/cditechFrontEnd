import React from 'react'
import ClientLayout from '../../Layouts/ClientLayout'
import ProductServicesTable from '../../Components/Extras/ProductServicesTable'

const ProductServicesTablePage: React.FC = () => {
  return (
    <ClientLayout breadcrumb='Product Service List'>
        <ProductServicesTable />
    </ClientLayout>
  )
}

export default ProductServicesTablePage