/**
 * Get Competition Name
 *
 * Returns the competition name in the specified language
 *
 * @param {Object} competition - Competition object
 * @param {string} language - Language code ('ar' or 'en')
 * @returns {string} Competition name
 */
export const getCompetitionName = (competition, language = 'en') => {
  if (!competition) return 'N/A';

  if (language === 'ar') {
    return competition.nameAr || competition.name || 'N/A';
  }

  return competition.nameEn || competition.name || 'N/A';
};
