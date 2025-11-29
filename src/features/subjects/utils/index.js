/**
 * Subject Utilities
 */

// internal imports
import { resolveLanguage } from '@utils';

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
export const getSubjectOptions = (subjects = [], currentLanguage = 'ar') => {
  return subjects.map((subject) => ({
    value: subject.id,
    label: getSubjectName(subject, currentLanguage),
  }));
};

export const getSubjectName = (subject, currentLanguage = 'ar') => {
  if (!subject) return 'N/A';

  // Resolve language (handles legacy 'system' values)
  const resolvedLang = resolveLanguage(currentLanguage);

  // Get name based on resolved language
  if (resolvedLang === 'ar') {
    return subject.nameAr || subject.nameEn || subject.name || 'N/A';
  } else {
    return subject.nameEn || subject.nameAr || subject.name || 'N/A';
  }
};
