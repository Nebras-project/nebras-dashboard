// external imports
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchExamById, fetchExams } from '../services/examsApi';

/**
 * useExam Hook
 *
 * Single Responsibility: Exam-specific wrapper for fetching exam data
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.competitionId - Competition ID (required)
 * @param {string|number} options.examId - Exam ID to fetch (if provided, fetches single exam)
 * @param {string} options.queryString - Query string from useTable hook (only used when examId is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with exam(s) data and state
 */
export const useExam = ({
  competitionId,
  examId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {
  // Build query key
  const queryKey = examId
    ? [QUERY_KEYS.EXAMS, competitionId, examId]
    : [QUERY_KEYS.EXAMS, competitionId];

  // Fetch single exam or list of exams
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => {
      if (examId) {
        return fetchExamById(competitionId, examId);
      }
      const queryParams = queryString ? { queryString } : params;
      return fetchExams(competitionId, queryParams);
    },
    enabled: enabled && !!competitionId,
    onError,
  });

  // Return with exam-specific property names
  return {
    exam: examId ? data : undefined,
    exams: examId ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
