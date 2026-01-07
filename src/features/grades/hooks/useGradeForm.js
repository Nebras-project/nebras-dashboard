// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { createGrade, updateGrade } from '../services/gradesApi';
import { getGradeName } from '../utils';

/**
 * useGradeForm Hook
 *
 * Single Responsibility: Manage grade form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => ({
  name: values.name || '',
});

export const useGradeForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.GRADES,
    additionalQueryKeys: [QUERY_KEYS.MINISTERIAL_FORMS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createGrade,
    updateFn: ({ id, data }) => updateGrade(id, data),
    buildDefaultValues,
    entityName: 'grades',
    getItemName: (data, variables) => {
      const name = getGradeName(variables);
      return name !== 'N/A' ? name : 'Grade';
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
