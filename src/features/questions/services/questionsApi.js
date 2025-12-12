/**
 * Questions API Service
 *
 * Single Responsibility: Handle all API calls related to question management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';
import { filterQuestionData } from '../utils';

/**
 * FormData options for question create/update operations
 */
const QUESTION_FORM_DATA_OPTIONS = {
  fileFields: 'QuestionImage',
  excludeFields: [],
};

/**
 * Fetch all questions with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchQuestions = async (params = {}) => {
  const { queryString } = params;

  // Use queryString directly from useTable hook
  const url = queryString
    ? `${API_ENDPOINTS.QUESTIONS.BASE}?${queryString}`
    : API_ENDPOINTS.QUESTIONS.BASE;

  return await apiClient.get(url);
};

/**
 * Fetch a single question by ID
 * @param {number|string} id - Question ID
 * @returns {Promise} API response
 */
export const fetchQuestionById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.QUESTIONS.BY_ID(id));
};

/**
 * Create questions in a batch
 * All question creation operations use batch - even single questions are sent as arrays
 * Handles file uploads via FormData when images are present
 * @param {Array<Object>} questionsData - Array of question data objects (can be single item)
 * @returns {Promise} API response
 */
export const createQuestions = async (questionsData) => {
  // Ensure questionsData is always an array
  const questionsArray = Array.isArray(questionsData) ? questionsData : [questionsData];

  // Filter each question's data before processing
  const filteredQuestions = questionsArray.map((question) => filterQuestionData(question));

  // Check if any question has File objects for QuestionImage
  const hasFiles = filteredQuestions.some((question) => question.QuestionImage instanceof File);

  if (hasFiles) {
    // Use FormData for batch with files
    const formData = new FormData();

    filteredQuestions.forEach((question, index) => {
      // Use createFormData utility for each question to handle file logic
      const questionFormData = createFormData(question, QUESTION_FORM_DATA_OPTIONS);

      // Extract entries and append with indexed prefix for batch format
      questionFormData.forEach((value, key) => {
        formData.append(`questions[${index}][${key}]`, value);
      });

      // Handle QuestionImage that is a string URL (not a File) - createFormData skips it
      if (question.QuestionImage && !(question.QuestionImage instanceof File)) {
        formData.append(`questions[${index}][QuestionImage]`, String(question.QuestionImage));
      }
    });

    return await apiClient.post(API_ENDPOINTS.QUESTIONS.BASE, formData);
  } else {
    // No files, send as JSON array (data already filtered)
    return await apiClient.post(API_ENDPOINTS.QUESTIONS.BASE, filteredQuestions);
  }
};

/**
 * Update an existing question (full replacement)
 * @param {number|string} id - Question ID
 * @param {Object} questionData - Updated question data (full resource)
 * @returns {Promise} API response
 */
export const updateQuestion = async (id, questionData) => {
  const formData = createFormData(questionData, QUESTION_FORM_DATA_OPTIONS);
  return await apiClient.put(API_ENDPOINTS.QUESTIONS.BY_ID(id), formData);
};

/**
 * Partially update an existing question
 * @param {number|string} id - Question ID
 * @param {Object} questionData - Partial question data to update
 * @returns {Promise} API response
 */
export const patchQuestion = async (id, questionData) => {
  const formData = createFormData(questionData, QUESTION_FORM_DATA_OPTIONS);
  return await apiClient.patch(API_ENDPOINTS.QUESTIONS.BY_ID(id), formData);
};

/**
 * Delete a question (soft delete)
 * @param {number|string} id - Question ID
 * @returns {Promise} API response
 */
export const deleteQuestion = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.QUESTIONS.BY_ID(id));
};
