// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';
import { FORM_DEFAULTS } from '@components/forms/constants';

// internal imports
import { filterQuestionData, getChoiceValue } from '../../utils';
import { createQuestions, updateQuestion } from '../../services/questionsApi';

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
    category: values.category || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    curriculumId: values.curriculumId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    subjectId: values.subjectId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    unitId: values.unitId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    lessonId: values.lessonId || FORM_DEFAULTS.SELECT_DEFAULT_VALUE,
    year: values.year || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
    formNumber: values.formNumber || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,

    // Question Content Fields (displayed based on type)
    question: values.question || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
    questionImage: values.questionImage || FORM_DEFAULTS.TEXT_INPUT_DEFAULT_VALUE,
    correctAnswer: values.correctAnswer || FORM_DEFAULTS.RADIO_DEFAULT_VALUE,

    // Multiple Choice Fields (displayed when type === 'MultipleChoice')
    choiceA: getChoiceValue(values, 'choiceA'),
    choiceB: getChoiceValue(values, 'choiceB'),
    choiceC: getChoiceValue(values, 'choiceC'),
    choiceD: getChoiceValue(values, 'choiceD'),
  };
};

// Wrapper function to filter question data and send as batch (even for single question)
const createQuestionWithFilter = async (data) => {
  const filteredData = filterQuestionData(data);
  // All question creation uses batch - send single question as array
  return await createQuestions([filteredData]);
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
    queryKey: QUERY_KEYS.QUESTIONS || 'questions', // TODO: Add to QUERY_KEYS
    defaultValues,
    isEdit,
    onSuccess,
    onError,
    createFn: createQuestionWithFilter,
    updateFn: ({ id, data }) => updateQuestionWithFilter(id, data),
    buildDefaultValues,
    entityName: 'questions',
    getItemName: (data) => {
      const question = data.question || '';
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
