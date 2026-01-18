// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteForm as deleteFormApi } from '../services/formsApi';
import { getFormName } from '../utils';

/**
 * useDeleteMinisterialForm Hook
 *
 * Single Responsibility: MinisterialForm-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteMinisterialForm function and state
 */
export const useDeleteMinisterialForm = ({ onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (form) => deleteFormApi(form.id),
    queryKey: [QUERY_KEYS.MINISTERIAL_FORMS],
    additionalQueryKeys: [QUERY_KEYS.OVERVIEW_STATS],
    entityName: 'ministerialForm',
    getItemName: (data, variables) => {
      const nameFromVars = getFormName(variables);
      return nameFromVars && nameFromVars !== 'N/A' ? nameFromVars : 'النموذج الوزاري';
    },
    onSuccess,
    onError,
  });

  return {
    deleteMinisterialForm: deleteItem,
    deleteMinisterialFormAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
