// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createSubject, updateSubject } from '../services/subjectsApi';
import { getSubjectName } from '../utils';

/**
 * useSubjectForm Hook
 *
 * Single Responsibility: Manage subject form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {number|string} options.curriculumId - Curriculum ID (required for nested endpoints)
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => ({
  name: values.name || values.nameAr || '',
  nameAr: values.nameAr || values.name || '',
  nameEn: values.nameEn || values.name || '',
});

export const useSubjectForm = ({
  curriculumId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { currentLanguage } = useLanguage();
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.SUBJECTS, curriculumId],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createSubject(curriculumId, data),
    updateFn: ({ id, data }) => updateSubject(curriculumId, id, data),
    buildDefaultValues,
    entityName: 'subjects',
    getItemName: (data) => {
      const name = getSubjectName(data, currentLanguage);
      return name !== 'N/A' ? name : 'Subject';
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
