import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import ConfirmationModal from "../Constants/ConfirmationModal";

interface ProductService {
  id: string;
  name: string;
  description: string;
  price: string;
}

const ProductServicesTable: React.FC = () => {
  // Dummy data for product services
  const initialProductServices: ProductService[] = [
    {
      id: "1",
      name: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$473.85",
    },
    {
      id: "2",
      name: "Service Name",
      description: "Aliquam pulvinar vestibulum blandit.",
      price: "$944.85",
    },
    {
      id: "3",
      name: "Service Name",
      description: "Vestibulum eu quam nec neque pellentesque.",
      price: "$446.61",
    },
    {
      id: "4",
      name: "Service Name",
      description: "In a laoreet purus.",
      price: "$854.08",
    },
    {
      id: "5",
      name: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$854.08",
    },
    {
      id: "6",
      name: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$858.08",
    },
    {
      id: "7",
      name: "Service Name",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: "$824.08",
    },
  ];

  const [productServices, setProductServices] = useState<ProductService[]>(
    initialProductServices
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceIdToDelete, setServiceIdToDelete] = useState<string | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredProductServices = productServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setServiceIdToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setProductServices((prev) =>
      prev.filter((service) => service.id !== serviceIdToDelete)
    );
    setIsModalOpen(false);
    setServiceIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setServiceIdToDelete(null);
  };

  const handleManage = (id: string) => {
    console.log("Manage service with id:", id);
  };

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton text="Add New Services" onClick={() => {}} />
          <PurpleButton text="Import Services" onClick={() => {}} />
          <PurpleButton text="Sort" onClick={() => {}} />
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="px-[1vw] py-[0.2vw] border rounded-[0.5vw] placeholder:text-[1vw] text-[1vw] focus:outline-none"
          />
          <FiSearch
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            size={16}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="h-[3vw] text-darkgray-0 border-b uppercase text-[1vw] leading-normal">
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Service Name
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Description
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Price
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {filteredProductServices.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-[2vw]">
                  <p className="text-[1.5vw] font-semibold">
                    No services found
                  </p>
                </td>
              </tr>
            ) : (
              filteredProductServices.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {service.name}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {service.description}
                  </td>
                  <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                    {service.price}
                  </td>
                  <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                    <WhiteButton
                      text="Manage"
                      onClick={() => handleManage(service.id)}
                    />

                    <PurpleButton
                      text="Edit"
                      onClick={() => handleDelete(service.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={"Are you sure you want to delete this service?"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProductServicesTable;
