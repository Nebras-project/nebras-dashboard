// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
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
  name: values.name,
});

export const useSubjectForm = ({
  gradeId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.SUBJECTS, gradeId],
    additionalQueryKeys: [QUERY_KEYS.GRADES, QUERY_KEYS.MINISTERIAL_FORMS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createSubject(gradeId, data),
    updateFn: ({ id, data }) => updateSubject(gradeId, id, data),
    buildDefaultValues,
    entityName: 'subjects',
    getItemName: (data, vars) => {
      const name = getSubjectName(vars);
      return name !== 'N/A' ? name : 'مادة';
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
