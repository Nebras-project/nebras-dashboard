// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteGrade as deleteGradeApi } from '../services/gradesApi';
import { getGradeName } from '../utils';

/**
 * useDeleteGrade Hook
 *
 * Single Responsibility: Grade-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteGrade function and state
 */
export const useDeleteGrade = ({ onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (grade) => deleteGradeApi(grade.id),
    queryKey: [QUERY_KEYS.GRADES],
    entityName: 'grades',
    getItemName: (grade, variables) => {
      const name = getGradeName(variables);
      return name !== 'N/A' ? name : 'Grade';
    },
    onSuccess,
    onError,
  });

  return {
    deleteGrade: deleteItem,
    deleteGradeAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
