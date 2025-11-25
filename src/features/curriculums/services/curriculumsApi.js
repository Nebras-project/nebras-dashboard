/**
 * Curriculums API Service
 *
 * Single Responsibility: Handle all API calls related to curriculum management
 */

// Import dummy data for fallback
import { dummyCurriculums } from '../data/dummyCurriculums';

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';

/**
 * FormData options for curriculum create/update operations
 */
const CURRICULUM_FORM_DATA_OPTIONS = {
  fileFields: 'image',
  excludeFields: [],
};

/**
 * Helper function to handle API errors and fallback to dummy data
 * @param {Error} error - Error object
 * @param {Function} fallbackFn - Function to get fallback data
 * @returns {Promise} Fallback data or throws error
 */
const handleApiError = async (error, fallbackFn) => {
  // If it's a network error or API not available, use fallback
  if (
    error.message.includes('Network Error') ||
    error.message.includes('timeout') ||
    error.message.includes('ECONNREFUSED')
  ) {
    return fallbackFn();
  }
  throw error;
};

/**
 * Fetch all curriculums
 * @param {Object} _params - Query parameters (unused but kept for API consistency)
 * @returns {Promise} API response
 */
export const fetchCurriculums = async (_params = {}) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.BASE);
  } catch (error) {
    return handleApiError(error, () => Promise.resolve(dummyCurriculums));
  }
};

/**
 * Fetch a single curriculum by ID
 * @param {number|string} id - Curriculum ID
 * @returns {Promise} API response
 */
export const fetchCurriculumById = async (id) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.BY_ID(id));
  } catch (error) {
    return handleApiError(error, () => {
      const curriculum = dummyCurriculums.find((c) => c.id === Number(id) || c.id === String(id));
      if (curriculum) {
        return Promise.resolve(curriculum);
      }
      throw new Error('Curriculum not found');
    });
  }
};

/**
 * Create a new curriculum
 * @param {Object} curriculumData - Curriculum data
 * @returns {Promise} API response
 */
export const createCurriculum = async (curriculumData) => {
  const formData = createFormData(curriculumData, CURRICULUM_FORM_DATA_OPTIONS);
  return await apiClient.post(API_ENDPOINTS.CURRICULUMS.BASE, formData);
};

/**
 * Update an existing curriculum (full replacement)
 * @param {number|string} id - Curriculum ID
 * @param {Object} curriculumData - Updated curriculum data (full resource)
 * @returns {Promise} API response
 */
export const updateCurriculum = async (id, curriculumData) => {
  const formData = createFormData(curriculumData, CURRICULUM_FORM_DATA_OPTIONS);
  return await apiClient.put(API_ENDPOINTS.CURRICULUMS.BY_ID(id), formData);
};

/**
 * Partially update an existing curriculum
 * @param {number|string} id - Curriculum ID
 * @param {Object} curriculumData - Partial curriculum data to update
 * @returns {Promise} API response
 */
export const patchCurriculum = async (id, curriculumData) => {
  const formData = createFormData(curriculumData, CURRICULUM_FORM_DATA_OPTIONS);
  return await apiClient.patch(API_ENDPOINTS.CURRICULUMS.BY_ID(id), formData);
};

/**
 * Delete a curriculum (soft delete)
 * @param {number|string} id - Curriculum ID
 * @returns {Promise} API response
 */
export const deleteCurriculum = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.CURRICULUMS.BY_ID(id));
};
