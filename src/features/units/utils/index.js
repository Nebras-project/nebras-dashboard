/**
 * Unit Utilities
 */

// internal imports
import { resolveLanguage } from '@utils';

/**
 * Get unit name based on current language (supports bilingual)
 * @param {Object} unit - Unit object
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {string} Unit name in the current language
 */
export const getUnitName = (unit, currentLanguage = 'ar') => {
  if (!unit) return 'N/A';

  // Resolve language (handles legacy 'system' values)
  const resolvedLang = resolveLanguage(currentLanguage);

  // Get name based on resolved language
  if (resolvedLang === 'ar') {
    return unit.nameAr || unit.nameEn || unit.name || 'N/A';
  } else {
    return unit.nameEn || unit.nameAr || unit.name || 'N/A';
  }
};

/**
 * Get unit options for select input
 * Transforms an array of units into options format { value, label }
 *
 * @param {Array} units - Array of unit objects
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {Array} Array of options with value and label
 */
export const getUnitOptions = (units = [], currentLanguage = 'ar') => {
  return units.map((unit) => ({
    value: unit.id,
    label: getUnitName(unit, currentLanguage),
  }));
};
