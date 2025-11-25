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
