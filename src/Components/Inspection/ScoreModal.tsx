import React, { useState, useEffect } from "react";
import { Scores } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";

interface ScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scores: Scores) => void;
  initialScores?: Scores;
}

const ScoreModal: React.FC<ScoreModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialScores,
}) => {
  const [scores, setScores] = useState<Scores>({
    structureScore: "A",
    panelScore: "A",
    pipesScore: "A",
    alarmScore: "A",
    alarmLightScore: "A",
    wiresScore: "A",
    breakersScore: "A",
    contactorsScore: "A",
    thermalsScore: "A",
    floatScores: {
      float1: "A",
      float2: "A",
    },
  });

  useEffect(() => {
    if (initialScores) {
      const { id, createdAt, updatedAt, ...filteredScores } = initialScores;
      setScores(filteredScores as Scores);
    }
  }, [initialScores]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    isFloatScore = false
  ) => {
    const { name, value } = e.target;

    setScores((prevScores) => {
      if (isFloatScore) {
        return {
          ...prevScores,
          floatScores: {
            ...prevScores.floatScores,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevScores,
          [name]: value,
        };
      }
    });
  };

  const handleSave = () => {
    onSave(scores);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-[75vw] p-6">
        <h2 className="text-[2.5vw] md:text-[1.5vw] font-medium text-darkgray-0 mb-4">
          Enter Inspection Scores
        </h2>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-[2vw] md:gap-[1vw]"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {Object.entries(scores).map(([key, value]) =>
            typeof value === "object" ? (
              Object.entries(value).map(([subKey, subValue]) => (
                <div key={subKey}>
                  <label
                    htmlFor={subKey}
                    className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
                  >
                    {subKey}:
                  </label>
                  <select
                    id={subKey}
                    name={subKey}
                    value={subValue as string}
                    onChange={(e) => handleChange(e, true)}
                    className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
              ))
            ) : (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-[2.5vw] md:text-[1vw] font-medium text-darkgray-0"
                >
                  {key}:
                </label>
                <select
                  id={key}
                  name={key}
                  value={value as string}
                  onChange={handleChange}
                  className="w-full px-[1.5vw] md:px-[0.75vw] py-[1.5vw] md:py-[0.5vw] mt-[1vw] md:mt-[0.5vw] border border-lightgray-0 rounded-[1vw] md:rounded-[0.5vw] focus:outline-none placeholder:text-[2.5vw] md:placeholder:text-[1vw] text-[2.5vw] md:text-[1vw]"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            )
          )}
          <div className="mt-[1vw] flex justify-end space-x-[1vw] col-span-1 md:col-span-3">
            <PurpleButton type="submit" text="Save" />
            <WhiteButton type="button" text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreModal;
