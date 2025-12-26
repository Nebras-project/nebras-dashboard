/**
 * Grade Utilities
 */

// internal imports
import { resolveLanguage } from '@utils';

/**
 * Get grade name based on current language (supports bilingual)
 * @param {Object} grade - Grade object
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {string} Grade name in the current language
 */
export const getGradeName = (grade, currentLanguage = 'ar') => {
  if (!grade) return 'N/A';

  // Resolve language (handles legacy 'system' values)
  const resolvedLang = resolveLanguage(currentLanguage);

  // Get name based on resolved language
  if (resolvedLang === 'ar') {
    return grade.nameAr || grade.nameEn || grade.name || 'N/A';
  } else {
    return grade.nameEn || grade.nameAr || grade.name || 'N/A';
  }
};

/**
 * Get grade name in both languages
 * @param {Object} grade - Grade object
 * @returns {Object} Object with nameAr and nameEn
 */
export const getGradeNames = (grade) => {
  if (!grade) {
    return {
      nameAr: 'N/A',
      nameEn: 'N/A',
    };
  }

  return {
    nameAr: grade.nameAr || grade.name || 'N/A',
    nameEn: grade.nameEn || grade.name || 'N/A',
  };
};

/**
 * Build grade options for select input
 * @param {Array} grades - Array of grade objects
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {Array} Array of options with value and label
 */
export const getGradeOptions = (grades = [], currentLanguage = 'ar') => {
  return grades.map((grade) => ({
    value: grade.id,
    label: getGradeName(grade, currentLanguage),
  }));
};
