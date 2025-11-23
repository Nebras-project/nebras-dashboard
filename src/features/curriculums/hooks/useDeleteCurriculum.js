// external imports
import { useDelete, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteCurriculum as deleteCurriculumApi } from '../services/curriculumsApi';
import { getCurriculumName } from '../utils';

/**
 * useDeleteCurriculum Hook
 *
 * Single Responsibility: Curriculum-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteCurriculum function and state
 */
export const useDeleteCurriculum = ({ onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (curriculum) => deleteCurriculumApi(curriculum.id),
    queryKey: [QUERY_KEYS.CURRICULUMS],
    entityName: 'curriculums',
    getItemName: (curriculum) => {
      const name = getCurriculumName(curriculum, currentLanguage);
      return name !== 'N/A' ? name : 'Curriculum';
    },
    onSuccess,
    onError,
  });

  return {
    deleteCurriculum: deleteItem,
    deleteCurriculumAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
