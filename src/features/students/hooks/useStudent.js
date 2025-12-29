// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchStudentById, fetchStudents } from '../services/studentsApi';

/**
 * useStudent Hook
 *
 * Single Responsibility: Student-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Student ID to fetch (if provided, fetches single student)
 * @param {string} options.queryString - Query string from useTable hook (only used when id is not provided)
 * @param {Object} options.params - Query parameters for list (pagination, sort, filter) - deprecated, use queryString instead
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with student(s) data and state
 */
export const useStudent = ({ id, queryString, params, enabled = true, onError } = {}) => {
  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn: fetchStudentById,
    getListFn: fetchStudents,
    id,
    params: queryString ? { queryString } : params,
    queryKey: [QUERY_KEYS.STUDENTS],
    entityName: 'students',
    enabled,
    onError,
  });

  // Return with student-specific property names
    return {
    student: id ? data : undefined,
    students: id ? undefined : data.data,
    totalCount: id ? undefined : data.totalCount,
    isLoading,
    isError,
    error,
    refetch,
  };
};
