import { useCallback, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  applySharedSettings,
  loadQuestionIntoForm,
  extractSharedSettings,
  filterQuestionData,
} from '../../question/utils';

/**
 * useBatchQuestionForm Hook
 *
 * Single Responsibility: Manage form state and operations for batch add
 */
export const useBatchQuestionForm = ({ open, setSharedSettings, sharedSettings }) => {
  const currentForm = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  const formRef = useRef(currentForm);

  useEffect(() => {
    formRef.current = currentForm;
  }, [currentForm]);

  useEffect(() => {
    if (open) {
      currentForm.reset();
    }
  }, [open, currentForm]);

  const saveQuestion = useCallback(
    async (getNextId) => {
      if (!formRef.current) return null;

      const form = formRef.current;
      const isValid = await form.trigger();
      if (!isValid) return null;

      const formData = form.getValues();
      const newId = getNextId();

      const newSharedSettings = extractSharedSettings(formData);
      setSharedSettings(newSharedSettings);

      form.reset();
      applySharedSettings(form, newSharedSettings);

      const { choices } = filterQuestionData(formData);
      return { ...formData, choices, id: newId };
    },
    [setSharedSettings]
  );

  const updateFormQuestion = useCallback(
    async (questionId) => {
      if (!formRef.current) return null;

      const form = formRef.current;
      const isValid = await form.trigger();
      if (!isValid) return null;

      const formData = form.getValues();
      const { choices } = filterQuestionData(formData);

      form.reset();
      applySharedSettings(form, sharedSettings);

      return { ...formData, choices, id: questionId };
    },
    [sharedSettings]
  );

  const loadForEditing = useCallback((question) => {
    if (!formRef.current) return;
    loadQuestionIntoForm(formRef.current, question);
    formRef.current._editingQuestionId = question.id;
  }, []);

  const clearEditing = useCallback(() => {
    if (formRef.current) {
      formRef.current._editingQuestionId = null;
    }
  }, []);

  const getFormData = useCallback(() => {
    return formRef.current?.getValues() || {};
  }, []);

  const isEditing = useCallback(() => {
    return !!formRef.current?._editingQuestionId;
  }, []);

  return {
    currentForm,
    formRef,
    saveQuestion,
    updateFormQuestion,
    loadForEditing,
    clearEditing,
    getFormData,
    isEditing,
  };
};
