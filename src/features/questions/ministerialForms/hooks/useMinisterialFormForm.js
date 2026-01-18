// external imports
import { useEntityForm } from '@components/forms/hooks';

// internal imports
import { QUERY_KEYS } from '@config';
import { createForm, updateForm } from '../services/formsApi';
import { getFormName } from '../utils';

/**
 * useMinisterialFormForm Hook
 *
 * Single Responsibility: Manage ministerial form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */
export const useMinisterialFormForm = ({
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.MINISTERIAL_FORMS,
    additionalQueryKeys: [QUERY_KEYS.OVERVIEW_STATS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createForm,
    updateFn: ({ id, data }) => updateForm(id, data),
    buildDefaultValues: (values) => ({
      formNumber: values.formNumber || '',
      year: values.year || '',
      gradeId: values.gradeId || '',
      subjectId: values.subjectId || '',
    }),
    entityName: 'ministerialForm',
    getItemName: (data, variables) => {
      const nameFromVars = getFormName(variables);
      return nameFromVars && nameFromVars !== 'N/A' ? nameFromVars : 'النموذج الوزاري';
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
