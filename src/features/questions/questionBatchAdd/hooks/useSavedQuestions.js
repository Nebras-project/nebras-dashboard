import { useState, useCallback } from 'react';
import { filterQuestionData, hasFormData } from '../../utils';

/**
 * useSavedQuestions Hook
 *
 * Single Responsibility: Manage saved questions list and operations for batch add
 */
export const useSavedQuestions = () => {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [sharedSettings, setSharedSettings] = useState(null);

  const addQuestion = useCallback((question) => {
    setSavedQuestions((prev) => [...prev, question]);
  }, []);

  const updateListQuestion = useCallback((questionId, questionData) => {
    setSavedQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...questionData, id: questionId } : q))
    );
  }, []);

  const removeQuestion = useCallback((questionId) => {
    setSavedQuestions((prev) => prev.filter((q) => q.id !== questionId));
  }, []);

  const clearAll = useCallback(() => {
    setSavedQuestions([]);
    setSharedSettings(null);
  }, []);

  /**
   * Prepare questions for save
   * Function Overloading:
   * - prepareQuestionsForSave() or prepareQuestionsForSave(null) -> returns only saved questions
   * - prepareQuestionsForSave(formRef) -> returns saved questions + current form question
   *
   * @param {Object|null|undefined} formRef - Optional form reference to include current form data
   * @returns {Array} Array of questions ready to save (without id field)
   */
  const prepareQuestionsForSave = useCallback(
    (formRef = null) => {
      // Start with saved questions (remove id field)
      const allQuestions = savedQuestions.map(({ id, ...data }) => data);

      // If formRef is provided, include current form data
      if (formRef?.current) {
        const formData = formRef.current.getValues();
        if (hasFormData(formData)) {
          const questionData = filterQuestionData(formData);
          const editingId = formRef.current._editingQuestionId;

          if (editingId) {
            // Find the question in savedQuestions and update it in the same position
            const index = savedQuestions.findIndex((q) => q.id === editingId);
            if (index !== -1) {
              // Update existing question at the same index
              allQuestions[index] = questionData;
            } else {
              // Question not found (shouldn't happen), add as new
              allQuestions.push(questionData);
            }
          } else {
            // New question (not editing), add to list
            allQuestions.push(questionData);
          }
        }
      }

      return allQuestions;
    },
    [savedQuestions]
  );

  return {
    savedQuestions,
    sharedSettings,
    setSharedSettings,
    addQuestion,
    updateListQuestion,
    removeQuestion,
    clearAll,
    prepareQuestionsForSave,
  };
};
