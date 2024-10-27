import React, { useState, useEffect } from "react";
import { UpdateChecklist, Answer } from "../../redux/features/inspectionChecklistSlice";
import { Inspection } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import InputField from "../Tags/InputField";
import SelectField, { Option } from "../Tags/SelectField";

const selectOptions = [
  { label: "OK", value: "OK" },
  { label: "Needs Attention", value: "Needs Attention" },
  { label: "NOT OK", value: "NOT OK" },
];

const overAllScoreOptions = [
  { label: "A+", value: "A+" },
  { label: "B+", value: "B+" },
  { label: "C+", value: "C+" },
  { label: "D-", value: "D-" },
  { label: "E-", value: "E-" },
  { label: "F-", value: "F-" },
];

interface AddInspectionChecklistProps {
  inspection: Inspection;
  onSubmit: (data: UpdateChecklist) => Promise<void>;
}

const AddInspectionChecklist: React.FC<AddInspectionChecklistProps> = ({
  inspection,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questionIds, setQuestionIds] = useState({
    structure: "",
    panel: "",
    breakers: "",
    pipes: "",
    alarm: "",
    alarmLight: "",
    overallScore: "",
    pump1Runs: "",
    pump1Amps: "",
    pump1Contactors: "",
    pump2Runs: "",
    pump2Amps: "",
    pump2Contactors: "",
    pump3Runs: "",
    pump3Amps: "",
    pump3Contactors: "",
    pump4Runs: "",
    pump4Amps: "",
    pump4Contactors: "",
    stationNeedsCleaning: "",
    float1: "",
    float2: "",
    float3: "",
    float4: "",
    float5: "",
    float6: "",
    alarmFloat: "",
  });

  // Answers state
  const [structure, setStructure] = useState<Option | null>({ label: "", value: "OK" });
  const [panel, setPanel] = useState<Option | null>({ label: "", value: "OK" });
  const [breakers, setBreakers] = useState<Option | null>({ label: "", value: "OK" });
  const [pipes, setPipes] = useState<Option | null>({ label: "", value: "OK" });
  const [alarm, setAlarm] = useState<Option | null>({ label: "", value: "OK" });
  const [alarmLight, setAlarmLight] = useState<Option | null>({ label: "", value: "OK" });
  const [overallScore, setOverallScore] = useState<Option | null>({ label: "", value: "A+" });

  const [pump1Runs, setPump1Runs] = useState(false);
  const [pump1Amps, setPump1Amps] = useState("10");
  const [pump1Contactors, setPump1Contactors] = useState("10");

  const [pump2Runs, setPump2Runs] = useState(false);
  const [pump2Amps, setPump2Amps] = useState("10");
  const [pump2Contactors, setPump2Contactors] = useState("10");

  const [pump3Runs, setPump3Runs] = useState(false);
  const [pump3Amps, setPump3Amps] = useState("10");
  const [pump3Contactors, setPump3Contactors] = useState("10");

  const [pump4Runs, setPump4Runs] = useState(false);
  const [pump4Amps, setPump4Amps] = useState("10");
  const [pump4Contactors, setPump4Contactors] = useState("10");

  const [stationNeedsCleaning, setStationNeedsCleaning] = useState(false);

  const [float1, setFloat1] = useState<Option | null>({ label: "", value: "OK" });
  const [float2, setFloat2] = useState<Option | null>({ label: "", value: "OK" });
  const [float3, setFloat3] = useState<Option | null>({ label: "", value: "OK" });
  const [float4, setFloat4] = useState<Option | null>({ label: "", value: "OK" });
  const [float5, setFloat5] = useState<Option | null>({ label: "", value: "OK" });
  const [float6, setFloat6] = useState<Option | null>({ label: "", value: "OK" });
  const [alarmFloat, setAlarmFloat] = useState<Option | null>({ label: "", value: "OK" });

  useEffect(() => {
    if (inspection.checklists.length > 0) {
      const template = inspection.checklists[0].template;

      if (template && template.questions) {
        const questionMap = {
          structure: template.questions.find(q => q.question_text === "structure")?.id || "",
          panel: template.questions.find(q => q.question_text === "panel")?.id || "",
          breakers: template.questions.find(q => q.question_text === "breakers")?.id || "",
          pipes: template.questions.find(q => q.question_text === "pipes")?.id || "",
          alarm: template.questions.find(q => q.question_text === "alarm")?.id || "",
          alarmLight: template.questions.find(q => q.question_text === "alarmLight")?.id || "",
          overallScore: template.questions.find(q => q.question_text === "overallScore")?.id || "",
          pump1Runs: template.questions.find(q => q.question_text === "pump1Runs")?.id || "",
          pump1Amps: template.questions.find(q => q.question_text === "pump1Amps")?.id || "",
          pump1Contactors: template.questions.find(q => q.question_text === "pump1Contactors")?.id || "",
          pump2Runs: template.questions.find(q => q.question_text === "pump2Runs")?.id || "",
          pump2Amps: template.questions.find(q => q.question_text === "pump2Amps")?.id || "",
          pump2Contactors: template.questions.find(q => q.question_text === "pump2Contactors")?.id || "",
          stationNeedsCleaning: template.questions.find(q => q.question_text === "stationNeedsCleaning")?.id || "",
          pump3Runs: template.questions.find(q => q.question_text === "pump2Runs")?.id || "",
          pump3Amps: template.questions.find(q => q.question_text === "pump2Amps")?.id || "",
          pump3Contactors: template.questions.find(q => q.question_text === "pump2Contactors")?.id || "",
          pump4Runs: template.questions.find(q => q.question_text === "pump2Runs")?.id || "",
          pump4Amps: template.questions.find(q => q.question_text === "pump2Amps")?.id || "",
          pump4Contactors: template.questions.find(q => q.question_text === "pump2Contactors")?.id || "",
          float1: template.questions.find(q => q.question_text === "float1")?.id || "",
          float2: template.questions.find(q => q.question_text === "float2")?.id || "",
          float3: template.questions.find(q => q.question_text === "float3")?.id || "",
          float4: template.questions.find(q => q.question_text === "float4")?.id || "",
          float5: template.questions.find(q => q.question_text === "float5")?.id || "",
          float6: template.questions.find(q => q.question_text === "float6")?.id || "",
          alarmFloat: template.questions.find(q => q.question_text === "alarmFloat")?.id || "",
        };

        setQuestionIds(questionMap);
      }
    }
  }, [inspection]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const answersArray: Answer[] = [
      { questionId: questionIds.structure, answer: structure?.value || "" },
      { questionId: questionIds.panel, answer: panel?.value || "" },
      { questionId: questionIds.breakers, answer: breakers?.value || "" },
      { questionId: questionIds.pipes, answer: pipes?.value || "" },
      { questionId: questionIds.alarm, answer: alarm?.value || "" },
      { questionId: questionIds.alarmLight, answer: alarmLight?.value || "" },
      { questionId: questionIds.overallScore, answer: overallScore?.value || "" },

      { questionId: questionIds.pump1Runs, answer: pump1Runs.toString() },
      { questionId: questionIds.pump1Amps, answer: pump1Amps },
      { questionId: questionIds.pump1Contactors, answer: pump1Contactors },

      { questionId: questionIds.pump2Runs, answer: pump2Runs.toString() },
      { questionId: questionIds.pump2Amps, answer: pump2Amps },
      { questionId: questionIds.pump2Contactors, answer: pump2Contactors },

      { questionId: questionIds.pump3Runs, answer: pump3Runs.toString() },
      { questionId: questionIds.pump3Amps, answer: pump3Amps },
      { questionId: questionIds.pump3Contactors, answer: pump3Contactors },

      { questionId: questionIds.pump4Runs, answer: pump4Runs.toString() },
      { questionId: questionIds.pump4Amps, answer: pump4Amps },
      { questionId: questionIds.pump4Contactors, answer: pump4Contactors },

      { questionId: questionIds.stationNeedsCleaning, answer: stationNeedsCleaning.toString() },

      { questionId: questionIds.float1, answer: float1?.value || "" },
      { questionId: questionIds.float2, answer: float2?.value || "" },
      { questionId: questionIds.float3, answer: float3?.value || "" },
      { questionId: questionIds.float4, answer: float4?.value || "" },
      { questionId: questionIds.float5, answer: float5?.value || "" },
      { questionId: questionIds.float6, answer: float6?.value || "" },
      { questionId: questionIds.alarmFloat, answer: alarmFloat?.value || "" },
    ];

    const updatedChecklists = inspection.checklists.map((checklist) => ({
      id: checklist.id,
      templateId: checklist.template?.id ?? "",
      answers: answersArray,
    }));

    const updatedInspection: UpdateChecklist = {
      id: inspection.id,
      checklists: updatedChecklists,
    };
    onSubmit(updatedInspection);
  };
  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-[1vw]">
        <div>
          <SelectField
            label="Structure"
            value={structure}
            onChange={(option) => setStructure(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Panel"
            value={panel}
            onChange={(option) => setPanel(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Breakers"
            value={breakers}
            onChange={(option) => setBreakers(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Pipes"
            value={pipes}
            onChange={(option) => setPipes(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Alarm"
            value={alarm}
            onChange={(option) => setAlarm(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Alarm Light"
            value={alarmLight}
            onChange={(option) => setAlarmLight(option)}
            options={selectOptions}
          />
        </div>
        <div>
          <SelectField
            label="Overall Score"
            value={overallScore}
            onChange={(option) => setOverallScore(option)}
            options={overAllScoreOptions}
          />
        </div>

        {/* Pumps */}
        {["pump1", "pump2", "pump3", "pump4"].map((pump, index) => (
          <div key={pump}>
            <label>{pump} Runs</label>
            <label>
              <input
                type="radio"
                name={`${pump}Runs`}
                value="true"
                checked={index === 0 ? pump1Runs : index === 1 ? pump2Runs : index === 2 ? pump3Runs : pump4Runs}
                onChange={() =>
                  index === 0
                    ? setPump1Runs(true)
                    : index === 1
                      ? setPump2Runs(true)
                      : index === 2
                        ? setPump3Runs(true)
                        : setPump4Runs(true)
                }
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={`${pump}Runs`}
                value="false"
                checked={
                  index === 0 ? !pump1Runs : index === 1 ? !pump2Runs : index === 2 ? !pump3Runs : !pump4Runs
                }
                onChange={() =>
                  index === 0
                    ? setPump1Runs(false)
                    : index === 1
                      ? setPump2Runs(false)
                      : index === 2
                        ? setPump3Runs(false)
                        : setPump4Runs(false)
                }
              />
              No
            </label>
            <div>
              <InputField
                label={`${pump} Amps`}
                fieldType="number"
                value={index === 0 ? pump1Amps : index === 1 ? pump2Amps : index === 2 ? pump3Amps : pump4Amps}
                onChange={(e) =>
                  index === 0
                    ? setPump1Amps(e.target.value)
                    : index === 1
                      ? setPump2Amps(e.target.value)
                      : index === 2
                        ? setPump3Amps(e.target.value)
                        : setPump4Amps(e.target.value)
                }
              />
            </div>
            <div>
              <InputField
                label={`${pump} Contactors`}
                fieldType="number"
                value={
                  index === 0
                    ? pump1Contactors
                    : index === 1
                      ? pump2Contactors
                      : index === 2
                        ? pump3Contactors
                        : pump4Contactors
                }
                onChange={(e) =>
                  index === 0
                    ? setPump1Contactors(e.target.value)
                    : index === 1
                      ? setPump2Contactors(e.target.value)
                      : index === 2
                        ? setPump3Contactors(e.target.value)
                        : setPump4Contactors(e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div>
          <label>Station Needs Cleaning</label>
          <label>
            <input
              type="radio"
              value="true"
              checked={stationNeedsCleaning === true}
              onChange={() => setStationNeedsCleaning(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="false"
              checked={stationNeedsCleaning === false}
              onChange={() => setStationNeedsCleaning(false)}
            />
            No
          </label>
        </div>

        {/* Floats */}
        {["float1", "float2", "float3", "float4", "float5", "float6", "alarmFloat"].map((float, index) => (
          <div key={float}>
            <SelectField
              label="float"
              value={
                index === 0
                  ? float1
                  : index === 1
                    ? float2
                    : index === 2
                      ? float3
                      : index === 3
                        ? float4
                        : index === 4
                          ? float5
                          : index === 5
                            ? float6
                            : alarmFloat
              }
              onChange={(option) =>
                index === 0
                  ? setFloat1(option)
                  : index === 1
                    ? setFloat2(option)
                    : index === 2
                      ? setFloat3(option)
                      : index === 3
                        ? setFloat4(option)
                        : index === 4
                          ? setFloat5(option)
                          : index === 5
                            ? setFloat6(option)
                            : setAlarmFloat(option)
              }
              options={selectOptions}
            />
          </div>
        ))}

        <PurpleButton
          text={isSubmitting ? "Submitting..." : "Submit"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default AddInspectionChecklist;
