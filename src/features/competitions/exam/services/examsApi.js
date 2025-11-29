/**
 * Exams API Service
 *
 * Single Responsibility: Handle all API calls related to exam management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all exams for a competition
 * @param {number|string} competitionId - Competition ID
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const fetchExams = async (competitionId, params = {}) => {
  return await apiClient.get(API_ENDPOINTS.COMPETITIONS.EXAMS(competitionId), { params });
};

/**
 * Fetch a single exam by ID
 * @param {number|string} competitionId - Competition ID
 * @param {number|string} examId - Exam ID
 * @returns {Promise} API response
 */
export const fetchExamById = async (competitionId, examId) => {
  return await apiClient.get(API_ENDPOINTS.COMPETITIONS.EXAM_BY_ID(competitionId, examId));
};

/**
 * Create a new exam
 * @param {number|string} competitionId - Competition ID
 * @param {Object} examData - Exam data
 * @returns {Promise} API response
 */
export const createExam = async (competitionId, examData) => {
  return await apiClient.post(API_ENDPOINTS.COMPETITIONS.EXAMS(competitionId), examData);
};

/**
 * Update an existing exam (full replacement)
 * @param {number|string} competitionId - Competition ID
 * @param {number|string} examId - Exam ID
 * @param {Object} examData - Updated exam data (full resource)
 * @returns {Promise} API response
 */
export const updateExam = async (competitionId, examId, examData) => {
  return await apiClient.put(
    API_ENDPOINTS.COMPETITIONS.EXAM_BY_ID(competitionId, examId),
    examData
  );
};

/**
 * Partially update an existing exam
 * @param {number|string} competitionId - Competition ID
 * @param {number|string} examId - Exam ID
 * @param {Object} examData - Partial exam data to update
 * @returns {Promise} API response
 */
export const patchExam = async (competitionId, examId, examData) => {
  return await apiClient.patch(
    API_ENDPOINTS.COMPETITIONS.EXAM_BY_ID(competitionId, examId),
    examData
  );
};

/**
 * Delete an exam (soft delete)
 * @param {number|string} competitionId - Competition ID
 * @param {number|string} examId - Exam ID
 * @returns {Promise} API response
 */
export const deleteExam = async (competitionId, examId) => {
  return await apiClient.delete(API_ENDPOINTS.COMPETITIONS.EXAM_BY_ID(competitionId, examId));
};
