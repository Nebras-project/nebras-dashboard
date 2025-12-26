// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchAdminById, fetchAdmins } from '../services/adminsApi';

/**
 * useAdmin Hook
 *
 * Single Responsibility: Admin-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Admin ID to fetch (if provided, fetches single admin)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - deprecated, use queryString instead
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with admin(s) data and state
 */
export const useAdmin = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchAdminById,
    getListFn: fetchAdmins,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.ADMINS],
    entityName: 'admins',
    enabled,
    onError,
  });

  // Return with admin-specific property names
  return {
    admin: id ? data : undefined,
    admins: id ? undefined : data?.data || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    isError,
    error,
    refetch,
  };
};
