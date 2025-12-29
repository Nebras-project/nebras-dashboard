/**
 * Grade Utilities
 */

export const getGradeName = (grade) => {
  return grade.name;
};

/**
 * Build grade options for select input
 * @param {Array} grades - Array of grade objects
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {Array} Array of options with value and label
 */
export const getGradeOptions = (grades = []) => {
  return grades.map((grade) => ({
    value: grade.id,
    label: grade.name,
  }));
};
