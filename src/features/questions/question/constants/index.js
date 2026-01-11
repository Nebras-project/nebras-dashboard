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
  { value: 'MultipleChoice', label: t('questions.types.multiplechoice') },
  { value: 'TrueFalse', label: t('questions.types.truefalse') },
];

/**
 * Get predefined class options for question filters
 *
 * @param {Function} t - Translation function
 * @returns {Array} Array of class options with value and label
 */
export const getQuestionClassOptions = (t) => [
  { value: 'Ministerial', label: t('questions.classes.ministerial') },
  { value: 'Enrichment', label: t('questions.classes.enrichment') },
];

/**
 * Get question choices configuration for RadioTextInputGroup
 *
 * @param {Function} t - Translation function
 * @returns {Array} Array of choice objects with radioValue, label, textInputName, textInputLabel, and textInputRules
 */
export const getQuestionChoices = (t) => [
  {
    radioValue: 'choiceA',
    label: t('questions.choiceA'),
    textInputName: 'choiceA',
    textInputLabel: t('questions.choiceLabelA'),
    textInputRules: getTextRules(t, t('questions.choiceLabelA'), { required: true }),
  },
  {
    radioValue: 'choiceB',
    label: t('questions.choiceB'),
    textInputName: 'choiceB',
    textInputLabel: t('questions.choiceLabelB'),
    textInputRules: getTextRules(t, t('questions.choiceLabelB'), { required: true }),
  },
  {
    radioValue: 'choiceC',
    label: t('questions.choiceC'),
    textInputName: 'choiceC',
    textInputLabel: t('questions.choiceLabelC'),
    textInputRules: getTextRules(t, t('questions.choiceLabelC'), { required: true }),
  },
  {
    radioValue: 'choiceD',
    label: t('questions.choiceD'),
    textInputName: 'choiceD',
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
export const CHOICE_KEYS = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];

export const SETTINGS_FIELDS = [
  {
    key: 'gradeName',
    icon: 'school',
    label: 'questions.grade',
  },
  { key: 'subjectName', icon: 'book', label: 'questions.subject' },
  { key: 'unitName', icon: 'libraryBooks', label: 'questions.unit' },
  { key: 'lessonName', icon: 'autoStories', label: 'questions.lesson' },
];

export const MINISTERIAL_FIELDS = [
  { key: 'formYear', icon: 'numbers', label: 'questions.formYear' },
  { key: 'formNumber', icon: 'numbers', label: 'questions.formNumber' },
];
