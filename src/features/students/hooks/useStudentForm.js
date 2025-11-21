// external imports
import { useMemo } from 'react';
import { useTranslation } from '@hooks';
import { useEntityForm } from '@components/forms/hooks';
import { buildBaseUserDefaultValues } from '@components/forms/utils';

// internal imports
import { QUERY_KEYS } from '@config';
import { getClassLabel } from '@utils/roleUtils';
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
  const { t } = useTranslation();

  // Class options for students
  const classOptions = useMemo(
    () => [
      {
        value: 'thirdSecondary',
        label: getClassLabel('thirdSecondary', t),
      },
      {
        value: 'ninth',
        label: getClassLabel('ninth', t),
      },
    ],
    [t]
  );

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.STUDENTS,
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createStudent,
    updateFn: ({ id, data }) => updateStudent(id, data),
    buildDefaultValues: (values) => ({
      ...buildBaseUserDefaultValues(values),
      class: values.Class || values.class || '',
    }),
    entityName: 'students',
    getItemName: (data) => {
      const name = getStudentName(data);
      return name !== 'N/A' ? name : 'Student';
    },
  });

  return {
    classOptions,
    formDefaultValues,
    handleSubmit,
    isLoading,
    isError,
    error,
  };
};
