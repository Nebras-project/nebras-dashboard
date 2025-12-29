// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchGradeById, fetchGrades } from '../services/gradesApi';
import { getGradeOptions } from '../utils';

/**
 * useGrade Hook
 *
 * Single Responsibility: Grade-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Grade ID to fetch (if provided, fetches single grade)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with grade(s) data and state
 */
export const useGrade = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchGradeById,
    getListFn: fetchGrades,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.GRADES],
    entityName: 'grades',
    enabled,
    onError,
  });

  let gradeOptions = [];
  if(!id) {
    gradeOptions = getGradeOptions(data || []);
  }
  // Return with grade-specific property names
  return {
    grade: id ? data : undefined,
    grades: id ? undefined : data,
    gradeOptions,
    isLoading,
    isError,
    error,
    refetch,
  };
};
