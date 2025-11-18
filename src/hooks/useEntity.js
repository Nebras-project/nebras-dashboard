// external imports
import { useQuery } from '@tanstack/react-query';

// internal imports
import { useTranslation, useToast } from '@hooks';

/**
 * useEntity Hook
 *
 * Single Responsibility: Generic reusable hook for fetching single entity or list of entities with React Query
 *
 * @param {Object} options - Hook options
 * @param {Function} options.getSingleFn - Function to call for fetching single entity (should accept id and return Promise)
 * @param {Function} options.getListFn - Function to call for fetching list of entities (should accept params and return Promise)
 * @param {string|number} options.id - Entity ID to fetch (if provided, fetches single entity)
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - only used when id is not provided
 * @param {string|Array} options.queryKey - React Query key(s) for caching
 * @param {string} options.entityName - Entity name for translations (e.g., 'admins', 'students')
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with entity/entities data and state
 */
export const useEntity = ({
  getSingleFn,
  getListFn,
  id,
  params,
  queryKey,
  entityName,
  enabled = true,
  onError,
}) => {
  const { t } = useTranslation();
  const { error: showError } = useToast();

  // Determine if we're fetching a single entity or list
  // Check that id exists, is not null/undefined, and is not an array
  const isSingle = id != null && !Array.isArray(id);

  const query = useQuery({
    queryKey: isSingle
      ? [...(Array.isArray(queryKey) ? queryKey : [queryKey]), id]
      : [...(Array.isArray(queryKey) ? queryKey : [queryKey]), params || {}],
    queryFn: () => (isSingle ? getSingleFn(id) : getListFn(params || {})),
    enabled: enabled, // isSingle already validates id != null
    onError: (error) => {
      showError({
        title: t('common.error'),
        message: t('common.fetchErrorMessage', { entityName: t(`${entityName}.entityName`) }),
      });
      onError?.(error);
    },
  });

  // Return appropriate data structure based on whether it's single or list
  if (isSingle) {
    return {
      data: query.data,
      isLoading: query.isLoading,
      isError: query.isError,
      error: query.error,
      refetch: query.refetch,
    };
  }

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
