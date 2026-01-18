// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';
import { FORM_DEFAULTS } from '@components/forms/constants';

// internal imports
import { filterQuestionData, getChoiceValue, deriveCorrectAnswer } from '../utils';
import { createQuestions, updateQuestion } from '../services/questionsApi';

/**
 * useQuestionForm Hook
 *
 * Single Responsibility: Manage question form state, validation, and submission
 *
 * @param {Object} options - Hook options
 * @param {Object} options.defaultValues - Default form values
 * @param {boolean} options.isEdit - Whether this is an edit form
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Object} Form hook object with methods and state
 */

const buildDefaultValues = (values) => {
  return {
    // Question Settings Fields (always displayed)
    type: values.type || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    class: values.class || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    gradeId: values.gradeId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    subjectId: values.subjectId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    unitId: values.unitId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    lessonId: values.lessonId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    formId: values.formId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,

    // Question Content Fields (displayed based on type)
    text: values.text || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
    imageUrl: values.imageUrl || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
    imageId: values.imageId || null,
    correctAnswer: deriveCorrectAnswer(values) || FORM_DEFAULTS.RADIO_DEFAULT_VALUE,

    // Multiple Choice Fields (displayed when type === 'MultipleChoice')
    choiceA: getChoiceValue(values, 'choiceA'),
    choiceB: getChoiceValue(values, 'choiceB'),
    choiceC: getChoiceValue(values, 'choiceC'),
    choiceD: getChoiceValue(values, 'choiceD'),
  };
};

// Wrapper function to filter question data and send as single question
const createQuestionWithFilter = async (data) => {
  const filteredData = filterQuestionData(data);
  return await createQuestions(filteredData);
};

const updateQuestionWithFilter = async (id, data) => {
  const filteredData = filterQuestionData(data);
  return await updateQuestion(id, filteredData);
};

export const useQuestionForm = ({
  defaultValues = {},
  isEdit = false,
  onSuccess,
  onError,
} = {}) => {
  const { formDefaultValues, handleSubmit, isLoading, isError, error } = useEntityForm({
    queryKey: QUERY_KEYS.QUESTION,
    additionalQueryKeys: [QUERY_KEYS.OVERVIEW_STATS],
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createQuestionWithFilter,
    updateFn: ({ id, data }) => updateQuestionWithFilter(id, data),
    buildDefaultValues,
    entityName: 'questions',
    getItemName: (data, variables) => {
      const question = variables.text || data.text || '';
      return question || 'Question';
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
