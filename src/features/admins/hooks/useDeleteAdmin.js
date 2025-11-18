// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteAdmin as deleteAdminApi } from '../services/adminsApi';

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
    deleteFn: (admin) => deleteAdminApi(admin.id),
    queryKey: [QUERY_KEYS.ADMINS],
    entityName: 'admins',
    getItemName: (admin) => admin.UserName || admin.userName || admin.name || 'Admin',
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
