import { useState, useCallback, useMemo, useId } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useConfirmDialog, useTranslation, useToast } from '@hooks';
import { QUERY_KEYS } from '@config';
import { getErrorMessage } from '@utils';
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
  const { success, error: showError } = useToast();
  const queryClient = useQueryClient();
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
      const results = [];
      const errors = [];

      for (const question of allQuestions) {
        try {
          console.log('Creating question:', question);
          const result = await createQuestions(question);
          results.push(result);
        } catch (error) {
          errors.push(error);
          // Continue with other questions even if one fails
        }
      }

      // Invalidate queries to refetch the list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.QUESTIONS] });

      // Show success or error message
      if (errors.length === 0) {
        // All questions created successfully
        success({
          message: t('questions.batchCreateSuccessMessage', { count: results.length }),
        });
        onSuccess?.(results);
        handleClose();
      } else if (results.length > 0) {
        // Some succeeded, some failed
        const errorMessage = errors[0]
          ? getErrorMessage(errors[0])
          : t('questions.batchCreatePartialErrorMessage');
        showError({
          message: t('questions.batchCreatePartialSuccessMessage', {
            successCount: results.length,
            totalCount: allQuestions.length,
            error: errorMessage,
          }),
        });
        onSuccess?.(results);
        handleClose();
      } else {
        // All failed
        const errorMessage = errors[0]
          ? getErrorMessage(errors[0])
          : t('questions.batchCreateErrorMessage');
        showError({
          message: errorMessage,
        });
        // Don't close dialog on complete failure so user can try again
      }
    },
    [
      getFormData,
      prepareQuestionsForSave,
      onSuccess,
      formRef,
      handleClose,
      queryClient,
      success,
      showError,
      t,
    ]
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
    }),
    [formId, t, handleClose]
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
