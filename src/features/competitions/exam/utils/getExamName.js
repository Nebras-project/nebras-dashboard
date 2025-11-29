/**
 * Get Exam Name
 *
 * Returns the exam name in the specified language
 *
 * @param {Object} exam - Exam object
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {string} Exam name
 */
export const getExamName = (exam, language = 'en') => {
  if (!exam) return 'N/A';

  if (language === 'ar') {
    return exam.nameAr || exam.name || 'N/A';
  }

  return exam.nameEn || exam.name || 'N/A';
};
