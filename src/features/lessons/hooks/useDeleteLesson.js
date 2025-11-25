// external imports
import { useDelete, useLanguage } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { deleteLesson as deleteLessonApi } from '../services/lessonsApi';
import { getLessonName } from '../utils';

export const useDeleteLesson = ({ curriculumId, subjectId, unitId, onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();

  const { deleteItem, deleteItemAsync, isLoading, isError, error } = useDelete({
    deleteFn: (lesson) => deleteLessonApi(curriculumId, subjectId, unitId, lesson.id),
    queryKey: [QUERY_KEYS.LESSONS, curriculumId, subjectId, unitId],
    entityName: 'lessons',
    getItemName: (lesson) => {
      const name = getLessonName(lesson, currentLanguage);
      return name !== 'N/A' ? name : 'Lesson';
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
