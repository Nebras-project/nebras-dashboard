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
    class: formData.class,
    gradeId: formData.gradeId,
    subjectId: formData.subjectId,
    unitId: formData.unitId,
    lessonId: formData.lessonId,
    formId: formData.formId || null,
  };
};

/**
 * Convert multiple choice data to choices array format
 * @param {Object} data - Form data with choiceA, choiceB, choiceC, choiceD, and correctAnswer
 * @returns {Array} Choices array with label, text, and isCorrect
 */
const convertMultipleChoiceToChoices = (data) => {
  const choices = [
    {
      label: 'A',
      text: data.choiceA || '',
      isCorrect: data.correctAnswer === 'choiceA',
    },
    {
      label: 'B',
      text: data.choiceB || '',
      isCorrect: data.correctAnswer === 'choiceB',
    },
    {
      label: 'C',
      text: data.choiceC || '',
      isCorrect: data.correctAnswer === 'choiceC',
    },
    {
      label: 'D',
      text: data.choiceD || '',
      isCorrect: data.correctAnswer === 'choiceD',
    },
  ];

  return choices;
};

/**
 * Convert true/false data to choices array format
 * @param {Object} data - Form data with correctAnswer ('True' or 'False')
 * @returns {Array} Choices array with label, text, and isCorrect
 */
const convertTrueFalseToChoices = (data) => {
  const isTrue = data.correctAnswer === 'True';
  return [
    {
      label: 'A',
      text: 'True',
      isCorrect: isTrue,
    },
    {
      label: 'B',
      text: 'False',
      isCorrect: !isTrue,
    },
  ];
};

/**
 * Filter question data based on type and class
 * Only includes relevant fields for the question type and class
 * Converts choices to the new array format for API
 *
 * @param {Object} data - Form data
 * @returns {Object} Filtered data with choices array
 */
export const filterQuestionData = (data) => {
  const type = data.type;
  const classValue = data.class;

  const filtered = {
    type: type,
    class: classValue,
    // Always include these fields
    text: data.text || '',
    gradeId: data.gradeId,
    subjectId: data.subjectId,
    unitId: data.unitId,
    lessonId: data.lessonId,
    imageId: data.imageId || null,
  };

  // Convert choices based on question type
  if (type === 'MultipleChoice') {
    filtered.choices = convertMultipleChoiceToChoices(data);
  } else if (type === 'TrueFalse') {
    filtered.choices = convertTrueFalseToChoices(data);
  }

  // Include year and formNumber only for ministerial questions
  if (classValue === 'Ministerial') {
    filtered.formId = data.formId || null;
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

  // Try from choices array (new format) by index
  if (values.choices && Array.isArray(values.choices)) {
    const choiceKeys = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
    const idx = choiceKeys.indexOf(choiceKey);
    const choice = values.choices[idx];
    if (choice) return choice.text || '';
  }

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
 * Derive correctAnswer value from choices array when not explicitly provided
 * @param {Object} values - Question values object
 * @returns {string|null} Correct answer value compatible with form radios
 */
export const deriveCorrectAnswer = (values) => {
  if (values.correctAnswer) return values.correctAnswer;

  if (values.choices && Array.isArray(values.choices)) {
    const correctIndex = values.choices.findIndex((choice) => choice?.isCorrect);
    if (correctIndex !== -1) {
      if (values.type === 'TrueFalse') {
        return values.choices[correctIndex]?.text || null;
      }
      const choiceKeys = ['choiceA', 'choiceB', 'choiceC', 'choiceD'];
      return choiceKeys[correctIndex] || null;
    }
  }

  return null;
};

/**
 * Get correct answer label for display
 *
 * @param {Object} question - Question object
 * @param {Function} t - Translation function
 * @returns {string} Formatted correct answer label
 */
export const getCorrectAnswerLabel = (question, t) => {
  const correctAnswer = question.correctAnswer;
  const type = question.type;

  if (!correctAnswer) return '-';

  if (type === 'MultipleChoice') {
    const choiceLabels = {
      choiceA: t('questions.choiceA'),
      choiceB: t('questions.choiceB'),
      choiceC: t('questions.choiceC'),
      choiceD: t('questions.choiceD'),
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
