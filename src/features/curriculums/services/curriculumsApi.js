/**
 * Curriculums API Service
 *
 * Single Responsibility: Handle all API calls related to curriculum management
 */

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
 * Fetch all curriculums
 * @param {Object} _params - Query parameters (unused but kept for API consistency)
 * @returns {Promise} API response
 */
export const fetchCurriculums = async (_params = {}) => {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.BASE);
};

/**
 * Fetch a single curriculum by ID
 * @param {number|string} id - Curriculum ID
 * @returns {Promise} API response
 */
export const fetchCurriculumById = async (id) => {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.BY_ID(id));
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
