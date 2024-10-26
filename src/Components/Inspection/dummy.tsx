// The current code calls the API to update the checklist when the user clicks the "Save and Submit" button. This can be inefficient if the data is large and takes time to compile. Here's how to modify the code to call the API only after all data is compiled:

// 1. Use Form State Management:

// Instead of storing answers in a separate answers state variable, leverage the form state provided by React. This allows you to track changes and submit the form only when valid.

// 2. Track Form Submission State:

// Add a state variable isFormSubmitted to indicate if the user has clicked the submit button.

// 3. Handle Form Submission:

// Modify the handleSubmit function to:

// Prevent default form submission behavior.
// Set isFormSubmitted to true.
// 4. Compile Data on Submission:

// Create a separate function, for example, compileData, to iterate through the form fields and extract the answers. This function should only be called when isFormSubmitted is true.

// 5. Call API after Compilation:

// Inside compileData, build the final payload with the extracted answers and inspection data. Then, call the updateInspection mutation from useUpdateChecklistMutation with the compiled payload.

// Here's the modified code snippet for AddInspectionChecklist:

// JavaScript
// const [isFormSubmitted, setIsFormSubmitted] = useState(false);

// const handleSubmit = async (event) => {
//   event.preventDefault();
//   setIsFormSubmitted(true);   

// };

// const compileData = () => {
//   if (!isFormSubmitted) return;

//   const updatedChecklists: EditChecklist[] = (inspection?.checklists || []).map((checklist: Checklist) => {
//     const templateQuestions = checklist.template?.questions || [];
//     const answersForChecklist: Answer[] = templateQuestions
//       .filter((question) => form.getFieldValue(question.question_text)) // Access form values
//       .map((question) => ({
//         questionId: question.id,
//         answer: form.getFieldValue(question.question_text),
//       }));

//     return {
//       id: checklist.id,
//       templateId: checklist.template?.id || "",
//       answers: answersForChecklist,
//     };
//   });

//   const updatedInspection: UpdateChecklist = {
//     id: inspection?.id,
//     checklists: updatedChecklists,
//   };

//   try {
//     await updateInspection(updatedInspection).unwrap();
//     // ... handle success
//   } catch (error) {
//     // ... handle error
//   } finally {
//     setIsFormSubmitted(false); // Reset form submit state
//   }
// };

// // Integrate form library (e.g., React Hook Form)

// const form = useForm({
//   defaultValues: {
//     // Set default values for form fields
//   },
// });

// return (
//   <div>
//     <form onSubmit={handleSubmit}>
//       {/* ... form fields using form library */}
//     </form>
//     <div className="flex justify-end">
//       <PurpleButton
//         text={isSubmitting ? "Compiling..." : "Save and Submit"}
//         disabled={isSubmitting}
//         onClick={handleSubmit}
//       />
//       {/* ... other buttons */}
//     </div>
//   </div>
// );

// useEffect(() => {
//   if (isFormSubmitted) {
//     compileData();
//   }
// }, [isFormSubmitted]);
// Use code with caution.

// This approach ensures that the API call happens only after all data is compiled, improving performance and user experience. You can choose a suitable form library like React Hook Form or Formik for easier form management. Remember to adjust the code based on your specific form library's syntax.