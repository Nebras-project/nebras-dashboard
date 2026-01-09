// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteSubject as deleteSubjectApi } from '../services/subjectsApi';
import { getSubjectName } from '../utils';

/**
 * useDeleteSubject Hook
 *
 * Single Responsibility: Subject-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {number|string} options.curriculumId - Curriculum ID (required for nested endpoints)
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteSubject function and state
 */
export const useDeleteSubject = ({
  gradeId,
  selectedSubjectId: subjectId,
  onSuccess,
  onError,
} = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: () => deleteSubjectApi(gradeId, subjectId),
    queryKey: [QUERY_KEYS.SUBJECTS, gradeId],
    additionalQueryKeys: [
      QUERY_KEYS.GRADES,
      [QUERY_KEYS.UNITS, gradeId, subjectId],
      QUERY_KEYS.MINISTERIAL_FORMS,
    ],
    entityName: 'subjects',
    getItemName: (subject, vars) => {
      const name = getSubjectName(vars);
      return name !== 'N/A' ? name : 'Subject';
    },
    onSuccess,
    onError,
  });

  return {
    deleteSubject: deleteItem,
    deleteSubjectAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
