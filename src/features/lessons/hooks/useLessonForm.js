// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createLesson, updateLesson } from '../services/lessonsApi';
import { getLessonName } from '../utils';

const buildDefaultValues = (values = {}) => ({
  nameAr: values.nameAr || values.name || '',
  nameEn: values.nameEn || values.name || '',
  order: values.order || 1,
  isActive: values.isActive ?? true,
});

export const useLessonForm = ({
  curriculumId,
  subjectId,
  unitId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { currentLanguage } = useLanguage();

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.LESSONS, curriculumId, subjectId, unitId],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createLesson(curriculumId, subjectId, unitId, data),
    updateFn: ({ id, data }) => updateLesson(curriculumId, subjectId, unitId, id, data),
    buildDefaultValues,
    entityName: 'lessons',
    getItemName: (lesson) => {
      const name = getLessonName(lesson, currentLanguage);
      return name !== 'N/A' ? name : 'Lesson';
    },
  });

  return {
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
