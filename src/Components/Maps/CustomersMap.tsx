import React, { useEffect, useState } from 'react';
import { useGetCustomersQuery } from '../../redux/api/customerApi';
import UtilityMaps from './UtilityMaps';
import { getLatLngFromAddress } from '../../utils/utils';


const CustomersMap: React.FC = () => {
  const { data: customersData } = useGetCustomersQuery();
  const [mapData, setMapData] = useState<
    Array<{ id: string; lat: number; lng: number; label: string }>
  >([]);

  useEffect(() => {
    const fetchLatLng = async () => {
      if (customersData) {
        const mappedData = await Promise.all(
          customersData.map(async (customer) => {
            const latLng = await getLatLngFromAddress(customer.service_address);
            if (latLng) {
              return {
                id: customer.id,
                lat: latLng.lat,
                lng: latLng.lng,
                label: customer.name,
              };
            }
            return null;
          })
        );

        setMapData(mappedData.filter((data) => data !== null) as Array<{
          id: string;
          lat: number;
          lng: number;
          label: string;
        }>);
      }
    };

    fetchLatLng();
  }, [customersData]);

  return (
    <div>
      <UtilityMaps mapType="customers" data={mapData} />
    </div>
  );
};

export default CustomersMap;
