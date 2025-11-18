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
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - only used when id is not provided
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with admin(s) data and state
 */
export const useAdmin = ({ id, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchAdminById,
    getListFn: fetchAdmins,
    id,
    params,
    queryKey: [QUERY_KEYS.ADMINS],
    entityName: 'admins',
    enabled,
    onError,
  });

  // Return with admin-specific property names
  if (id) {
    return {
      admin: data,
      admins: undefined,
      isLoading,
      isError,
      error,
      refetch,
    };
  }

  return {
    admin: undefined,
    admins: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
