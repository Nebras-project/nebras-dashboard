// internal imports
import { useEntityMutation } from './useEntityMutation';

/**
 * useDelete Hook
 *
 * Single Responsibility: Wrapper around useEntityMutation for delete operations
 *
 * @param {Object} options - Hook options
 * @param {Function} options.deleteFn - Function to call for deletion (should accept item and return Promise)
 * @param {string|Array} options.queryKey - React Query key(s) to invalidate after deletion
 * @param {string} options.entityName - Entity name for translations (e.g., 'admins', 'students')
 * @param {Function} options.getItemName - Function to extract item name/identifier from item object
 * @param {Function} options.onSuccess - Optional callback after successful deletion (item, data)
 * @param {Function} options.onError - Optional callback after failed deletion (error, item)
 * @returns {Object} Mutation object with deleteItem function and state
 */
export const useDelete = ({ deleteFn, queryKey, entityName, getItemName, onSuccess, onError }) => {
  const { mutate, mutateAsync, isLoading, isError, error } = useEntityMutation({
    mutationFn: deleteFn,
    queryKey,
    entityName,
    action: 'delete',
    getItemName,
    onSuccess,
    onError,
    // For delete, the item is passed as variable, not in response
    getSuccessData: (data, variables) => variables, // Return the item (variables) instead of response
  });

  return {
    deleteItem: mutate,
    deleteItemAsync: mutateAsync,
    isLoading,
    isError,
    error,
  };
};
