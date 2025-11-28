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
export const fetchUnits = async (curriculumId, subjectId, params = {}) => {
  return await apiClient.get(API_ENDPOINTS.CURRICULUMS.UNITS(curriculumId, subjectId), {
    params,
  });
};

/**
 * Fetch a single unit by ID within a subject and curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @param {number|string} unitId - Unit ID
 * @returns {Promise} API response
 */
export const fetchUnitById = async (curriculumId, subjectId, unitId) => {
  return await apiClient.get(API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId));
};

/**
 * Fetch units by subject ID within a curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchUnitsBySubjectId = async (curriculumId, subjectId) => {
  return fetchUnits(curriculumId, subjectId);
};

/**
 * Create a new unit within a subject and curriculum
 */
export const createUnit = async (curriculumId, subjectId, data = {}) => {
  return await apiClient.post(API_ENDPOINTS.CURRICULUMS.UNITS(curriculumId, subjectId), data);
};

/**
 * Update an existing unit
 */
export const updateUnit = async (curriculumId, subjectId, unitId, data = {}) => {
  return await apiClient.put(API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId), data);
};

/**
 * Delete a unit
 */
export const deleteUnit = async (curriculumId, subjectId, unitId) => {
  return await apiClient.delete(API_ENDPOINTS.CURRICULUMS.UNIT(curriculumId, subjectId, unitId));
};
