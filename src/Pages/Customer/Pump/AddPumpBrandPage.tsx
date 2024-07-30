import React from "react";
import ClientLayout from "../../../Layouts/ClientLayout";
import AddPumpBrand from "../../../Components/Customer/Pump/AddPumpBrand";
import { useCreatePumpBrandMutation } from "../../../redux/api/pumpBrandApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddPumpBrandPage: React.FC = () => {
  const [createPumpBrand] = useCreatePumpBrandMutation();
  const navigate = useNavigate();

  const handleAddPumpBrand = async (
    name: string,
    model: string,
    phone: string,
    address: string,
    madeInUsa: boolean
  ) => {
    try {
      const result = await createPumpBrand({
        name,
        model,
        phone,
        address,
        madeInUsa,
      }).unwrap();
      toast.success("Pump Brand added successfully!", {
        onClose: () => navigate("/add-pump"),
        autoClose: 500,
      });
      console.log("Pump created successfully", result);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error adding Pump Brand: " + error.message);
        console.error("Error adding Pump Brand:", error);
      } else {
        toast.error("An unknown error occurred.");
        console.error("An unknown error occurred:", error);
      }
    }
  };

  return (
    <ClientLayout breadcrumb="Add Pump Brand">
      <AddPumpBrand onSubmit={handleAddPumpBrand} />
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ClientLayout>
  );
};

export default AddPumpBrandPage;
