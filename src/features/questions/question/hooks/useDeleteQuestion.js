// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteQuestion as deleteQuestionApi } from '../services/questionsApi';
import { useTranslation } from '@hooks';

/**
 * useDeleteQuestion Hook
 *
 * Single Responsibility: Question-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteQuestion function and state
 */
export const useDeleteQuestion = ({ onSuccess, onError } = {}) => {
  const { t } = useTranslation();
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (question) => deleteQuestionApi(question.id),
    queryKey: [QUERY_KEYS.QUESTIONS],
    entityName: 'questions',
    getItemName: (question, variables) => {
      const questionText = variables.text || '';
      return questionText || t('questions.questionNumber', { number: variables.id });
    },
    onSuccess,
    onError,
  });

  return {
    deleteQuestion: deleteItem,
    deleteQuestionAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
