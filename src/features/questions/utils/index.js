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
    Type: formData.Type,
    Category: formData.Category,
    CurriculumId: formData.CurriculumId,
    SubjectId: formData.SubjectId,
    UnitId: formData.UnitId,
    LessonId: formData.LessonId,
    Year: formData.Year,
    FormNumber: formData.FormNumber,
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
  const type = data.Type;
  const category = data.Category;

  const filtered = {
    Type: type,
    Category: category,
    // Always include these fields
    Question: data.Question,
    CorrectAnswer: data.CorrectAnswer,
    CurriculumId: data.CurriculumId,
    SubjectId: data.SubjectId,
    UnitId: data.UnitId,
    LessonId: data.LessonId,
  };

  // Include image and choice fields only for multiple choice questions
  if (type === 'MultipleChoice') {
    filtered.QuestionImage = data.QuestionImage || null;
    filtered.ChoiceA = data.ChoiceA;
    filtered.ChoiceB = data.ChoiceB;
    filtered.ChoiceC = data.ChoiceC;
    filtered.ChoiceD = data.ChoiceD;
  }

  // Include year and formNumber only for ministerial questions
  if (category === 'Ministerial') {
    filtered.Year = data.Year || null;
    filtered.FormNumber = data.FormNumber || null;
  }

  return filtered;
};

/**
 * Helper to extract choice value from options array or direct field
 *
 * @param {Object} values - Question values object
 * @param {string} choiceKey - Choice key ('ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD')
 * @returns {string} Choice value
 */
export const getChoiceValue = (values, choiceKey) => {
  // Try direct field first (ChoiceA, ChoiceB, etc.)
  if (values[choiceKey]) return values[choiceKey];

  // Try from options array (if backend provides options array)
  if (values.options && Array.isArray(values.options)) {
    const choiceIndex =
      choiceKey === 'ChoiceA' ? 0 : choiceKey === 'ChoiceB' ? 1 : choiceKey === 'ChoiceC' ? 2 : 3;
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
  const correctAnswer = question.CorrectAnswer;
  const type = question.Type;

  if (!correctAnswer) return '-';

  if (type === 'MultipleChoice') {
    const choiceLabels = {
      ChoiceA: t('questions.choiceA'),
      ChoiceB: t('questions.choiceB'),
      ChoiceC: t('questions.choiceC'),
      ChoiceD: t('questions.choiceD'),
    };
    return choiceLabels[correctAnswer] || correctAnswer;
  }

  if (type === 'TrueFalse') {
    return correctAnswer === 'True' ? t('questions.true') : t('questions.false');
  }

  return correctAnswer;
};

// Question Columns Utils
export { default as createQuestionColumns } from './createQuestionColumns';

// Dummy Data
export { default as dummyQuestions } from './dummyQuestionsData';
