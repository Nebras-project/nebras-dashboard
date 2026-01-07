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
  fileFields: 'questionImage',
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
 * Create a single question
 * Handles file uploads via FormData when image is present
 * @param {Object} questionData - Question data object
 * @returns {Promise} API response
 */
export const createQuestions = async (questionData) => {
  // Filter question data before processing
  const filteredQuestion = filterQuestionData(questionData);

  // Check if there's a file to upload
  const hasFile = filteredQuestion.questionImage instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(filteredQuestion, QUESTION_FORM_DATA_OPTIONS);
    return await apiClient.post(API_ENDPOINTS.QUESTIONS.BASE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Send as JSON when there's no file
    return await apiClient.post(API_ENDPOINTS.QUESTIONS.BASE, filteredQuestion, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

/**
 * Update an existing question (full replacement)
 * @param {number|string} id - Question ID
 * @param {Object} questionData - Updated question data (full resource)
 * @returns {Promise} API response
 */
export const updateQuestion = async (id, questionData) => {
  // Filter question data before processing
  const filteredQuestion = filterQuestionData(questionData);

  // Check if there's a file to upload
  const hasFile = filteredQuestion.questionImage instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(filteredQuestion, QUESTION_FORM_DATA_OPTIONS);
    return await apiClient.put(API_ENDPOINTS.QUESTIONS.BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Send as JSON when there's no file
    return await apiClient.put(API_ENDPOINTS.QUESTIONS.BY_ID(id), filteredQuestion, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

/**
 * Partially update an existing question
 * @param {number|string} id - Question ID
 * @param {Object} questionData - Partial question data to update
 * @returns {Promise} API response
 */
export const patchQuestion = async (id, questionData) => {
  // Filter question data before processing
  const filteredQuestion = filterQuestionData(questionData);

  // Check if there's a file to upload
  const hasFile = filteredQuestion.questionImage instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(filteredQuestion, QUESTION_FORM_DATA_OPTIONS);
    return await apiClient.patch(API_ENDPOINTS.QUESTIONS.BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Send as JSON when there's no file
    return await apiClient.patch(API_ENDPOINTS.QUESTIONS.BY_ID(id), filteredQuestion, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

/**
 * Delete a question (soft delete)
 * @param {number|string} id - Question ID
 * @returns {Promise} API response
 */
export const deleteQuestion = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.QUESTIONS.BY_ID(id));
};
