import { useState, useCallback, useMemo, useId } from 'react';
import { useConfirmDialog, useTranslation } from '@hooks';
import { useSavedQuestions } from './useSavedQuestions';
import { useBatchQuestionForm } from './useBatchQuestionForm';
import { hasFormData } from '../../question/utils';
import { createQuestions } from '../../question/services/questionsApi';

/**
 * useBatchAddLogic Hook
 *
 * Single Responsibility: Manage all business logic for QuestionsBatchAdd component
 */
export const useBatchAddLogic = ({ open, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const { t: tForm } = useTranslation();
  const formId = useId();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { open: confirmOpen, show: showConfirm, close: closeConfirm } = useConfirmDialog();
  const [confirmCallback, setConfirmCallback] = useState(null);

  const {
    savedQuestions,
    sharedSettings,
    setSharedSettings,
    addQuestion,
    updateListQuestion,
    removeQuestion,
    clearAll,
    prepareQuestionsForSave,
  } = useSavedQuestions();

  const {
    currentForm,
    formRef,
    saveQuestion,
    updateFormQuestion,
    loadForEditing,
    clearEditing,
    getFormData,
    isEditing,
  } = useBatchQuestionForm({
    open,
    setSharedSettings,
    sharedSettings,
  });

  // Get next question ID
  const getNextId = useCallback(() => {
    return savedQuestions.length > 0 ? Math.max(...savedQuestions.map((q) => q.id)) + 1 : 1;
  }, [savedQuestions]);

  // Handle add new question
  const handleAddQuestion = useCallback(async () => {
    if (!formRef.current) return;

    const formData = getFormData();
    if (!hasFormData(formData)) {
      // No data in form, nothing to do
      return;
    }

    if (isEditing()) {
      const questionId = formRef.current._editingQuestionId;
      const question = await updateFormQuestion(questionId);
      if (question) {
        // Update the question in its original position in the list
        updateListQuestion(questionId, question);
        clearEditing();
      }
    } else {
      const question = await saveQuestion(getNextId);
      if (question) {
        addQuestion(question);
      }
    }
  }, [
    formRef,
    getFormData,
    isEditing,
    updateFormQuestion,
    updateListQuestion,
    clearEditing,
    saveQuestion,
    getNextId,
    addQuestion,
  ]);

  // Handle edit question
  const handleEditQuestion = useCallback(
    (question) => {
      if (!formRef.current) return;

      const formData = getFormData();
      const hasData = hasFormData(formData);

      const loadQuestion = () => {
        // Don't remove the question from list, just load it into the form for editing
        loadForEditing(question);
      };

      if (hasData) {
        setConfirmCallback(() => () => {
          loadQuestion();
          closeConfirm();
        });
        showConfirm();
      } else {
        loadQuestion();
      }
    },
    [getFormData, loadForEditing, showConfirm, closeConfirm, formRef]
  );

  // Handle delete question
  const handleDeleteQuestion = useCallback(
    (questionId) => {
      removeQuestion(questionId);
    },
    [removeQuestion]
  );

  // Handle close dialog
  const handleClose = useCallback(() => {
    formRef.current?.reset();
    clearAll();
    setPreviewOpen(false);
    onClose();
  }, [onClose, formRef, clearAll]);

  // Handle save all questions
  // @param {boolean} skipFormValidation - If true, skip form validation and only save saved questions
  const handleSaveAll = useCallback(
    async (skipFormValidation = false) => {
      // Validate form if not skipping validation
      if (!skipFormValidation) {
        if (!formRef.current) return;

        const formData = getFormData();
        if (hasFormData(formData)) {
          const isValid = await formRef.current.trigger();
          if (!isValid) return;
        }
      }

      // Prepare questions for save (with or without current form data)
      const formRefToUse = skipFormValidation ? null : formRef;
      const allQuestions = prepareQuestionsForSave(formRefToUse);
      if (allQuestions.length === 0) return;

      // Create questions one at a time
      // Error handling is done by the API interceptor (toast notifications)
      const results = [];
      for (const question of allQuestions) {
        const result = await createQuestions(question);
        results.push(result);
      }
      onSuccess?.(results);
      handleClose();
    },
    [getFormData, prepareQuestionsForSave, onSuccess, formRef, handleClose]
  );

  // Calculate total questions count
  const totalQuestionsCount = useMemo(() => {
    let count = savedQuestions.length;
    const formData = getFormData();
    if (hasFormData(formData) && !isEditing()) {
      count += 1;
    }
    return count;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedQuestions.length, currentForm.watch()]);

  // Form context value for FormProvider
  const formContextValue = useMemo(
    () => ({
      mode: 'dialog',
      title: t('questions.addQuestions'),
      formId,
      showCloseButton: true,
      onClose: handleClose,
      t: tForm,
    }),
    [formId, t, tForm, handleClose]
  );

  return {
    // State
    savedQuestions,
    previewOpen,
    confirmOpen,
    confirmCallback,
    totalQuestionsCount,
    // Form
    currentForm,
    formContextValue,
    // Handlers
    handleClose,
    handleAddQuestion,
    handleEditQuestion,
    handleDeleteQuestion,
    handleSaveAll,
    clearAll,
    setPreviewOpen,
    closeConfirm,
  };
};
