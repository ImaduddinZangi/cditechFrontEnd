import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PurpleButton from "../../Tags/PurpleButton";
import WhiteButton from "../../Tags/WhiteButton";
import { useGetPumpBrandsQuery } from "../../../redux/api/pumpBrandApi";
import { PumpBrand } from "../../../redux/features/pumpBrandSlice";
import Loader from "../../Constants/Loader";
import { useNavigate } from "react-router-dom";

const PumpBrandsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: brands, isLoading, error } = useGetPumpBrandsQuery();
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="bg-yellow-200">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  if (isLoading) return <div><Loader /></div>;
  if (error) return <div>Error loading pump brands.</div>;

  const filteredBrands = brands?.filter(
    (brand: PumpBrand) =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNewPumpButton = () => {
    navigate("/add-pump-brand");
  }

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <div className="flex justify-between items-center px-[1.5vw] py-[1vw]">
        <div className="flex space-x-[1vw]">
          <PurpleButton
            text="Add New Pump Brand"
            onClick={handleAddNewPumpButton}
            className="flex items-center"
          />
          <PurpleButton
            text="Sort Pump Brands"
            onClick={() => alert("Sort Pump Brands functionality coming soon!")}
            className="flex items-center"
          />
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
                Logo
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Brand Name
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Brand Model
              </th>
              <th className="py-[1vw] px-[1.5vw] font-inter font-medium text-[1vw] text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-[1vw] font-light">
            {filteredBrands?.map((brand: PumpBrand) => (
              <tr
                key={brand.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                  <img
                    src={"/assets/no-image.jpg"}
                    alt={`${brand.name} logo`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                  {highlightText(brand.name, searchTerm)}
                </td>
                <td className="py-[1vw] px-[1.5vw] text-left font-inter font-normal text-[1vw]">
                  {highlightText(brand.model, searchTerm)}
                </td>
                <td className="flex flex-row items-center gap-x-[1vw] py-[1vw] px-[1.5vw] text-center">
                  <PurpleButton
                    text="Brand Detail"
                    onClick={() => alert(`Viewing details for ${brand.name}`)}
                  />
                  <WhiteButton
                    text="Edit"
                    onClick={() => alert(`Editing brand ${brand.name}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PumpBrandsTable;
