import React from "react";
import { useParams } from "react-router-dom";
import { useGetInspectionByIdQuery } from "../../../redux/api/inspectionApi";
import Loader from "../../Constants/Loader";
import PurpleButton from "../../Tags/PurpleButton";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import { useGetInspectionChecklistByIdQuery } from "../../../redux/api/inspectionChecklistApi";

const InspectionDetails: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const {
    data: inspection,
    error,
    isLoading,
  } = useGetInspectionByIdQuery(inspectionId || "");

  const checklistId = inspection?.checklists?.[0]?.id;
  const { data: checklist } = useGetInspectionChecklistByIdQuery(checklistId || "");

  const getAnswerByText = (questionText: string): string => {
    const question = checklist?.questions.find(q => q.questionText === questionText);
    return question?.answer || "N/A";
  };

  if (isLoading) {
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error loading inspection details</p>;
  }

  return (
    <div>
      {inspection && (
        <>
          <div className="grid grid-cols-3 gap-[1vw] p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Customer Name:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{inspection.customer?.name ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Asset:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{inspection.asset?.name ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Completed on:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{inspection.completedDate || "Pending"}</p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Status:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{inspection.status}</p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Checklist:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{checklistId ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Inspection ID:</p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">{inspection.id}</p>
            </div>
          </div>

          {/* Score Section */}
          {checklist && (
            <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Overall Score:</p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">{getAnswerByText("overallScore")}</p>
                </div>
                <div className="flex space-x-[1vw]">
                  <PurpleButton
                    text="Download PDF"
                    onClick={() => {
                      window.open(
                        `https://inspection-point-s3.s3.us-east-2.amazonaws.com/${inspection.pdfFilePath}`,
                        "_blank"
                      );
                    }}
                  />
                  <OutlinePurpleButton text="Print" />
                </div>
              </div>

              {/* Individual Questions Section */}
              <div className="grid grid-cols-4 gap-[1vw] mt-[1vw]">
                {["structure", "panel", "pipes", "breakers", "alarm", "alarmLight", "wires", "contactors", "thermals"].map((field, index) => (
                  <div key={index}>
                    <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{field.charAt(0).toUpperCase() + field.slice(1)}:</p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">{getAnswerByText(field)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pump Section */}
          {checklist && (
            <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mb-[1vw]">Pumps:</p>
              <div className="grid grid-cols-4 gap-[1vw]">
                {["pump1", "pump2", "pump3", "pump4"].map((pump, index) => (
                  <div key={index}>
                    <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                      {pump.charAt(0).toUpperCase() + pump.slice(1)}:
                    </p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">Runs: {getAnswerByText(`${pump}Runs`)}</p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">Amps: {getAnswerByText(`${pump}Amps`)}</p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">Contactors: {getAnswerByText(`${pump}Contactors`)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Station Needs Cleaning */}
          {checklist !== undefined && (
            <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
              <div className="flex space-x-[1vw]">
                <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">Station Needs Cleaning:</p>
                <p className="text-[1vw] text-gray-0 font-medium font-inter">{getAnswerByText("stationNeedsCleaning") === "Yes" ? "Yes" : "No"}</p>
              </div>

              {/* Float Scores */}
              <div className="grid grid-cols-3 gap-[1vw] mt-[1vw]">
                {["float1", "float2", "float3", "float4", "float5", "alarmFloat"].map((floatField, index) => (
                  <div key={index}>
                    <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">{`Float ${index + 1}:`}</p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">{getAnswerByText(floatField)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InspectionDetails;
