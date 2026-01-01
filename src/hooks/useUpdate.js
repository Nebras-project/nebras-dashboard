// internal imports
import { useEntityMutation } from './useEntityMutation';

/**
 * useUpdate Hook
 *
 * Single Responsibility: Wrapper around useEntityMutation for update operations
 *
 * @param {Object} options - Hook options
 * @param {Function} options.updateFn - Function to call for update (should accept { id, data } and return Promise)
 * @param {string|Array} options.queryKey - React Query key(s) to invalidate after update
 * @param {string|Array} options.additionalQueryKeys - Additional React Query key(s) to invalidate after update
 * @param {string} options.entityName - Entity name for translations (e.g., 'admins', 'students')
 * @param {Function} options.getItemName - Function to extract item name/identifier from updated item object
 * @param {Function} options.onSuccess - Optional callback after successful update (data)
 * @param {Function} options.onError - Optional callback after failed update (error, data)
 * @returns {Object} Mutation object with updateItem function and state
 */
export const useUpdate = ({
  updateFn,
  queryKey,
  additionalQueryKeys,
  entityName,
  getItemName,
  onSuccess,
  onError,
}) => {
  const { mutate, mutateAsync, isLoading, isError, error } = useEntityMutation({
    mutationFn: updateFn,
    queryKey,
    additionalQueryKeys,
    entityName,
    action: 'update',
    getItemName,
    onSuccess,
    onError,
  });

  return {
    updateItem: mutate,
    updateItemAsync: mutateAsync,
    isLoading,
    isError,
    error,
  };
};
