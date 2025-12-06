/**
 * Get lesson name based on current language
 * @param {Object} lesson - Lesson object
 * @param {string} currentLanguage - Current language ('ar' or 'en')
 * @returns {string} Lesson name
 */
export const getLessonName = (lesson, currentLanguage) => {
  if (!lesson) return 'N/A';

  if (currentLanguage === 'ar') {
    return lesson.nameAr || lesson.nameEn || lesson.name || 'N/A';
  }
  return lesson.nameEn || lesson.nameAr || lesson.name || 'N/A';
};

/**
 * Get lesson options for select input
 * Transforms an array of lessons into options format { value, label }
 *
 * @param {Array} lessons - Array of lesson objects
 * @param {string} currentLanguage - Current language ('ar' | 'en'), defaults to 'ar'
 * @returns {Array} Array of options with value and label
 */
export const getLessonOptions = (lessons = [], currentLanguage = 'ar') => {
  return lessons.map((lesson) => ({
    value: lesson.id,
    label: getLessonName(lesson, currentLanguage),
  }));
};
