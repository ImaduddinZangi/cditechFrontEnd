import { useState, useCallback } from "react";
import {
  Answer,
  EditChecklist,
} from "../redux/features/inspectionChecklistSlice";
import { useGetInspectionByIdQuery } from "../redux/api/inspectionApi";
import { ChecklistQuestion } from "../redux/features/checklistTemplateSlice";

const useUpdateInspectionChecklist = (inspectionId: string) => {
  const [updatedChecklist, setUpdatedChecklist] = useState<EditChecklist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: inspectionData, isLoading } = useGetInspectionByIdQuery(inspectionId);

  const mapAnswersToQuestions = useCallback(
    (selectFieldValues: Record<string, string>) => {
      if (!inspectionData || !inspectionData.checklists || inspectionData.checklists.length === 0) {
        setError("Inspection data or checklists not available");
        return;
      }

      const checklist = inspectionData.checklists[0];

      if (!checklist.template || !checklist.template.questions) {
        setError("Checklist template or questions not available");
        return;
      }

      const questionMap = new Map<string, string>(
        checklist.template.questions.map((question: ChecklistQuestion) => [
          question.question_text,
          question.id,
        ])
      );

      const answers: Answer[] = Object.entries(selectFieldValues)
        .map(([label, value]) => {
          const questionId = questionMap.get(label);
          if (!questionId) {
            console.error(`Question with label '${label}' not found in the checklist.`);
            return null;
          }
          return {
            questionId,
            answer: value,
          };
        })
        .filter(Boolean) as Answer[];

      if (checklist.id && checklist.template.id) {
        const updatedChecklist: EditChecklist = {
          id: checklist.id,
          templateId: checklist.template.id,
          answers,
        };
        setUpdatedChecklist(updatedChecklist);
        setError(null); // Reset error if mapping succeeds
      } else {
        setError("Checklist id or template id is missing");
      }
    },
    [inspectionData]
  );

  // Function to submit the updated checklist
  const submitUpdatedChecklist = useCallback(
    async (onSubmit: (data: EditChecklist) => Promise<void>) => {
      if (!updatedChecklist) {
        setError("Cannot submit. No updated checklist found.");
        return;
      }

      try {
        await onSubmit(updatedChecklist);
        console.log(`Checklist ${updatedChecklist.id} updated successfully`);
      } catch (err) {
        setError("Failed to update the checklist.");
        console.error(err);
      }
    },
    [updatedChecklist]
  );

  return {
    isLoading,
    error,
    mapAnswersToQuestions,
    submitUpdatedChecklist,
  };
};

export default useUpdateInspectionChecklist;
