import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import Webcam from "react-webcam";

interface AddPhotosProps {
  onSubmit: (files: File[], id: string, type: string) => void;
}

const AddPhotos: React.FC<AddPhotosProps> = ({ onSubmit }) => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [photos, setPhotos] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [photoPreviews, setPhotoPreviews] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
  const [webcamIndex, setWebcamIndex] = useState<number | null>(null);
  const [hasWebcam, setHasWebcam] = useState<boolean>(true);
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setHasWebcam(true))
      .catch(() => setHasWebcam(false));
  }, []);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const isValid = await validateFile(file);
      if (isValid) {
        const newPreviewUrl = URL.createObjectURL(file);
        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos[index] = file;
          return updatedPhotos;
        });
        setPhotoPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[index] = newPreviewUrl;
          return updatedPreviews;
        });
      } else {
        toast.error(
          "Invalid file type or size. Please upload images with max. 1080x1080px size."
        );
      }
    }
  };

  const validateFile = (file: File): Promise<boolean> => {
    const validTypes = [
      "image/svg+xml",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve(
          validTypes.includes(file.type) &&
            img.width <= 1080 &&
            img.height <= 1080
        );
      };
    });
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const validPhotos = photos.filter((photo): photo is File => photo !== null);
    if (validPhotos.length > 0 && id && type) {
      onSubmit(validPhotos, id, type);
    } else {
      if (validPhotos.length === 0) {
        toast.error("Please upload at least one photo.");
      }
      if (!id) {
        toast.error("Invalid ID in URL.");
      }
      if (!type) {
        toast.error("Invalid type in URL.");
      }
    }
  };

  const capturePhoto = () => {
    if (webcamRef.current && webcamIndex !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const byteString = atob(imageSrc.split(",")[1]);
        const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], `photo-${webcamIndex + 1}.jpg`, {
          type: mimeString,
        });

        const newPreviewUrl = URL.createObjectURL(file);

        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos[webcamIndex] = file;
          return updatedPhotos;
        });

        setPhotoPreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews[webcamIndex] = newPreviewUrl;
          return updatedPreviews;
        });

        setIsWebcamOpen(false);
        setWebcamIndex(null);
      }
    }
  };

  const openWebcam = (index: number) => {
    if (hasWebcam) {
      setWebcamIndex(index);
      setIsWebcamOpen(true);
    } else {
      toast.error("No webcam found on your device.");
    }
  };

  const closeWebcam = () => {
    setIsWebcamOpen(false);
    setWebcamIndex(null);
  };

  const deletePhoto = (index: number) => {
    setPhotos((prevPhotos) => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos[index] = null;
      return updatedPhotos;
    });

    setPhotoPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews[index] = null;
      return updatedPreviews;
    });
  };

  const handleCancel = () => {
    navigate("/client-dashboard");
  };

  return (
    <form
      className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter"
      onSubmit={handleSave}
    >
      <div className="grid grid-cols-2 gap-[1.5vw]">
        {photos.map((_, index) => (
          <div key={index} className="border rounded-lg p-[1vw] relative">
            <div className="flex flex-row items-center justify-between">
              <p className="text-[1.2vw] font-semibold mb-[1vw] font-inter">
                Photo {index + 1}
              </p>
              <button
                type="button"
                className="flex flex-row items-center text-red-500 font-inter font-medium text-[1vw] focus:outline-none"
                onClick={() => deletePhoto(index)}
              >
                <RiDeleteBin6Line className="mr-[0.5vw]" /> Delete
              </button>
            </div>
            <div className="flex flex-col space-y-[0.5vw]">
              {photoPreviews[index] ? (
                <img
                  src={photoPreviews[index] || ""}
                  alt={`Preview of photo ${index + 1}`}
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <>
                  <button
                    type="button"
                    className="bg-purple-0 bg-opacity-20 py-[0.5vw] px-[1vw] rounded-lg flex items-center justify-center cursor-pointer border border-purple-0"
                    onClick={() => openWebcam(index)}
                  >
                    <span className="ml-[0.2vw] text-[1vw] font-medium text-purple-0 font-inter">
                      Click to Take asset photo
                    </span>
                  </button>
                  <label className="bg-white py-[0.5vw] px-[1vw] rounded-lg flex items-center justify-center cursor-pointer border border-purple-0">
                    <input
                      type="file"
                      accept=".svg,.png,.jpg,.jpeg,.gif"
                      className="hidden"
                      onChange={(event) => handleFileChange(event, index)}
                    />
                    <span className="ml-[0.2vw] text-[1vw] font-medium text-purple-0 font-inter">
                      Click to upload asset photo
                    </span>
                  </label>
                  <p className="text-lightgray-0 font-inter text-center text-[0.9vw]">
                    SVG, PNG, JPG, JPEG or GIF (max. 1080x1080px each)
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-[1vw] mt-[1.5vw]">
        <PurpleButton type="submit" text="Save" />
        <WhiteButton type="button" text="Close" onClick={handleCancel} />
      </div>

      {isWebcamOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
              videoConstraints={{
                width: 1080,
                height: 1080,
                facingMode: "user",
              }}
            />
            <div className="flex justify-end mt-4">
              <PurpleButton
                type="button"
                text="Capture"
                onClick={capturePhoto}
                className="mr-[1vw]"
              />
              <WhiteButton type="button" text="Cancel" onClick={closeWebcam} />
            </div>
          </div>
        </div>
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
    </form>
  );
};

export default AddPhotos;
