// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteManager as deleteManagerApi } from '../services/managersApi';
import { getManagerName } from '../utils';

/**
 * useDeleteManager Hook
 *
 * Single Responsibility: Manager-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteManager function and state
 */
export const useDeleteManager = ({ onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (manager) => deleteManagerApi(manager.id),
    queryKey: [QUERY_KEYS.MANAGERS],
    entityName: 'managers',
    getItemName: (manager) => {
      const name = getManagerName(manager);
      return name !== 'N/A' ? name : 'Manager';
    },
    onSuccess,
    onError,
  });

  return {
    deleteManager: deleteItem,
    deleteManagerAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
