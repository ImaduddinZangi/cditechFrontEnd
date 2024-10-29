import React, { useState, useEffect, FormEvent } from "react";
import { UpdateChecklist, Answer } from "../../redux/features/inspectionChecklistSlice";
import { Inspection } from "../../redux/features/inspectionSlice";
import PurpleButton from "../Tags/PurpleButton";
import InputField from "../Tags/InputField";
import SelectField, { Option } from "../Tags/SelectField";
import { useNavigate } from "react-router-dom";
import OutlinePurpleButton from "../Tags/OutlinePurpleButton";
import SubmitInvoiceModal from "./Constants/SubmitInvoiceModal";
import { toast } from "react-toastify";

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inspectionId, setInspectionId] = useState<string>("");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [questionIds, setQuestionIds] = useState({
    structure: "",
    panel: "",
    breakers: "",
    pipes: "",
    wires: "",
    contactors: "",
    alarm: "",
    alarmLight: "",
    thermals: "",
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
  const [wires, setWires] = useState<Option | null>({ label: "", value: "OK" });
  const [contactors, setContactors] = useState<Option | null>({ label: "", value: "OK" });
  const [alarm, setAlarm] = useState<Option | null>({ label: "", value: "OK" });
  const [alarmLight, setAlarmLight] = useState<Option | null>({ label: "", value: "OK" });
  const [thermals, setThermals] = useState<Option | null>({ label: "", value: "OK" });
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
          wires: template.questions.find(q => q.question_text === "wires")?.id || "",
          contactors: template.questions.find(q => q.question_text === "contactors")?.id || "",
          alarm: template.questions.find(q => q.question_text === "alarm")?.id || "",
          alarmLight: template.questions.find(q => q.question_text === "alarmLight")?.id || "",
          thermals: template.questions.find(q => q.question_text === "thermals")?.id || "",
          overallScore: template.questions.find(q => q.question_text === "overallScore")?.id || "",
          pump1Runs: template.questions.find(q => q.question_text === "pump1Runs")?.id || "",
          pump1Amps: template.questions.find(q => q.question_text === "pump1Amps")?.id || "",
          pump1Contactors: template.questions.find(q => q.question_text === "pump1Contactors")?.id || "",
          pump2Runs: template.questions.find(q => q.question_text === "pump2Runs")?.id || "",
          pump2Amps: template.questions.find(q => q.question_text === "pump2Amps")?.id || "",
          pump2Contactors: template.questions.find(q => q.question_text === "pump2Contactors")?.id || "",
          stationNeedsCleaning: template.questions.find(q => q.question_text === "stationNeedsCleaning")?.id || "",
          pump3Runs: template.questions.find(q => q.question_text === "pump3Runs")?.id || "",
          pump3Amps: template.questions.find(q => q.question_text === "pump3Amps")?.id || "",
          pump3Contactors: template.questions.find(q => q.question_text === "pump3Contactors")?.id || "",
          pump4Runs: template.questions.find(q => q.question_text === "pump4Runs")?.id || "",
          pump4Amps: template.questions.find(q => q.question_text === "pump4Amps")?.id || "",
          pump4Contactors: template.questions.find(q => q.question_text === "pump4Contactors")?.id || "",
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

  const handleSubmit = async (event: React.FormEvent, openModal: boolean) => {
    event.preventDefault();
    setIsSubmitting(true);

    const answersArray: Answer[] = [
      { questionId: questionIds.structure, answer: structure?.value || "" },
      { questionId: questionIds.panel, answer: panel?.value || "" },
      { questionId: questionIds.breakers, answer: breakers?.value || "" },
      { questionId: questionIds.pipes, answer: pipes?.value || "" },
      { questionId: questionIds.wires, answer: wires?.value || "" },
      { questionId: questionIds.contactors, answer: contactors?.value || "" },
      { questionId: questionIds.alarm, answer: alarm?.value || "" },
      { questionId: questionIds.alarmLight, answer: alarmLight?.value || "" },
      { questionId: questionIds.thermals, answer: thermals?.value || "" },
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

    if (openModal) {
      toast.success("Inspection Updated Successfully!", {
        onClose: () => { setModalOpen(true), setInspectionId(inspection.id) }
      })
    } else {
      toast.success("Inspeciton Checklist Updated Successfully!", {
        onClose: () => navigate("/manage-inspections"),
        autoClose: 1000,
      });
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <form>
      <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
        <div className="grid grid-cols-3 gap-[1vw]">
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
              label="Wires"
              value={wires}
              onChange={(option) => setWires(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Contactors"
              value={contactors}
              onChange={(option) => setContactors(option)}
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
              label="Thermals"
              value={thermals}
              onChange={(option) => setThermals(option)}
              options={selectOptions}
            />
          </div>
        </div>
        <div className="mt-[2vw] w-full flex flex-row items-center justify-end gap-[1vw]">
          <PurpleButton
            text="Save & close"
            type="submit"
            onEvent={(event: FormEvent)=> handleSubmit(event, false)}
            disabled={isSubmitting}
          />
          <PurpleButton
            text="Don't Save & close"
            onClick={() => navigate('/manage-inspections')}
            disabled={isSubmitting}
          />
          <OutlinePurpleButton
            text="Save & Submit"
            onEvent={(event: FormEvent) => handleSubmit(event, true)}
          />
        </div>
      </div>
      <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
        <div className="grid grid-cols-4">
          <SelectField
            label="Overall Score"
            value={overallScore}
            onChange={(option) => setOverallScore(option)}
            options={overAllScoreOptions}
          />
        </div>
        <div className="space-y-[1vw] mt-[1vw]">
          <div className="flex flex-row items-center justify-between gap-[1vw]">
            <div className="w-full">
              <p className="text-[1vw] text-darkgray-0 font-medium">
                Pump #1:
              </p>
            </div>
            <div className="w-full flex items-center space-x-[1vw]">
              <p className="text-[1vw] text-darkgray-0 font-medium">Runs:</p>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump1Runs"
                  checked={pump1Runs}
                  onChange={() => setPump1Runs(true)}
                  className="accent-purple-0"
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
              </label>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump1Runs"
                  className="accent-purple-0"
                  checked={!pump1Runs}
                  onChange={() => setPump1Runs(false)}
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
              </label>
            </div>
            <div className="w-full">
              <InputField
                label="Amps:"
                fieldType="number"
                value={pump1Amps}
                onChange={(e) => setPump1Amps(e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Contactors:"
                fieldType="number"
                value={pump1Contactors}
                onChange={(e) => setPump1Contactors(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-[1vw]">
            <div className="w-full">
              <p className="text-[1vw] text-darkgray-0 font-medium">
                Pump #2:
              </p>
            </div>
            <div className="w-full flex items-center space-x-[1vw]">
              <p className="text-[1vw] text-darkgray-0 font-medium">Runs:</p>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump2Runs"
                  checked={pump2Runs}
                  onChange={() => setPump2Runs(true)}
                  className="accent-purple-0"
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
              </label>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump2Runs"
                  className="accent-purple-0"
                  checked={!pump2Runs}
                  onChange={() => setPump2Runs(false)}
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
              </label>
            </div>
            <div className="w-full">
              <InputField
                label="Amps:"
                fieldType="number"
                value={pump2Amps}
                onChange={(e) => setPump2Amps(e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Contactors:"
                fieldType="number"
                value={pump2Contactors}
                onChange={(e) => setPump2Contactors(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-[1vw]">
            <div className="w-full">
              <p className="text-[1vw] text-darkgray-0 font-medium">
                Pump #3:
              </p>
            </div>
            <div className="w-full flex items-center space-x-[1vw]">
              <p className="text-[1vw] text-darkgray-0 font-medium">Runs:</p>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump3Runs"
                  checked={pump3Runs}
                  onChange={() => setPump3Runs(true)}
                  className="accent-purple-0"
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
              </label>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump3Runs"
                  className="accent-purple-0"
                  checked={!pump3Runs}
                  onChange={() => setPump3Runs(false)}
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
              </label>
            </div>
            <div className="w-full">
              <InputField
                label="Amps:"
                fieldType="number"
                value={pump3Amps}
                onChange={(e) => setPump3Amps(e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Contactors:"
                fieldType="number"
                value={pump3Contactors}
                onChange={(e) => setPump3Contactors(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-[1vw]">
            <div className="w-full">
              <p className="text-[1vw] text-darkgray-0 font-medium">
                Pump #4:
              </p>
            </div>
            <div className="w-full flex items-center space-x-[1vw]">
              <p className="text-[1vw] text-darkgray-0 font-medium">Runs:</p>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump4Runs"
                  checked={pump4Runs}
                  onChange={() => setPump4Runs(true)}
                  className="accent-purple-0"
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
              </label>
              <label className="flex items-center space-x-[0.2vw]">
                <input
                  type="radio"
                  name="pump4Runs"
                  className="accent-purple-0"
                  checked={!pump4Runs}
                  onChange={() => setPump4Runs(false)}
                />
                <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
              </label>
            </div>
            <div className="w-full">
              <InputField
                label="Amps:"
                fieldType="number"
                value={pump4Amps}
                onChange={(e) => setPump4Amps(e.target.value)}
              />
            </div>
            <div className="w-full">
              <InputField
                label="Contactors:"
                fieldType="number"
                value={pump4Contactors}
                onChange={(e) => setPump4Contactors(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
        <div>

          <div className="w-full flex items-center space-x-[1vw]">
            <p className="text-[1vw] text-darkgray-0 font-medium">Sation Needs Cleaning:</p>
            <label className="flex items-center space-x-[0.2vw]">
              <input
                type="radio"
                name="stationNeedsCleaningtrue"
                checked={stationNeedsCleaning}
                onChange={() => setStationNeedsCleaning(true)}
                className="accent-purple-0"
              />
              <p className="text-[1vw] text-darkgray-0 font-medium">Yes</p>
            </label>
            <label className="flex items-center space-x-[0.2vw]">
              <input
                type="radio"
                name="stationsNeedsCleaningfalse"
                className="accent-purple-0"
                checked={!stationNeedsCleaning}
                onChange={() => setStationNeedsCleaning(false)}
              />
              <p className="text-[1vw] text-darkgray-0 font-medium">No</p>
            </label>
          </div>
        </div>
        <div className="mt-[1vw] w-full grid grid-cols-3 gap-[1vw]">
          <div>
            <SelectField
              label="Float 1"
              value={float1}
              onChange={(option) => setFloat1(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Float 2"
              value={float2}
              onChange={(option) => setFloat2(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Float 3"
              value={float3}
              onChange={(option) => setFloat3(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Float 4"
              value={float4}
              onChange={(option) => setFloat4(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Float 5"
              value={float5}
              onChange={(option) => setFloat5(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Float 6"
              value={float6}
              onChange={(option) => setFloat6(option)}
              options={selectOptions}
            />
          </div>
          <div>
            <SelectField
              label="Alarm Float"
              value={alarmFloat}
              onChange={(option) => setAlarmFloat(option)}
              options={selectOptions}
            />
          </div>
        </div>
      </div>
      <SubmitInvoiceModal
        isOpen={isModalOpen}
        onCancel={handleModalClose}
        inspectionId={inspectionId}
      />
    </form>
  );
};

export default AddInspectionChecklist;
