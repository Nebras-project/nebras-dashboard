/**
 * Subjects API Service
 *
 * Single Responsibility: Handle all API calls related to subject management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all subjects for a curriculum
 * @param {number|string} curriculumId - Curriculum ID (required)
 * @param {Object} params - Additional query parameters
 * @returns {Promise} API response
 */
export const fetchSubjects = async (curriculumId, params = {}) => {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.SUBJECTS(curriculumId), { params });
};

/**
 * Fetch a single subject by ID within a curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchSubjectById = async (curriculumId, subjectId) => {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.SUBJECT(curriculumId, subjectId));
};

/**
 * Fetch subjects by curriculum ID (alias for fetchSubjects)
 * @param {number|string} curriculumId - Curriculum ID
 * @returns {Promise} API response
 */
export const fetchSubjectsByCurriculumId = async (curriculumId) => {
  return fetchSubjects(curriculumId);
};

/**
 * Create a new subject within a curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {Object} subjectData - Subject data
 * @returns {Promise} API response
 */
export const createSubject = async (curriculumId, subjectData) => {
  return await apiClient.post(API_ENDPOINTS.CURRICULUMS.SUBJECTS(curriculumId), subjectData);
};

/**
 * Update an existing subject (full replacement)
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @param {Object} subjectData - Updated subject data (full resource)
 * @returns {Promise} API response
 */
export const updateSubject = async (curriculumId, subjectId, subjectData) => {
  return await apiClient.put(
    API_ENDPOINTS.CURRICULUMS.SUBJECT(curriculumId, subjectId),
    subjectData
  );
};

/**
 * Partially update an existing subject
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @param {Object} subjectData - Partial subject data to update
 * @returns {Promise} API response
 */
export const patchSubject = async (curriculumId, subjectId, subjectData) => {
  return await apiClient.patch(
    API_ENDPOINTS.CURRICULUMS.SUBJECT(curriculumId, subjectId),
    subjectData
  );
};

/**
 * Delete a subject (soft delete)
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const deleteSubject = async (curriculumId, subjectId) => {
  return await apiClient.delete(API_ENDPOINTS.CURRICULUMS.SUBJECT(curriculumId, subjectId));
};
