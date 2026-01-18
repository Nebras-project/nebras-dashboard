// external imports
import { useMemo } from 'react';
import { useLanguage } from '@hooks';
import { useEntityForm } from '@components/forms/hooks';
import { buildBaseUserDefaultValues } from '@components/forms/utils';

// internal imports
import { QUERY_KEYS } from '@config';
import { useGrade } from '@features/grades/hooks';
import { getGradeOptions } from '@features/grades/utils';
import { createStudent, updateStudent } from '../services/studentsApi';
import { getStudentName } from '../utils';

/**
 * useStudentForm Hook
 *
 * Single Responsibility: Manage student form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */
export const useStudentForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { grades = [] } = useGrade();

  // Grade options for students
  const gradeOptions = useMemo(
    () => getGradeOptions(grades, currentLanguage),
    [grades, currentLanguage]
  );

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.STUDENTS,
    additionalQueryKeys: [QUERY_KEYS.GRADES, QUERY_KEYS.OVERVIEW_STATS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createStudent,
    updateFn: ({ id, data }) => updateStudent(id, data),
    buildDefaultValues: (values) => ({
      ...buildBaseUserDefaultValues(values),
      gradeId: values.gradeId || '',
    }),
    entityName: 'students',
    getItemName: (data, variables) => {
      const name = getStudentName(variables);
      return name !== 'N/A' ? name : 'الطالب';
    },
  });

  return {
    gradeOptions,
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
