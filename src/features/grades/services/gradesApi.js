/**
 * Grades API Service
 *
 * Single Responsibility: Handle all API calls related to grade management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all grades
 * @param {Object} _params - Query parameters (unused but kept for API consistency)
 * @returns {Promise} API response
 */
export const fetchGrades = async (_params = {}) => {
  const response = await apiClient.get(API_ENDPOINTS.GRADES.BASE);
  return response.data;
};

/**
 * Fetch a single grade by ID
 * @param {number|string} id - Grade ID
 * @returns {Promise} API response
 */
export const fetchGradeById = async (id) => {
  const response = await apiClient.get(API_ENDPOINTS.GRADES.BY_ID(id));
  return response;
};

/**
 * Create a new grade
 * @param {Object} gradeData - Grade data
 * @returns {Promise} API response
 */
export const createGrade = async (gradeData) => {
  const response = await apiClient.post(API_ENDPOINTS.GRADES.BASE, gradeData);
  return response.data;
};

/**
 * Update an existing grade (full replacement)
 * @param {number|string} id - Grade ID
 * @param {Object} gradeData - Updated grade data (full resource)
 * @returns {Promise} API response
 */
export const updateGrade = async (id, gradeData) => {
  const response = await apiClient.put(API_ENDPOINTS.GRADES.BY_ID(id), gradeData);
  return response.data;
};

/**
 * Partially update an existing grade
 * @param {number|string} id - Grade ID
 * @param {Object} gradeData - Partial grade data to update
 * @returns {Promise} API response
 */
export const patchGrade = async (id, gradeData) => {
  const response = await apiClient.patch(API_ENDPOINTS.GRADES.BY_ID(id), gradeData);
  return response.data;
};

/**
 * Delete a grade (soft delete)
 * @param {number|string} id - Grade ID
 * @returns {Promise} API response
 */
export const deleteGrade = async (id) => {
  const response = await apiClient.delete(API_ENDPOINTS.GRADES.BY_ID(id));
  return response.data;
};
