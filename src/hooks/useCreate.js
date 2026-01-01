// internal imports
import { useEntityMutation } from './useEntityMutation';

/**
 * useCreate Hook
 *
 * Single Responsibility: Wrapper around useEntityMutation for create operations
 *
 * @param {Object} options - Hook options
 * @param {Function} options.createFn - Function to call for creation (should accept data and return Promise)
 * @param {string|Array} options.queryKey - React Query key(s) to invalidate after creation
 * @param {string|Array} options.additionalQueryKeys - Additional React Query key(s) to invalidate after creation
 * @param {string} options.entityName - Entity name for translations (e.g., 'admins', 'students')
 * @param {Function} options.getItemName - Function to extract item name/identifier from created item object
 * @param {Function} options.onSuccess - Optional callback after successful creation (data)
 * @param {Function} options.onError - Optional callback after failed creation (error, data)
 * @returns {Object} Mutation object with createItem function and state
 */
export const useCreate = ({
  createFn,
  queryKey,
  additionalQueryKeys,
  entityName,
  getItemName,
  onSuccess,
  onError,
}) => {
  const { mutate, mutateAsync, isLoading, isError, error } = useEntityMutation({
    mutationFn: createFn,
    queryKey,
    additionalQueryKeys,
    entityName,
    action: 'create',
    getItemName,
    onSuccess,
    onError,
  });

  return {
    createItem: mutate,
    createItemAsync: mutateAsync,
    isLoading,
    isError,
    error,
  };
};
