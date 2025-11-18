/**
 * Students API Service
 *
 * Single Responsibility: Handle all API calls related to student management
 */

// Import dummy data for fallback
import { dummyStudents } from '../data/dummyStudents';

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';

/**
 * FormData options for student create/update operations
 */
const STUDENT_FORM_DATA_OPTIONS = {
  fileFields: 'profileImage',
  excludeFields: ['confirmPassword'],
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
 * Fetch all students with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchStudents = async (params = {}) => {
  try {
    const { queryString } = params;

    // Use queryString directly from useTable hook
    const url = queryString
      ? `${API_ENDPOINTS.STUDENTS.BASE}?${queryString}`
      : API_ENDPOINTS.STUDENTS.BASE;

    return await apiClient.get(url);
  } catch (error) {
    return handleApiError(error, () => Promise.resolve(dummyStudents));
  }
};

/**
 * Fetch a single student by ID
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const fetchStudentById = async (id) => {
  try {
    return await apiClient.get(API_ENDPOINTS.STUDENTS.BY_ID(id));
  } catch (error) {
    return handleApiError(error, () => {
      const student = dummyStudents.find((s) => s.id === Number(id) || s.id === String(id));
      if (student) {
        return Promise.resolve(student);
      }
      throw new Error('Student not found');
    });
  }
};

/**
 * Create a new student
 * @param {Object} studentData - Student data
 * @returns {Promise} API response
 */
export const createStudent = async (studentData) => {
  const formData = createFormData(studentData, STUDENT_FORM_DATA_OPTIONS);
  return await apiClient.post(API_ENDPOINTS.STUDENTS.BASE, formData);
};

/**
 * Update an existing student
 * @param {number|string} id - Student ID
 * @param {Object} studentData - Updated student data
 * @returns {Promise} API response
 */
export const updateStudent = async (id, studentData) => {
  const formData = createFormData(studentData, STUDENT_FORM_DATA_OPTIONS);
  return await apiClient.put(API_ENDPOINTS.STUDENTS.BY_ID(id), formData);
};

/**
 * Delete a student (soft delete)
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const deleteStudent = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.STUDENTS.BY_ID(id));
};
