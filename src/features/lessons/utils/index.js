/**
 * Get lesson name based on current language
 * @param {Object} lesson - Lesson object
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
 * @returns {Array} Array of options with value and label
 */
export const getLessonOptions = (lessons = []) => {
  return lessons?.map((lesson) => ({
    value: lesson.id,
    label: getLessonName(lesson),
  }));
};
