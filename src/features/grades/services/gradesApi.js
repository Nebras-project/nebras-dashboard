/**
 * Grades API Service
 *
 * Single Responsibility: Handle all API calls related to grade management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';

/**
 * FormData options for grade create/update operations
 */
const GRADE_FORM_DATA_OPTIONS = {
  fileFields: 'image',
  excludeFields: [],
};

/**
 * Fetch all grades
 * @param {Object} _params - Query parameters (unused but kept for API consistency)
 * @returns {Promise} API response
 */
export const fetchGrades = async (_params = {}) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.BASE);
};

/**
 * Fetch a single grade by ID
 * @param {number|string} id - Grade ID
 * @returns {Promise} API response
 */
export const fetchGradeById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.BY_ID(id));
};

/**
 * Create a new grade
 * @param {Object} gradeData - Grade data
 * @returns {Promise} API response
 */
export const createGrade = async (gradeData) => {
  const formData = createFormData(gradeData, GRADE_FORM_DATA_OPTIONS);
  return await apiClient.post(API_ENDPOINTS.GRADES.BASE, formData);
};

/**
 * Update an existing grade (full replacement)
 * @param {number|string} id - Grade ID
 * @param {Object} gradeData - Updated grade data (full resource)
 * @returns {Promise} API response
 */
export const updateGrade = async (id, gradeData) => {
  const formData = createFormData(gradeData, GRADE_FORM_DATA_OPTIONS);
  return await apiClient.put(API_ENDPOINTS.GRADES.BY_ID(id), formData);
};

/**
 * Partially update an existing grade
 * @param {number|string} id - Grade ID
 * @param {Object} gradeData - Partial grade data to update
 * @returns {Promise} API response
 */
export const patchGrade = async (id, gradeData) => {
  const formData = createFormData(gradeData, GRADE_FORM_DATA_OPTIONS);
  return await apiClient.patch(API_ENDPOINTS.GRADES.BY_ID(id), formData);
};

/**
 * Delete a grade (soft delete)
 * @param {number|string} id - Grade ID
 * @returns {Promise} API response
 */
export const deleteGrade = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.GRADES.BY_ID(id));
};
