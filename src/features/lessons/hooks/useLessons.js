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
  curriculumId,
  subjectId,
  unitId,
  queryString,
  params,
  enabled = true,
  onError,
} = {}) => {
  const effectiveLessonId = lessonId || id;

  const getListFn =
    curriculumId && subjectId && unitId
      ? () => fetchLessons(curriculumId, subjectId, unitId, params)
      : () => {
          throw new Error('curriculumId, subjectId, and unitId are required to fetch lessons');
        };

  const getSingleFn =
    effectiveLessonId && curriculumId && subjectId && unitId
      ? () => fetchLessonById(curriculumId, subjectId, unitId, effectiveLessonId)
      : () => {
          throw new Error('curriculumId, subjectId, unitId, and lessonId are required');
        };

  const { data, isLoading, isError, error, refetch } = useEntity({
    getSingleFn,
    getListFn,
    id: effectiveLessonId,
    params: { curriculumId, subjectId, unitId, ...(queryString ? { queryString } : params) },
    queryKey: [QUERY_KEYS.LESSONS, curriculumId, subjectId, unitId],
    entityName: 'lessons',
    enabled: enabled && !!curriculumId && !!subjectId && !!unitId,
    onError,
  });

    return {
    lesson: effectiveLessonId ? data : undefined,
    lessons: effectiveLessonId ? undefined : data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
