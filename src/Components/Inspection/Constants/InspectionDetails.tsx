import React from "react";
import { useGetInspectionByIdQuery } from "../../../redux/api/inspectionApi";
import { useParams } from "react-router-dom";
import Loader from "../../Constants/Loader";
import { Checklist } from "../../../redux/features/inspectionSlice";

const InspectionDetails: React.FC = () => {
  const { inspectionId } = useParams<{ inspectionId: string }>();
  const {
    data: inspection,
    error,
    isLoading,
  } = useGetInspectionByIdQuery(inspectionId || "");

  if (isLoading)
    return (
      <div className="w-full h-[80vh]">
        <Loader />
      </div>
    );
  if (error) return <p>Error loading inspection details</p>;

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg">
      {inspection && (
        <div className="flex flex-col items-start space-y-[2vw]">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Inspection Name:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.name}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Status:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.status}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Scheduled Date:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {new Date(inspection.scheduledDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Completed Date:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.completedDate
                  ? new Date(inspection.completedDate).toLocaleDateString()
                  : "Not completed"}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Service Fee:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                ${inspection.serviceFee}
              </p>
            </div>
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Comments:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.comments}
              </p>
            </div>
          </div>
          {/* Display Client, Asset, Customer Info */}
          {inspection.client && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Client:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.client.name}
              </p>
            </div>
          )}
          {inspection.customer && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Customer:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.customer.name}
              </p>
            </div>
          )}
          {inspection.asset && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Asset:
              </p>
              <p className="text-[1vw] text-gray-0 font-medium font-inter">
                {inspection.asset.name}
              </p>
            </div>
          )}
          {/* Display Route Information */}
          {inspection.route && inspection.route.length > 0 && (
            <div>
              <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                Route Points:
              </p>
              <div className="ml-[1.5vw] mt-[1vw] grid grid-cols-1 gap-[0.5vw]">
                {inspection.route.map((point, index) => (
                  <div key={index} className="flex flex-row items-center">
                    <p className="text-[1vw] text-gray-0 font-medium font-inter mr-[1vw]">
                      Point {index + 1}:
                    </p>
                    <p className="text-[1vw] text-gray-0 font-medium font-inter">
                      Latitude {point.latitude}, Longitude {point.longitude}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Display Checklists */}
          <div>
            {inspection.checklists && inspection.checklists.length > 0 && (
              <div className="col-span-4">
                <p className="text-[1.1vw] text-darkgray-0 font-semibold font-inter">
                  Checklists:
                </p>
                <ul className="ml-[1vw]">
                  {inspection.checklists.map((checklist: Checklist) => (
                    <li key={checklist.id} className="mb-[1vw]">
                      <div>
                        <div className="flex flex-row items-center">
                          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mr-[1vw]">
                            Name:
                          </p>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            {checklist.name}
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <p className="text-[1vw] text-darkgray-0 font-semibold font-inter mr-[1vw]">
                            Overall Score:
                          </p>
                          <p className="text-[1vw] text-gray-0 font-medium font-inter">
                            {checklist.overallScore}
                          </p>
                        </div>
                        {checklist.items && checklist.items.length > 0 && (
                          <ul className="ml-[1.5vw] list-disc">
                            {checklist.items.map((item) => (
                              <li key={item.id}>
                                <p className="text-[1vw] text-gray-0 font-medium font-inter">
                                  {item.description} - Completed:{" "}
                                  {item.is_completed ? "Yes" : "No"}
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Display Scores */}
            {inspection.scores && inspection.scores.length > 0 && (
              <div className="col-span-4">
                <p className="text-[1vw] text-darkgray-0 font-semibold font-inter ml-[1vw]">
                  Scores:
                </p>
                <div className="grid grid-cols-2 gap-[1vw] ml-[1.5vw]">
                  {inspection.scores.map((score, index) => (
                    <div key={index}>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Structure Score: {score.structureScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Panel Score: {score.panelScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Pipes Score: {score.pipesScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Alarm Score: {score.alarmScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Alarm Light Score: {score.alarmLightScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Wires Score: {score.wiresScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Breakers Score: {score.breakersScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Contactors Score: {score.contactorsScore}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Thermals Score: {score.thermalsScore}
                      </p>
                      {/* Float Scores */}
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Float Score 1: {score.floatScores.float1}
                      </p>
                      <p className="text-[1vw] text-gray-0 font-medium font-inter">
                        Float Score 2: {score.floatScores.float2}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionDetails;
