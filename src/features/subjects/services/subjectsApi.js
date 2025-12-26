/**
 * Subjects API Service
 *
 * Single Responsibility: Handle all API calls related to subject management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all subjects for a grade
 * @param {number|string} gradeId - Grade ID (required)
 * @param {Object} params - Additional query parameters
 * @returns {Promise} API response
 */
export const fetchSubjects = async (gradeId, params = {}) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.SUBJECTS(gradeId), { params });
};

/**
 * Fetch a single subject by ID within a grade
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchSubjectById = async (gradeId, subjectId) => {
  return await apiClient.get(API_ENDPOINTS.GRADES.SUBJECT(gradeId, subjectId));
};

/**
 * Fetch subjects by grade ID (alias for fetchSubjects)
 * @param {number|string} gradeId - Grade ID
 * @returns {Promise} API response
 */
export const fetchSubjectsByGradeId = async (gradeId) => {
  return fetchSubjects(gradeId);
};

/**
 * Create a new subject within a grade
 * @param {number|string} gradeId - Grade ID
 * @param {Object} subjectData - Subject data
 * @returns {Promise} API response
 */
export const createSubject = async (gradeId, subjectData) => {
  return await apiClient.post(API_ENDPOINTS.GRADES.SUBJECTS(gradeId), subjectData);
};

/**
 * Update an existing subject (full replacement)
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @param {Object} subjectData - Updated subject data (full resource)
 * @returns {Promise} API response
 */
export const updateSubject = async (gradeId, subjectId, subjectData) => {
  return await apiClient.put(API_ENDPOINTS.GRADES.SUBJECT(gradeId, subjectId), subjectData);
};

/**
 * Partially update an existing subject
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @param {Object} subjectData - Partial subject data to update
 * @returns {Promise} API response
 */
export const patchSubject = async (gradeId, subjectId, subjectData) => {
  return await apiClient.patch(API_ENDPOINTS.GRADES.SUBJECT(gradeId, subjectId), subjectData);
};

/**
 * Delete a subject (soft delete)
 * @param {number|string} gradeId - Grade ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const deleteSubject = async (gradeId, subjectId) => {
  return await apiClient.delete(API_ENDPOINTS.GRADES.SUBJECT(gradeId, subjectId));
};
