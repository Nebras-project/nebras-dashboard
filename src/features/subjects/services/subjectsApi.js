/**
 * Subjects API Service
 *
 * Single Responsibility: Handle all API calls related to subject management
 */

// Import dummy data for fallback
import { dummySubjects } from '../data/dummySubjects';

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

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
 * Fetch all subjects for a curriculum
 * @param {number|string} curriculumId - Curriculum ID (required)
 * @param {Object} params - Additional query parameters
 * @returns {Promise} API response
 */
export const fetchSubjects = async (curriculumId, params = {}) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.SUBJECTS(curriculumId), { params });
  } catch (error) {
    return handleApiError(error, () => {
      return Promise.resolve(dummySubjects.filter((s) => s.curriculumId === Number(curriculumId)));
    });
  }
};

/**
 * Fetch a single subject by ID within a curriculum
 * @param {number|string} curriculumId - Curriculum ID
 * @param {number|string} subjectId - Subject ID
 * @returns {Promise} API response
 */
export const fetchSubjectById = async (curriculumId, subjectId) => {
  try {
    return await apiClient.get(API_ENDPOINTS.CURRICULUMS.SUBJECT(curriculumId, subjectId));
  } catch (error) {
    return handleApiError(error, () => {
      const subject = dummySubjects.find(
        (s) => s.id === Number(subjectId) && s.curriculumId === Number(curriculumId)
      );
      if (subject) {
        return Promise.resolve(subject);
      }
      throw new Error('Subject not found');
    });
  }
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
