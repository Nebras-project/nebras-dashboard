// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createCompetition, updateCompetition } from '../services/competitionsApi';
import { getCompetitionName } from '../utils';

/**
 * useCompetitionForm Hook
 *
 * Single Responsibility: Manage competition form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => ({
  nameAr: values.nameAr || values.name || '',
  nameEn: values.nameEn || values.name || '',
  descriptionAr: values.descriptionAr || values.description || '',
  descriptionEn: values.descriptionEn || values.description || '',
  startDate: values.startDate || '',
  endDate: values.endDate || '',
  curriculumId: values.curriculumId || values.curriculum?.id || '',
  duration: values.duration || 60,
  questionCount: values.questionCount || 10,
  passingScore: values.passingScore || 50,
  isActive: values.isActive !== undefined ? values.isActive : true,
});

export const useCompetitionForm = ({
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { currentLanguage } = useLanguage();
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.COMPETITIONS,
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createCompetition,
    updateFn: ({ id, data }) => updateCompetition(id, data),
    buildDefaultValues,
    entityName: 'competitions',
    getItemName: (data) => {
      const name = getCompetitionName(data, currentLanguage);
      return name !== 'N/A' ? name : 'Competition';
    },
  });

  return {
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
