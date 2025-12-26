// external imports
import { useEntityForm } from '@components/forms/hooks';

// internal imports
import { buildBaseUserDefaultValues } from '@components/forms/utils';
import { QUERY_KEYS } from '@config';
import { createAdmin, updateAdmin } from '../services/adminsApi';
import { getAdminName } from '../utils';

/**
 * useAdminForm Hook
 *
 * Single Responsibility: Manage admin form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */
export const useAdminForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.ADMINS,
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createAdmin,
    updateFn: ({ id, data }) => updateAdmin(id, data),
    buildDefaultValues: (values) => buildBaseUserDefaultValues(values),
    entityName: 'admins',
    getItemName: (data, variables) => {
      const nameFromVars = getAdminName(variables);
      return nameFromVars && nameFromVars !== 'N/A' ? nameFromVars : 'الادمن';
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
