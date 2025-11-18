// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';
import { deleteStudent as deleteStudentApi } from '../services/studentsApi';
import { getStudentName } from '../utils';

/**
 * useDeleteStudent Hook
 *
 * Single Responsibility: Student-specific wrapper for useDelete hook
 *
 * @param {Object} options - Hook options
 * @param {Function} options.onSuccess - Optional callback after successful deletion
 * @param {Function} options.onError - Optional callback after failed deletion
 * @returns {Object} Mutation object with deleteStudent function and state
 */
export const useDeleteStudent = ({ onSuccess, onError } = {}) => {
  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (student) => deleteStudentApi(student.id),
    queryKey: [QUERY_KEYS.STUDENTS],
    entityName: 'students',
    getItemName: (student) => {
      const name = getStudentName(student);
      return name !== 'N/A' ? name : 'Student';
    },
    onSuccess,
    onError,
  });

  return {
    deleteStudent: deleteItem,
    deleteStudentAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
