// external imports
import { useDelete, useLanguage } from '@hooks';
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
export const useDeleteSubject = ({ curriculumId, onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (subject) => deleteSubjectApi(curriculumId, subject.id),
    queryKey: [QUERY_KEYS.SUBJECTS, curriculumId],
    entityName: 'subjects',
    getItemName: (subject) => {
      const name = getSubjectName(subject, currentLanguage);
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
