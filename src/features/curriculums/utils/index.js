/**
 * Curriculum Utilities
 */

// internal imports
import { resolveLanguage } from '@utils';

/**
 * Get curriculum name based on current language (supports bilingual)
 * @param {Object} curriculum - Curriculum object
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {string} Curriculum name in the current language
 */
export const getCurriculumName = (curriculum, currentLanguage = 'ar') => {
  if (!curriculum) return 'N/A';

  // Resolve language (handles legacy 'system' values)
  const resolvedLang = resolveLanguage(currentLanguage);

  // Get name based on resolved language
  if (resolvedLang === 'ar') {
    return curriculum.nameAr || curriculum.nameEn || curriculum.name || 'N/A';
  } else {
    return curriculum.nameEn || curriculum.nameAr || curriculum.name || 'N/A';
  }
};

/**
 * Get curriculum name in both languages
 * @param {Object} curriculum - Curriculum object
 * @returns {Object} Object with nameAr and nameEn
 */
export const getCurriculumNames = (curriculum) => {
  if (!curriculum) {
    return {
      nameAr: 'N/A',
      nameEn: 'N/A',
    };
  }

  return {
    nameAr: curriculum.nameAr || curriculum.name || 'N/A',
    nameEn: curriculum.nameEn || curriculum.name || 'N/A',
  };
};

/**
 * Build curriculum options for select input
 * @param {Array} curriculums - Array of curriculum objects
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {Array} Array of options with value and label
 */
export const getCurriculumOptions = (curriculums = [], currentLanguage = 'ar') => {
  return curriculums.map((curriculum) => ({
    value: curriculum.id,
    label: getCurriculumName(curriculum, currentLanguage),
  }));
};
