// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchCompetitionById, fetchCompetitions } from '../services/competitionsApi';

/**
 * useCompetition Hook
 *
 * Single Responsibility: Competition-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Competition ID to fetch (if provided, fetches single competition)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with competition(s) data and state
 */
export const useCompetition = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchCompetitionById,
    getListFn: fetchCompetitions,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.COMPETITIONS],
    entityName: 'competitions',
    enabled,
    onError,
  });

  // Return with competition-specific property names
  return {
    competition: id ? data : undefined,
    competitions: id ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
