// external imports
import { useParams } from 'react-router-dom';
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';

// internal imports
import { useLanguage } from '@hooks';
import { createExam, updateExam } from '../services/examsApi';
import { getExamName } from '../utils';

/**
 * useExamForm Hook
 *
 * Single Responsibility: Manage exam form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {string|number} options.competitionId - Competition ID
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => ({
  subjectId: values.subjectId || values.subject?.id || '',
  curriculumId: values.curriculumId || values.curriculum?.id || '',
  date: values.date || '',
  startTime: values.startTime || '',
  endTime: values.endTime || '',
  multipleChoiceCount: values.multipleChoiceCount || 0,
  trueFalseCount: values.trueFalseCount || 0,
});

export const useExamForm = ({ defaultValues = {}, isEdit = false, onSuccess, onError } = {}) => {
  const { currentLanguage } = useLanguage();
  const { id } = useParams();
  const competitionId = id ? Number(id) : null;

  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: [QUERY_KEYS.EXAMS, competitionId],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: (data) => createExam(competitionId, data),
    updateFn: ({ id: examId, data }) => updateExam(competitionId, examId, data),
    buildDefaultValues,
    entityName: 'exams',
    getItemName: (data) => {
      const name = getExamName(data, currentLanguage);
      return name !== 'N/A' ? name : 'Exam';
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
