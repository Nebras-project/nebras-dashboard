/**
 * useCurrentUser Hook
 *
 * Custom hook for fetching current authenticated user with React Query
 */

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/authApi';
import { QUERY_KEYS } from '@config';

/**
 * Query key for current user
 */

/**
 * Hook for fetching current user
 * @param {Object} options - React Query query options
 * @returns {Object} Current user query properties
 */
export const useCurrentUser = (options = {}) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: getCurrentUser,
    ...options,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    isSuccess: query.isSuccess,
    error: query.error,
    refetch: query.refetch,
  };
};
