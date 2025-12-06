/**
 * Question Feature Utils
 *
 * Single Responsibility: Centralize all utility functions for questions feature
 */

/**
 * Check if form has any meaningful data
 */
export const hasFormData = (formData) => {
  return Object.keys(formData).some(
    (key) => formData[key] !== undefined && formData[key] !== null && formData[key] !== ''
  );
};

/**
 * Apply shared settings to form
 */
export const applySharedSettings = (form, sharedSettings) => {
  if (!form || !sharedSettings) return;

  Object.keys(sharedSettings).forEach((key) => {
    if (sharedSettings[key] !== undefined && sharedSettings[key] !== null) {
      form.setValue(key, sharedSettings[key]);
    }
  });
};

/**
 * Load question data into form
 */
export const loadQuestionIntoForm = (form, question) => {
  if (!form) return;

  form.reset();
  Object.keys(question).forEach((key) => {
    if (question[key] !== undefined && question[key] !== null && key !== 'id') {
      form.setValue(key, question[key]);
    }
  });
};

/**
 * Extract shared settings from form data
 */
export const extractSharedSettings = (formData) => {
  return {
    type: formData.type,
    category: formData.category,
    curriculumId: formData.curriculumId,
    subjectId: formData.subjectId,
    unitId: formData.unitId,
    lessonId: formData.lessonId,
    year: formData.year,
    formNumber: formData.formNumber,
  };
};

/**
 * Filter question data based on type and category
 * Only includes relevant fields for the question type and category
 *
 * @param {Object} data - Form data
 * @returns {Object} Filtered data
 */
export const filterQuestionData = (data) => {
  const { type, category, ...rest } = data;
  const filtered = {
    type,
    category,
    // Always include these fields
    question: rest.question,
    correctAnswer: rest.correctAnswer,
    curriculumId: rest.curriculumId,
    subjectId: rest.subjectId,
    unitId: rest.unitId,
    lessonId: rest.lessonId,
  };

  // Include image and choice fields only for multiple choice questions
  if (type === 'multipleChoice') {
    filtered.questionImage = rest.questionImage || null;
    filtered.choiceA = rest.choiceA;
    filtered.choiceB = rest.choiceB;
    filtered.choiceC = rest.choiceC;
    filtered.choiceD = rest.choiceD;
  }

  // Include year and formNumber only for ministerial questions
  if (category === 'ministerial') {
    filtered.year = rest.year || null;
    filtered.formNumber = rest.formNumber || null;
  }

  return filtered;
};

/**
 * Helper to extract choice value from options array or direct field
 *
 * @param {Object} values - Question values object
 * @param {string} choiceKey - Choice key ('choiceA', 'choiceB', 'choiceC', 'choiceD')
 * @returns {string} Choice value
 */
export const getChoiceValue = (values, choiceKey) => {
  // Try direct field first (choiceA, choiceB, etc.)
  if (values[choiceKey]) return values[choiceKey];

  // Try from options array (if backend provides options array)
  if (values.options && Array.isArray(values.options)) {
    const choiceIndex =
      choiceKey === 'choiceA' ? 0 : choiceKey === 'choiceB' ? 1 : choiceKey === 'choiceC' ? 2 : 3;
    const option = values.options[choiceIndex];
    if (option) {
      // Return text in current language or fallback
      return option.text || option.textAr || option.textEn || '';
    }
  }

  return '';
};

/**
 * Get correct answer label for display
 *
 * @param {Object} question - Question object
 * @param {Function} t - Translation function
 * @returns {string} Formatted correct answer label
 */
export const getCorrectAnswerLabel = (question, t) => {
  if (!question.correctAnswer) return '-';

  if (question.type === 'multipleChoice') {
    const choiceLabels = {
      choiceA: t('questions.choiceA'),
      choiceB: t('questions.choiceB'),
      choiceC: t('questions.choiceC'),
      choiceD: t('questions.choiceD'),
    };
    return choiceLabels[question.correctAnswer] || question.correctAnswer;
  }

  if (question.type === 'trueFalse') {
    return question.correctAnswer === 'true' ? t('questions.true') : t('questions.false');
  }

  return question.correctAnswer;
};

// Question Columns Utils
export { default as createQuestionColumns } from './createQuestionColumns';
