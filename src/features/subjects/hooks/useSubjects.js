// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchSubjectById, fetchSubjects } from '../services/subjectsApi';

/**
 * useSubjects Hook
 *
 * Single Responsibility: Subject-specific wrapper for useEntity hook
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.id - Subject ID to fetch (if provided, fetches single subject)
 *   Note: For single subject, use subjectId instead (id is kept for backward compatibility)
 * @param {string|number} options.subjectId - Subject ID to fetch (preferred over id for single subject)
 * @param {string|number} options.curriculumId - Curriculum ID (required for nested endpoints)
 * @param {string} options.queryString - Query string from useTable hook (only used when id/subjectId is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with subject(s) data and state
 */
export const useSubjects = ({
  id,
  gradeId,
  subjectId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {
  // Use subjectId if provided, otherwise fall back to id for backward compatibility
  const effectiveSubjectId = subjectId || id;

  // Build getListFn - gradeId is now required for nested endpoints
  const getListFn = gradeId
    ? () => fetchSubjects(gradeId, params)
    : () => {
        throw new Error('gradeId is required to fetch subjects');
      };

  // Build getSingleFn - both gradeId and subjectId are required for nested endpoints
  const getSingleFn =
    effectiveSubjectId && gradeId
      ? () => fetchSubjectById(gradeId, effectiveSubjectId)
      : () => {
          throw new Error('gradeId and subjectId are required to fetch a subject');
        };

  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn,
    getListFn,
    id: effectiveSubjectId, // Pass effectiveSubjectId to useEntity
    params: { gradeId, ...(queryString ? { queryString } : params) },
    queryKey: [QUERY_KEYS.SUBJECTS, gradeId],
    entityName: 'subjects',
    enabled: enabled && !!gradeId,
    onError,
  });

  // Return with subject-specific property names
  return {
    subject: effectiveSubjectId ? data : undefined,
    subjects: effectiveSubjectId ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
