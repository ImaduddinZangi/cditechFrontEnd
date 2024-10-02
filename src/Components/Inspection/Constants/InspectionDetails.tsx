import React from "react";
import { useParams } from "react-router-dom";
import { useGetInspectionByIdQuery } from "../../../redux/api/inspectionApi";
import Loader from "../../Constants/Loader";
import PurpleButton from "../../Tags/PurpleButton";
import OutlinePurpleButton from "../../Tags/OutlinePurpleButton";
import { useNavigate } from "react-router-dom";

const InspectionDetails: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const {
    data: inspection,
    error,
    isLoading,
  } = useGetInspectionByIdQuery(inspectionId || "");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  }

  if (error) return <p>Error loading inspection details</p>;

  return (
    <div>
      {inspection && (
        <>
          <div className="grid grid-cols-3 gap-[1vw] p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Customer Name:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.customer?.name ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Asset:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.asset?.name ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Completed on:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.completedDate || "Pending"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Status:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.status}
              </p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Checklist:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.checklists?.[0]?.name ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                Inspection ID:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.id}
              </p>
            </div>
          </div>

          {/* Score Section */}
          {inspection.scores && inspection.scores.length > 0 && (
            <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Overall Score:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.overallScore ?? "N/A"}
                  </p>
                </div>
                <div className="flex space-x-[1vw]">
                  <PurpleButton
                    text="Send PDF"
                    onClick={() => navigate("/inspection-reports")}
                  />
                  <PurpleButton
                    text="Upload Photos"
                    onClick={() =>
                      navigate(`/add-photos/inspection/${inspectionId}`)
                    }
                  />
                  <OutlinePurpleButton text="Print" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-[1vw] mt-[1vw]">
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Structure:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.structureScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Panel:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.panelScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Pipes:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.pipesScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Breakers:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.breakersScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Alarm:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.alarmScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Alarm Light:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.alarmLightScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Wires:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.wiresScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Contactors:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.contactorsScore ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Thermals:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.thermalsScore ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pump Section */}
          {inspection.scores?.[0]?.pumpScores &&
            inspection.scores?.[0]?.pumpScores.length > 0 && (
              <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
                {inspection.scores[0].pumpScores.map((pump, index) => (
                  <div key={index} className="flex justify-between">
                    <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                      {index + 1}: {pump.pumpName ?? "N/A"}
                    </p>
                    <div className="flex flex-row items-center gap-[1vw]">
                      <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                        Runs:
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        {pump.runs ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-[1vw]">
                      <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                        Amps:
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        {pump.amps ?? "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-[1vw]">
                      <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                        Contactor:
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        {pump.contactors ?? "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          {/* Station Needs Cleaning */}
          {inspection.scores?.[0]?.cleaning !== undefined && (
            <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
              <div className="flex flex-row items-center gap-[1vw]">
                <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                  Station Needs Cleaning:
                </p>
                <p className="text-[1vw] text-gray-0 font-medium font-inter">
                  {inspection.scores?.[0]?.cleaning ? "Yes" : "No"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-[1vw]">
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Float 1:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.float1 ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Float 2:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.float2 ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Float 3:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.float3 ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Float 4:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.float4 ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Float 5:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.float5 ?? "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[1vw] text-darkgray-0 font-semibold font-inter">
                    Alarm Float:
                  </p>
                  <p className="text-[1vw] text-gray-0 font-medium font-inter">
                    {inspection.scores?.[0]?.floatScores?.alarmFloat ?? "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InspectionDetails;
