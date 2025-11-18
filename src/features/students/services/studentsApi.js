/**
 * Students API Service
 *
 * Single Responsibility: Handle all API calls related to student management
 */

// TODO: Replace with actual API base URL from config
const API_BASE_URL = '/api/students';

/**
 * Fetch all students with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {Object} params.pagination - Pagination model
 * @param {Object} params.sort - Sort model
 * @param {Object} params.filter - Filter model
 * @returns {Promise} API response
 */
export const fetchStudents = async (params = {}) => {
  const { pagination, sort, filter } = params;

  const queryParams = new URLSearchParams();

  if (pagination) {
    queryParams.append('page', pagination.page || 0);
    queryParams.append('pageSize', pagination.pageSize || 10);
  }

  if (sort && sort.length > 0) {
    queryParams.append('sortBy', sort[0].field);
    queryParams.append('sortOrder', sort[0].sort || 'asc');
  }

  if (filter && Object.keys(filter).length > 0) {
    queryParams.append('filter', JSON.stringify(filter));
  }

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }

  return response.json();
};

/**
 * Fetch a single student by ID
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const fetchStudentById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch student');
  }

  return response.json();
};

/**
 * Create a new student
 * @param {Object} studentData - Student data
 * @returns {Promise} API response
 */
export const createStudent = async (studentData) => {
  const formData = new FormData();

  Object.keys(studentData).forEach((key) => {
    if (key === 'profileImage' && studentData[key] instanceof File) {
      formData.append(key, studentData[key]);
    } else if (key !== 'profileImage' && key !== 'confirmPassword') {
      formData.append(key, studentData[key]);
    }
  });

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create student');
  }

  return response.json();
};

/**
 * Update an existing student
 * @param {number|string} id - Student ID
 * @param {Object} studentData - Updated student data
 * @returns {Promise} API response
 */
export const updateStudent = async (id, studentData) => {
  const formData = new FormData();

  Object.keys(studentData).forEach((key) => {
    if (key === 'profileImage' && studentData[key] instanceof File) {
      formData.append(key, studentData[key]);
    } else if (key !== 'profileImage' && key !== 'confirmPassword') {
      formData.append(key, studentData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update student');
  }

  return response.json();
};

/**
 * Delete a student (soft delete)
 * @param {number|string} id - Student ID
 * @returns {Promise} API response
 */
export const deleteStudent = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete student');
  }

  return response.json();
};
