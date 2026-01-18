// external imports
import { useEntityForm } from '@components/forms/hooks';

// internal imports
import { buildBaseUserDefaultValues } from '@components/forms/utils';
import { QUERY_KEYS } from '@config';
import { createManager, updateManager } from '../services/managersApi';
import { getManagerName } from '../utils';
import { useRoles } from '../../admins/hooks/useRoles';

/**
 * useManagerForm Hook
 *
 * Single Responsibility: Manage manager form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */
export const useManagerForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { roleOptions } = useRoles();

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.MANAGERS,
    additionalQueryKeys: [QUERY_KEYS.OVERVIEW_STATS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createManager,
    updateFn: ({ id, data }) => updateManager(id, data),
    buildDefaultValues: (values) => ({
      ...buildBaseUserDefaultValues(values),
      role: values.role || '',
    }),
    entityName: 'managers',
    getItemName: (data, variables) => {
      const nameFromVars = getManagerName(variables);
      return nameFromVars && nameFromVars !== 'N/A' ? nameFromVars : 'المدير';
    },
  });

  return {
    roleOptions,
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
