/**
 * Get lesson name based on current language
 * @param {Object} lesson - Lesson object
 * @param {string} currentLanguage - Current language ('ar' or 'en')
 * @returns {string} Lesson name
 */
export const getLessonName = (lesson, currentLanguage) => {
  if (currentLanguage === 'ar') {
    return lesson.nameAr || lesson.nameEn || lesson.name || 'N/A';
  }
  return lesson.nameEn || lesson.nameAr || lesson.name || 'N/A';
};
