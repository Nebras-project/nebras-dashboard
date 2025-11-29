// external imports
import { useDelete, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteExam as deleteExamApi } from '../services/examsApi';
import { getExamName } from '../utils';

/**
 * useDeleteExam Hook
 *
 * Single Responsibility: Exam-specific wrapper for useDelete hook
 *
 * @param {number|string} competitionId - Competition ID
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteExam function and state
 */
export const useDeleteExam = (competitionId, { onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (exam) => deleteExamApi(competitionId, exam.id),
    queryKey: [QUERY_KEYS.EXAMS, competitionId],
    entityName: 'competitions',
    getItemName: (exam) => {
      const name = getExamName(exam, currentLanguage);
      return name !== 'N/A' ? name : 'Exam';
    },
    onSuccess,
    onError,
  });

  return {
    deleteExam: deleteItem,
    deleteExamAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};

