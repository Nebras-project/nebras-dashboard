// external imports
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchQuestionById, fetchQuestions } from '../services/questionsApi';

/**
 * useQuestion Hook
 *
 * Single Responsibility: Question-specific wrapper for fetching question data
 *
 * @param {Object} options - Hook options
 * @param {string|number} options.questionId - Question ID to fetch (if provided, fetches single question)
 * @param {string} options.queryString - Query string from useTable hook (only used when questionId is not provided)
 * @param {Object} options.params - Query parameters for list (deprecated, use queryString instead)
 * @param {boolean} options.enabled - Whether the query should run (default: true)
 * @param {Function} options.onError - Optional callback after failed fetch
 * @returns {Object} Query object with question(s) data and state
 */
export const useQuestion = ({ questionId, queryString, params, enabled = true, onError } = {}) => {
  // Build query key
  const queryKey = questionId ? [QUERY_KEYS.QUESTIONS, questionId] : [QUERY_KEYS.QUESTIONS];

  // Fetch single question or list of questions
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => {
      if (questionId) {
        return fetchQuestionById(questionId);
      }
      const queryParams = queryString ? { queryString } : params;
      return fetchQuestions(queryParams);
    },
    enabled: enabled && (questionId ? true : true), // Always enabled, but can be controlled via enabled prop
    onError,
  });

  // Return with question-specific property names
  return {
    question: questionId ? data : undefined,
    questions: questionId ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
