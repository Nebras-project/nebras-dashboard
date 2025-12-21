// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchManagerById, fetchManagers } from '../services/managersApi';

/**
 * useManager Hook
 *
 * Single Responsibility: Manager-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Manager ID to fetch (if provided, fetches single manager)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - deprecated, use queryString instead
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with manager(s) data and state
 */
export const useManager = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchManagerById,
    getListFn: fetchManagers,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.MANAGERS],
    entityName: 'managers',
    enabled,
    onError,
  });

  // Return with manager-specific property names
  return {
    manager: id ? data : undefined,
    managers: id ? undefined : data?.data || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};
