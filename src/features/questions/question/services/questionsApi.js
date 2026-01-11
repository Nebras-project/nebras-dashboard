/**
 * Questions API Service
 *
 * Single Responsibility: Handle all API calls related to question management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { filterQuestionData } from '../utils';

/**
 * Upload question image to separate endpoint
 * @param {File} imageFile - Image file to upload
 * @returns {Promise} API response with image ID
 */
export const uploadQuestionImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await apiClient.post(API_ENDPOINTS.QUESTIONS.UPLOAD_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // Extract image ID from response (adjust based on your API response structure)
  return response.id || response.data?.id || response.imageId || response.data?.imageId;
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
 * Images are uploaded separately via uploadQuestionImage endpoint
 * @param {Object} questionData - Question data object
 * @returns {Promise} API response
 */
export const createQuestions = async (questionData) => {
  // Send as JSON (images are uploaded separately via uploadQuestionImage)
  return await apiClient.post(API_ENDPOINTS.QUESTIONS.BASE, questionData);
};

/**
 * Update an existing question (full replacement)
 * @param {number|string} id - Question ID
 * @param {Object} questionData - Updated question data (full resource)
 * @returns {Promise} API response
 */
export const updateQuestion = async (id, questionData) => {
  // Send as JSON (images are uploaded separately via uploadQuestionImage)
  return await apiClient.put(API_ENDPOINTS.QUESTIONS.BY_ID(id), questionData);
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

  // Send as JSON (images are uploaded separately via uploadQuestionImage)
  return await apiClient.patch(API_ENDPOINTS.QUESTIONS.BY_ID(id), filteredQuestion);
};

/**
 * Delete a question (soft delete)
 * @param {number|string} id - Question ID
 * @returns {Promise} API response
 */
export const deleteQuestion = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.QUESTIONS.BY_ID(id));
};
