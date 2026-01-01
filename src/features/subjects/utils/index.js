/**
 * Subject Utilities
 */

// internal imports

/**
 * Get subject name based on current language (supports bilingual)
 * @param {Object} subject - Subject object
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {string} Subject name in the current language
 */
/**
 * Get subject options for select input
 * Transforms an array of subjects into options format { value, label }
 *
 * @param {Array} subjects - Array of subject objects
 * @param {string} currentLanguage - Current language ('ar' | 'en')
 * @returns {Array} Array of options with value and label
 */
export const getSubjectOptions = (subjects = []) => {
  return subjects.map((subject) => ({
    value: subject.id,
    label: subject.name,
  }));
};

export const getSubjectName = (subject) => {
    return subject.name
  
};
