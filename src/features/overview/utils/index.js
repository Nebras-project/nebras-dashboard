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
