import React, { useMemo, useState } from "react";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";
import InputField from "../Tags/InputField";
import SelectField, { Option } from "../Tags/SelectField";
import { toast } from "react-toastify";
import { UpdateChecklist, EditChecklist, Answer, Checklist } from "../../redux/features/inspectionChecklistSlice";
import SubmitInvoiceModal from "./Constants/SubmitInvoiceModal";
import { Inspection } from "../../redux/features/inspectionSlice";

interface AddInspectionChecklistProps {
  inspection?: Inspection;
  onSubmit: (data: UpdateChecklist) => Promise<void>;
}

const AddInspectionChecklist: React.FC<AddInspectionChecklistProps> = ({ onSubmit, inspection }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isModalOpen, setModalOpen] = useState(false);

  const fields = useMemo(() => [
    { label: "Structure", question_text: "structure", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Panel", question_text: "panel", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Breakers", question_text: "breakers", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Pipes", question_text: "pipes", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Alarm", question_text: "alarm", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Alarm Light", question_text: "alarmLight", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Overall Score", question_text: "overallScore", fieldType: "select", options: ["A+", "B+", "C+", "D-", "E-", "F-"] },
    { label: "Runs", question_text: "pump1Runs", fieldType: "boolean" },
    { label: "Amps", question_text: "pump1Amps", fieldType: "input" },
    { label: "Contactors", question_text: "pump1Contactors", fieldType: "input" },
    { label: "Runs", question_text: "pump2Runs", fieldType: "boolean" },
    { label: "Amps", question_text: "pump2Amps", fieldType: "input" },
    { label: "Contactors", question_text: "pump2Contactors", fieldType: "input" },
    { label: "Runs", question_text: "pump3Runs", fieldType: "boolean" },
    { label: "Amps", question_text: "pump3Amps", fieldType: "input" },
    { label: "Contactors", question_text: "pump3Contactors", fieldType: "input" },
    { label: "Runs", question_text: "pump4Runs", fieldType: "boolean" },
    { label: "Amps", question_text: "pump4Amps", fieldType: "input" },
    { label: "Contactors", question_text: "pump4Contactors", fieldType: "input" },
    { label: "Station Needs Cleaning", question_text: "stationNeedsCleaning", fieldType: "boolean" },
    { label: "Float 1", question_text: "float1", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Float 2", question_text: "float2", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Float 3", question_text: "float3", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Float 4", question_text: "float4", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Float 5", question_text: "float5", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Float 6", question_text: "float6", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
    { label: "Alarm Float", question_text: "alarmFloat", fieldType: "select", options: ["OK", "Needs Attention", "Not OK"] },
  ], []);

  const getOptionFromValue = (value: string, options: string[]): Option | null => {
    const option = options.find((opt) => opt === value);
    return option ? { label: option, value: option } : null;
  };

  const handleInputChange = (question_text: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [question_text]: value,
    }));
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
  
    setIsSubmitting(true);
  
    const updatedChecklists: EditChecklist[] = (inspection?.checklists || []).map((checklist: Checklist) => {
      const templateQuestions = checklist.template?.questions || [];
      const answersForChecklist: Answer[] = templateQuestions
        .filter((question) => answers[question.question_text])
        .map((question) => ({
          questionId: question.id,
          answer: answers[question.question_text],
        }));
  
      return {
        id: checklist.id,
        templateId: checklist.template?.id || "",
        answers: answersForChecklist,
      };
    });
  
    const updatedInspection: UpdateChecklist = {
      id: inspection?.id,
      checklists: updatedChecklists,
    };
  
    try {
      await onSubmit(updatedInspection);
      toast.success("Inspection Updated successfully!", {
        onClose: () => navigate("/manage-inspections"),
        autoClose: 1000,
      });
    } catch (err) {
      toast.error("Failed to update checklists.");
      console.error("Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          {fields.map((field) => {
            const question = inspection?.checklists[0]?.template?.questions.find(q => q.question_text === field.question_text);
            if (!question) return null;

            switch (field.fieldType) {
              case "select":
                return (
                  <SelectField
                    key={field.question_text}
                    label={field.label}
                    value={getOptionFromValue(answers[field.question_text], field.options || []) || null} // Use empty array if options is undefined
                    onChange={(option) => handleInputChange(field.question_text, option?.value || "")}
                    options={field.options?.map((option) => ({ label: option, value: option })) || []} // Default to empty array
                  />
                );
              case "input":
                return (
                  <InputField
                    key={field.question_text}
                    label={field.label}
                    value={answers[field.question_text] || ""}
                    fieldType="number"
                    onChange={(e) => handleInputChange(field.question_text, e.target.value)}
                  />
                );
              case "boolean":
                return (
                  <div key={field.question_text} className="flex items-center space-x-2">
                    <label>{field.label}</label>
                    <label>
                      <input
                        type="radio"
                        name={field.question_text}
                        checked={answers[field.question_text] === "true"}
                        onChange={() => handleInputChange(field.question_text, "true")}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={field.question_text}
                        checked={answers[field.question_text] === "false"}
                        onChange={() => handleInputChange(field.question_text, "false")}
                      />
                      No
                    </label>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
        <div className="flex justify-end gap-x-[1vw] m-[2vw] pb-[3vw]">
          <PurpleButton
            text={isSubmitting ? "Compiling..." : "Save and Submit"}
            disabled={isSubmitting}
            onClick={handleSubmit}
          />
          <WhiteButton text="Don't Save and Close" onClick={() => navigate("/manage-inspections")} />
        </div>
      </form>
      <SubmitInvoiceModal isOpen={isModalOpen} onCancel={() => setModalOpen(false)} inspectionId={inspection?.id} />
    </div>
  );
};

export default AddInspectionChecklist;
