// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { createLesson, updateLesson } from '../services/lessonsApi';
import { getLessonName } from '../utils';

const buildDefaultValues = (values = {}) => ({
  name: values.name,
});

export const useLessonForm = ({
  gradeId,
  subjectId,
  unitId,
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.LESSONS, gradeId, subjectId, unitId],
    additionalQueryKeys: [QUERY_KEYS.UNITS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createLesson(gradeId, subjectId, unitId, data),
    updateFn: ({ id, data }) => updateLesson(gradeId, subjectId, unitId, id, data),
    buildDefaultValues,
    entityName: 'lessons',
    getItemName: (lesson, vars) => {
      const name = getLessonName(vars);
      return name !== 'N/A' ? name : 'الدرس';
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
