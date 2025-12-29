/**
 * Students API Service
 *
 * Single Responsibility: Handle all API calls related to student management
 */

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
 * Fetch all students with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchStudents = async (params = {}) => {
  const { queryString } = params;

  // Use queryString directly from useTable hook
  const url = queryString
    ? `${API_ENDPOINTS.STUDENTS.BASE}?${queryString}`
    : API_ENDPOINTS.STUDENTS.BASE;

  return await apiClient.get(url);
};

/**
 * Fetch a single student by ID
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const fetchStudentById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.STUDENTS.BY_ID(id));
};

/**
 * Create a new student
 * @param {Object} studentData - Student data
 * @returns {Promise} API response
 */
export const createStudent = async (studentData) => {
  return await apiClient.post(API_ENDPOINTS.STUDENTS.BASE, studentData);
};

/**
 * Update an existing student (full replacement)
 * @param {number|string} id - Student ID
 * @param {Object} studentData - Updated student data (full resource)
 * @returns {Promise} API response
 */
export const updateStudent = async (id, studentData) => {
  // Check if there's a file to upload
  const hasFile = studentData.profileImage instanceof File;
  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(studentData, STUDENT_FORM_DATA_OPTIONS);
    return await apiClient.put(API_ENDPOINTS.STUDENTS.BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Send as JSON when there's no file (remove confirmPassword)
    const { confirmPassword, ...dataWithoutConfirmPassword } = studentData;

    return await apiClient.put(API_ENDPOINTS.STUDENTS.BY_ID(id), dataWithoutConfirmPassword, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

/**
 * Partially update an existing student
 * @param {number|string} id - Student ID
 * @param {Object} studentData - Partial student data to update
 * @returns {Promise} API response
 */
export const patchStudent = async (id, studentData) => {
  // Check if there's a file to upload
  const hasFile = studentData.profileImage instanceof File;
  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(studentData, STUDENT_FORM_DATA_OPTIONS);
    return await apiClient.patch(API_ENDPOINTS.STUDENTS.BY_ID(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    // Send as JSON when there's no file (remove confirmPassword)
    const { confirmPassword, ...dataWithoutConfirmPassword } = studentData;

    return await apiClient.patch(API_ENDPOINTS.STUDENTS.BY_ID(id), dataWithoutConfirmPassword, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

/**
 * Delete a student (soft delete)
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const deleteStudent = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.STUDENTS.BY_ID(id));
};
