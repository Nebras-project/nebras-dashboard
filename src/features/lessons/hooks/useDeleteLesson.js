// external imports
import { useDelete } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { deleteLesson as deleteLessonApi } from '../services/lessonsApi';
import { getLessonName } from '../utils';

export const useDeleteLesson = ({ gradeId, subjectId, unitId, onSuccess, onError } = {}) => {

  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (lesson) => deleteLessonApi(gradeId, subjectId, unitId, lesson.id),
    queryKey: [QUERY_KEYS.LESSONS, gradeId, subjectId, unitId],
    additionalQueryKeys: [QUERY_KEYS.UNITS],
    entityName: 'lessons',
    getItemName: (lesson, vars) => {
      const name = getLessonName(vars);
      return name !== 'N/A' ? name : 'الدرس';
    },
    onSuccess,
    onError,
  });

  return {
    deleteLesson: deleteItem,
    deleteLessonAsync: deleteItemAsync,
    isLoading,
    isError,
    error,
  };
};
