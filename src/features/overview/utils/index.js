import { colors } from '@theme/colors';

// Maps fetched overview counts to the config counter keys
export const counterKeyToValue = (counts = {}) => ({
  admins: counts.adminsCount,
  managers: counts.managersCount,
  students: counts.studentsCount,
  grades: counts.gradesCount,
  forms: counts.formsCount,
  ministerialQuestions: counts.ministerialQuestionsCount,
  enrichmentQuestions: counts.enrichmentQuestionsCount,
  totalQuestions: counts.totalQuestionsCount,
  competitions: counts.competitionsCount,
});

// Returns pie chart options for question distribution
export const getQuestionPieOptions = (counts = {}, t) => {
  const label = (key) => (typeof t === 'function' ? t(key) : key);

  return [
    {
      id: 'ministerial',
      value: counts.ministerialQuestionsCount ?? 0,
      label: label('questions.totalMinisterialQuestions'),
      color: colors.teal.main,
    },
    {
      id: 'enrichment',
      value: counts.enrichmentQuestionsCount ?? 0,
      label: label('questions.totalEnrichmentQuestions'),
      color: colors.warning.main,
    },
  ];
};
export const getManagersPieOptions = (counts = {}, t) => {
  const label = (key) => (typeof t === 'function' ? t(key) : key);

  return [
    {
      id: 'gradeManager',
      value: counts.gradeManagersCount ?? 0,
      label: label('users.gradeManager'),
      color: colors.yellow.main,
    },
    {
      id: 'competitionManager',
      value: counts.competitionManagersCount ?? 0,
      label: label('users.competitionManager'),
      color: colors.indigo.main,
    },
    {
      id: 'contentManager',
      value: counts.contentManagersCount ?? 0,
      label: label('users.contentManager'),
      color: colors.gray.main,
    },
  ];
};

export const preparePieChartSchema = ({ titleKey = '', counts, optionFn, t }) => ({
  titleKey,
  data: optionFn ? optionFn(counts, t) : [],
});
