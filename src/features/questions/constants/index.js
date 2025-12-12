import { borderColors } from '@theme/colors';
import { padding } from '@constants';

/**
 * Question Feature Constants
 *
 * Single Responsibility: Centralize all constants for questions feature
 */

// internal imports
import { getTextRules } from '@components/forms/constants';

// Layout Constants
export const QUESTION_DIALOG_WIDTH = 780;

export const QUESTION_FORM_CARD_STYLES = (mode) => ({
  bgcolor: 'background.paper',
  border: `1px solid ${borderColors[mode]}`,
  ...padding.all.md,
});
/**
 * Get predefined type options for question filters
 *
 * @param {Function} t - Translation function
 * @returns {Array} Array of type options with value and label
 */
export const getQuestionTypeOptions = (t) => [
  { value: 'MultipleChoice', label: t('questions.types.multipleChoice') },
  { value: 'TrueFalse', label: t('questions.types.trueFalse') },
];

/**
 * Get predefined category options for question filters
 *
 * @param {Function} t - Translation function
 * @returns {Array} Array of category options with value and label
 */
export const getQuestionCategoryOptions = (t) => [
  { value: 'Ministerial', label: t('questions.categories.ministerial') },
  { value: 'Enrichment', label: t('questions.categories.enrichment') },
];

/**
 * Get question choices configuration for RadioTextInputGroup
 *
 * @param {Function} t - Translation function
 * @returns {Array} Array of choice objects with radioValue, label, textInputName, textInputLabel, and textInputRules
 */
export const getQuestionChoices = (t) => [
  {
    radioValue: 'ChoiceA',
    label: t('questions.choiceA'),
    textInputName: 'ChoiceA',
    textInputLabel: t('questions.choiceLabelA'),
    textInputRules: getTextRules(t, t('questions.choiceLabelA'), { required: true }),
  },
  {
    radioValue: 'ChoiceB',
    label: t('questions.choiceB'),
    textInputName: 'ChoiceB',
    textInputLabel: t('questions.choiceLabelB'),
    textInputRules: getTextRules(t, t('questions.choiceLabelB'), { required: true }),
  },
  {
    radioValue: 'ChoiceC',
    label: t('questions.choiceC'),
    textInputName: 'ChoiceC',
    textInputLabel: t('questions.choiceLabelC'),
    textInputRules: getTextRules(t, t('questions.choiceLabelC'), { required: true }),
  },
  {
    radioValue: 'ChoiceD',
    label: t('questions.choiceD'),
    textInputName: 'ChoiceD',
    textInputLabel: t('questions.choiceLabelD'),
    textInputRules: getTextRules(t, t('questions.choiceLabelD'), { required: true }),
  },
];

// True/False options
export const getTrueFalseOptions = (t) => [
  { value: 'True', label: t('questions.true') },
  { value: 'False', label: t('questions.false') },
];

// Question Card Constants
export const CHOICE_KEYS = ['ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD'];

export const SETTINGS_FIELDS = [
  {
    key: 'CurriculumId',
    icon: 'school',
    label: 'questions.curriculum',
  },
  { key: 'SubjectId', icon: 'book', label: 'questions.subject' },
  { key: 'UnitId', icon: 'libraryBooks', label: 'questions.unit' },
  { key: 'LessonId', icon: 'autoStories', label: 'questions.lesson' },
];

export const MINISTERIAL_FIELDS = [
  { key: 'Year', icon: 'calendarToday', label: 'questions.year' },
  { key: 'FormNumber', icon: 'numbers', label: 'questions.formNumber' },
];
