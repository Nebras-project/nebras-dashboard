// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchCurriculumById, fetchCurriculums } from '../services/curriculumsApi';

/**
 * useCurriculum Hook
 *
 * Single Responsibility: Curriculum-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Curriculum ID to fetch (if provided, fetches single curriculum)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with curriculum(s) data and state
 */
export const useCurriculum = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchCurriculumById,
    getListFn: fetchCurriculums,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.CURRICULUMS],
    entityName: 'curriculums',
    enabled,
    onError,
  });

  // Return with curriculum-specific property names
  return {
    curriculum: id ? data : undefined,
    curriculums: id ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
