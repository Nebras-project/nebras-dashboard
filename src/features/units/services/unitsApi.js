/**
 * Units API Service
 *
 * Single Responsibility: Handle all API calls related to unit management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all units for a subject within a curriculum
 * @param {number|string} curriculumId - Curriculum ID (required)
 * @param {number|string} subjectId - Subject ID (required)
 * @param {Object} params - Additional query parameters
 * @returns {Promise} API response
 */
export const fetchUnits = async (gradeId, subjectId, params = {}) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.UNITS(gradeId, subjectId), {
    params,
  });
};

/**
 * Fetch a single unit by ID within a subject and grade
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @param {number|string} unitId - Unit ID
 * @returns {Promise} API response
 */
export const fetchUnitById = async (gradeId, subjectId, unitId) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.UNIT(gradeId, subjectId, unitId));
};

/**
 * Fetch units by subject ID within a grade
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchUnitsBySubjectId = async (gradeId, subjectId) => {
  return fetchUnits(gradeId, subjectId);
};

/**
 * Create a new unit within a subject and grade
 */
export const createUnit = async (gradeId, subjectId, data = {}) => {
  return await apiClient.post(API_ENDPOINTS.GRADES.UNITS(gradeId, subjectId), data);
};

/**
 * Update an existing unit
 */
export const updateUnit = async (gradeId, subjectId, unitId, data = {}) => {
  return await apiClient.put(API_ENDPOINTS.GRADES.UNIT(gradeId, subjectId, unitId), data);
};

/**
 * Delete a unit
 */
export const deleteUnit = async (gradeId, subjectId, unitId) => {
  return await apiClient.delete(API_ENDPOINTS.GRADES.UNIT(gradeId, subjectId, unitId));
};
