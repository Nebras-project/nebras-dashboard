/**
 * Get lesson name based on current language
 * @param {Object} lesson - Lesson object
 * @param {string} currentLanguage - Current language ('ar' or 'en')
 * @returns {string} Lesson name
 */
export const getLessonName = (lesson) => {
  return lesson.name;
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
