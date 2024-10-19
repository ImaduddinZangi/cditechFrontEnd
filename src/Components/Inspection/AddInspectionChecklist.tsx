import React, { useState, useEffect } from "react";
import PurpleButton from "../Tags/PurpleButton";
import WhiteButton from "../Tags/WhiteButton";
import { useNavigate } from "react-router-dom";
import SubmitInvoiceModal from "./Constants/SubmitInvoiceModal";
import Loader from "../Constants/Loader";
import InputField from "../Tags/InputField";
import SelectField from "../Tags/SelectField";
import { toast } from "react-toastify";
import {
  Answer,
  EditChecklist,
  Questions,
  UpdateChecklist,
} from "../../redux/features/inspectionChecklistSlice";
import { Inspection } from "../../redux/features/inspectionSlice";

interface AddInspectionChecklistProps {
  inspection?: Inspection;
  onSubmit: (data: UpdateChecklist) => Promise<void>;
}

const AddInspectionChecklist: React.FC<AddInspectionChecklistProps> = ({
  inspection,
  onSubmit,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<Questions[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      inspection &&
      inspection.checklists &&
      inspection.checklists.length > 0
    ) {
      const questionsSet = new Set<string>();
      const collectedQuestions: Questions[] = [];

      inspection.checklists.forEach((checklist) => {
        const templateQuestions = checklist.template?.questions || [];
        templateQuestions.forEach((question) => {
          if (!questionsSet.has(question.id)) {
            questionsSet.add(question.id);
            collectedQuestions.push({
              questionId: question.id,
              questionText: question.question_text,
              questionType: question.question_type,
              options: question.options ? JSON.parse(question.options) : null,
            });
          }
        });
      });

      setQuestions(collectedQuestions);
    } else {
      console.error("Inspection data is incomplete.");
    }
  }, [inspection]);

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event?: React.FormEvent, openModal?: boolean) => {
    if (event) {
      event.preventDefault();
    }

    const updatedChecklists: EditChecklist[] =
      inspection?.checklists.map((checklist) => {
        const templateQuestions = checklist.template?.questions || [];
        const answersForChecklist: Answer[] = templateQuestions
          .filter((question) => answers.hasOwnProperty(question.id))
          .map((question) => ({
            questionId: question.id,
            answer: answers[question.id],
          }));

        return {
          id: checklist.id,
          templateId: checklist.template?.id || "",
          answers: answersForChecklist,
        };
      }) || [];

    const updatedInspection: UpdateChecklist = {
      id: inspection?.id,
      checklists: updatedChecklists,
    };

    try {
      await onSubmit(updatedInspection);
      if (openModal) {
        setModalOpen(true);
      } else {
        toast.success("Inspection Updated successfully!", {
          onClose: () => navigate("/manage-inspections"),
          autoClose: 1000,
        });
      }
    } catch (err) {
      console.error("Failed to update checklists.", err);
    }
  };

  const renderInputField = (question: Questions) => {
    const { questionId, questionText } = question;

    switch (questionText) {
      case "pump1Runs":
      case "pump2Runs":
      case "pump3Runs":
      case "pump4Runs":
      case "pump5Runs":
      case "pump6Runs":
      case "stationNeedsCleaning":
        return (
          <div key={questionId} className="flex items-center space-x-2">
            <label>{questionText}</label>
            <label>
              <input
                type="radio"
                name={questionId}
                checked={answers[questionId] === "true"}
                onChange={() => handleInputChange(questionId, "true")}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name={questionId}
                checked={answers[questionId] === "false"}
                onChange={() => handleInputChange(questionId, "false")}
              />
              No
            </label>
          </div>
        );

      case "pump1Amps":
      case "pump2Amps":
      case "pump3Amps":
      case "pump4Amps":
      case "pump5Amps":
      case "pump6Amps":
      case "pump1Contactors":
      case "pump2Contactors":
      case "pump3Contactors":
      case "pump4Contactors":
      case "pump5Contactors":
      case "pump6Contactors":
        return (
          <InputField
            key={questionId}
            label={questionText}
            value={answers[questionId] || ""}
            fieldType="number"
            onChange={(e) => handleInputChange(questionId, e.target.value)}
          />
        );

      case "structure":
      case "panel":
      case "pipes":
      case "alarm":
      case "alarmLight":
      case "wires":
      case "breakers":
      case "thermals":
      case "float1":
      case "float2":
      case "float3":
      case "float4":
      case "float5":
      case "float6":
      case "alarmFloat":
        const selectOptions = [
          { label: "OK", value: "OK" },
          { label: "Needs Attention", value: "Needs Attention" },
          { label: "Not OK", value: "Not OK" },
        ];
        return (
          <SelectField
            key={questionId}
            label={questionText}
            value={
              selectOptions.find((opt) => opt.value === answers[questionId]) ||
              null
            }
            onChange={(option) =>
              handleInputChange(questionId, option?.value || "")
            }
            options={selectOptions}
          />
        );
      case "overallScore":
        const overallScoreOptions = [
          { label: "A+", value: "A+" },
          { label: "B+", value: "B+" },
          { label: "C+", value: "C+" },
          { label: "D-", value: "D-" },
          { label: "E-", value: "E-" },
          { label: "F-", value: "F-" },
        ];
        return (
          <SelectField
            key={questionId}
            label={questionText}
            value={
              overallScoreOptions.find(
                (opt) => opt.value === answers[questionId]
              ) || null
            }
            onChange={(option) =>
              handleInputChange(questionId, option?.value || "")
            }
            options={overallScoreOptions}
          />
        );

      default:
        return null;
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleConfirm = (option: string) => {
    setModalOpen(false);
    console.log("Selected option:", option);
  };

  if (!inspection) {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-[1.5vw] m-[2vw] bg-white shadow-lg rounded-lg font-inter">
      <form
        className="space-y-4"
        onSubmit={(event) => handleSubmit(event, false)}
      >
        <div className="grid grid-cols-3 gap-4">
          {questions.map((question) => (
            <div key={question.questionId}>{renderInputField(question)}</div>
          ))}
        </div>
        <div className="flex justify-end gap-x-[1vw] m-[2vw] pb-[3vw]">
          <PurpleButton
            text="Save And Submit"
            onClick={() => handleSubmit(undefined, true)}
          />
          <PurpleButton type="submit" text="Save And Close" />
          <WhiteButton
            text="Don't Save And Close"
            onClick={() => navigate("/manage-inspections")}
          />
        </div>
      </form>
      <SubmitInvoiceModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleModalClose}
      />
    </div>
  );
};

export default AddInspectionChecklist;
