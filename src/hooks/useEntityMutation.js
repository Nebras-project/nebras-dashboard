// external imports
import { useMutation, useQueryClient } from '@tanstack/react-query';

// internal imports
import { useTranslation, useToast } from '@hooks';
import { getErrorMessage } from '@utils';

/**
 * useEntityMutation Hook
 *
 * Single Responsibility: Generic reusable hook for handling entity mutations (create, update, delete)
 * with React Query mutation and toast notifications
 *
 * @param {Object} options - Hook options
 * @param {Function} options.mutationFn - Function to call for mutation (should return Promise)
 * @param {string|Array} options.queryKey - React Query key(s) to invalidate after mutation
 * @param {string|Array} options.additionalQueryKeys - Additional React Query key(s) to invalidate after mutation
 * @param {string} options.entityName - Entity name for translations (e.g., 'admins', 'students')
 * @param {string} options.action - Action type: 'create', 'update', or 'delete'
 * @param {Function} options.getItemName - Function to extract item name/identifier from item/data object
 * @param {Function} options.onSuccess - Optional callback after successful mutation
 * @param {Function} options.onError - Optional callback after failed mutation
 * @param {Function} options.getSuccessData - Optional function to extract data from mutation response (for delete, it's the item)
 * @returns {Object} Mutation object with mutate function and state
 */
export const useEntityMutation = ({
  mutationFn,
  queryKey,
  additionalQueryKeys,
  entityName,
  action,
  getItemName,
  onSuccess: onSuccessCallback,
  onError,
}) => {
  const { t } = useTranslation();
  const { success, error: showError } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate queries to refetch the list
      if (queryKey) {
        const keys = Array.isArray(queryKey) ? queryKey : [queryKey];
        queryClient.invalidateQueries({ queryKey: keys });
      }

      // Invalidate additional query keys
      if (additionalQueryKeys) {
        const additionalKeys = Array.isArray(additionalQueryKeys)
          ? additionalQueryKeys
          : [additionalQueryKeys];
        additionalKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: Array.isArray(key) ? key : [key] });
        });
      }

      // Get the item/data for toast message
      const itemName = getItemName
        ? getItemName(data, variables)
        : data?.name || data?.Name || 'Item';

      // Show success toast
      success({
        message: t(`${entityName}.${action}SuccessMessage`, { name: itemName, action }),
      });

      // Call onSuccess callback
      if (action === 'delete') {
        onSuccessCallback?.(data, variables); // For delete: (item, response)

      } else {
        onSuccessCallback?.(data); // For create/update: (data)
      }
    },
    onError: (error, variables) => {
      // Get error message directly from API
      const apiErrorMessage = getErrorMessage(error);

      // If API provides an error message, use it; otherwise use generic message
      const errorMessage =
        apiErrorMessage ||
        t(`${entityName}.${action}ErrorMessage`, {
          name: getItemName ? getItemName(variables) : 'Item',
          action,
        });

      // Show error toast
      showError({
        message: errorMessage,
      });

      // Call onError callback
      onError?.(error, variables);
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
