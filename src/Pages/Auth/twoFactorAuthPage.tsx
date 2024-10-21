import React, { useEffect, useState } from "react";
import AuthLayout from "../../Layouts/AuthLayout";
import TwoFactorAuthentication from "../../Components/Auth/TwoFactorAuthentication";
import {
  useGenerateQrCodeMutation,
  useVerifyCodeMutation,
} from "../../redux/api/twoFactorAuthApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Constants/Loader";

const TwoFactorAuthPage: React.FC = () => {
  const [generateQrCode] = useGenerateQrCodeMutation();
  const [loading, setLoading] = useState(false);
  const [verifyCode] = useVerifyCodeMutation();
  const [qrCode, setQrCode] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQrCode = async () => {
      try {
        const response = await generateQrCode().unwrap();
        setQrCode(response.qrCode);
      } catch (error) {
        toast.error("Failed to generate QR code.");
      }
    };

    fetchQrCode();
  }, [generateQrCode]);

  const handleSubmit = async (code: string) => {
    try {
      setLoading(true);
      await verifyCode({ code }).unwrap();
      toast.success("2FA verified successfully", {
        onClose: () => navigate("/client-dashboard"),
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to verify 2FA code.", {
        onClose: () => navigate("/error/500"),
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Loader text="Processing..." />
        </div>
      ) : (
        qrCode && (
          <TwoFactorAuthentication src={qrCode} onSubmit={handleSubmit} />
        )
      )}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthLayout>
  );
};

export default TwoFactorAuthPage;
