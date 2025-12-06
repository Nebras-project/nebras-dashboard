// external imports
import { useEntityForm } from '@components/forms/hooks';
import { QUERY_KEYS } from '@config';
import { FORM_DEFAULTS } from '@components/forms/constants';

// internal imports
import { filterQuestionData, getChoiceValue } from '../../utils';

// TODO: Import question API functions when available
// import { createQuestion, updateQuestion } from '../services/questionsApi';

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

    // Multiple Choice Fields (displayed when type === 'multipleChoice')
    choiceA: getChoiceValue(values, 'choiceA'),
    choiceB: getChoiceValue(values, 'choiceB'),
    choiceC: getChoiceValue(values, 'choiceC'),
    choiceD: getChoiceValue(values, 'choiceD'),
  };
};

// TODO: Replace with actual API functions
const createQuestion = async (data) => {
  const filteredData = filterQuestionData(data);
  console.log('Creating question:', filteredData);
  // return await questionsApi.create(filteredData);
  return { id: Date.now(), ...filteredData };
};

const updateQuestion = async (id, data) => {
  const filteredData = filterQuestionData(data);
  console.log('Updating question:', id, filteredData);
  // return await questionsApi.update(id, filteredData);
  return { id, ...filteredData };
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
    createFn: createQuestion,
    updateFn: ({ id, data }) => updateQuestion(id, data),
    buildDefaultValues,
    entityName: 'questions',
    getItemName: (data) => {
      const question = data.Question || data.question || data.questionAr || '';
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
