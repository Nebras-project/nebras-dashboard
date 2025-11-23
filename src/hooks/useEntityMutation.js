// external imports
import { useMutation, useQueryClient } from '@tanstack/react-query';

// internal imports
import { useTranslation, useToast } from '@hooks';

/**
 * useEntityMutation Hook
 *
 * Single Responsibility: Generic reusable hook for handling entity mutations (create, update, delete)
 * with React Query mutation and toast notifications
 *
 * @param {Object} options - Hook options
 * @param {Function} options.mutationFn - Function to call for mutation (should return Promise)
 * @param {string|Array} options.queryKey - React Query key(s) to invalidate after mutation
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
  entityName,
  action,
  getItemName,
  onSuccess,
  onError,
  getSuccessData,
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

      // Get the item/data for toast message
      const successData = getSuccessData ? getSuccessData(data, variables) : data;
      const itemName = getItemName
        ? getItemName(successData)
        : successData?.name || successData?.Name || 'Item';

      // Show success toast
      success({
        message: t(`${entityName}.${action}SuccessMessage`, { name: itemName, action }),
      });

      // Call onSuccess callback
      if (action === 'delete') {
        onSuccess?.(variables, data); // For delete: (item, response)
      } else {
        onSuccess?.(data); // For create/update: (data)
      }
    },
    onError: (error, variables) => {
      // Get the item/data for error message
      const errorData = variables;
      const itemName = getItemName
        ? getItemName(errorData)
        : errorData?.name || errorData?.Name || 'Item';

      // Show error toast
      showError({
        message: t(`${entityName}.${action}ErrorMessage`, { name: itemName, action }),
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
