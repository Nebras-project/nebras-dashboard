// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteAdmin as deleteAdminApi } from '../services/adminsApi';
import { getAdminName } from '../utils';

/**
 * useDeleteAdmin Hook
 *
 * Single Responsibility: Admin-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteAdmin function and state
 */
export const useDeleteAdmin = ({ onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (admin) => deleteAdminApi(admin.userId),
    queryKey: [QUERY_KEYS.ADMINS],
    entityName: 'admins',
    getItemName: (data, variables) => {
      const nameFromVars = getAdminName(variables);
      return nameFromVars && nameFromVars !== 'N/A' ? nameFromVars : 'الادمن';
    },
    onSuccess,
    onError,
  });

  return {
    deleteAdmin: deleteItem,
    deleteAdminAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
