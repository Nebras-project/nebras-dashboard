// external imports
import { useEntity } from '@hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { fetchLessonById, fetchLessons } from '../services/lessonsApi';

/**
 * useLessons Hook
 *
 * Single Responsibility: Lesson-specific wrapper for useEntity hook
 */
export const useLessons = ({
  id,
  lessonId,
  gradeId,
  subjectId,
  unitId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {
  const effectiveLessonId = lessonId || id;

  const getListFn =
    gradeId && subjectId && unitId
      ? () => fetchLessons(gradeId, subjectId, unitId, params)
      : () => {
          throw new Error('gradeId, subjectId, and unitId are required to fetch lessons');
        };

  const getSingleFn =
    effectiveLessonId && gradeId && subjectId && unitId
      ? () => fetchLessonById(gradeId, subjectId, unitId, effectiveLessonId)
      : () => {
          throw new Error('gradeId, subjectId, unitId, and lessonId are required');
        };

  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn,
    getListFn,
    id: effectiveLessonId,
    params: { gradeId, subjectId, unitId, ...(queryString ? { queryString } : params) },
    queryKey: [QUERY_KEYS.LESSONS, gradeId, subjectId, unitId],
    entityName: 'lessons',
    enabled: enabled && !!gradeId && !!subjectId && !!unitId,
    onError,
  });
    return {
    lesson: effectiveLessonId ? data : undefined,
    lessons: effectiveLessonId ? undefined : data.data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
