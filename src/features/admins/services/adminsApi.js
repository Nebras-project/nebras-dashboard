/**
 * Admins API Service
 *
 * Single Responsibility: Handle all API calls related to admin management
 */

// TODO: Replace with actual API base URL from config
const API_BASE_URL = '/api/admins';

/**
 * Fetch all admins with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {Object} params.pagination - Pagination model
 * @param {Object} params.sort - Sort model
 * @param {Object} params.filter - Filter model
 * @returns {Promise} API response
 */
export const fetchAdmins = async (params = {}) => {
  const { pagination, sort, filter } = params;

  // Build query string
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
    throw new Error('Failed to fetch admins');
  }

  return response.json();
};

/**
 * Fetch a single admin by ID
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const fetchAdminById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch admin');
  }

  return response.json();
};

/**
 * Create a new admin
 * @param {Object} adminData - Admin data
 * @returns {Promise} API response
 */
export const createAdmin = async (adminData) => {
  // Create FormData if profileImage is a File
  const formData = new FormData();
  Object.keys(adminData).forEach((key) => {
    if (key === 'profileImage' && adminData[key] instanceof File) {
      formData.append(key, adminData[key]);
    } else if (key !== 'profileImage' && key !== 'confirmPassword') {
      formData.append(key, adminData[key]);
    }
  });

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create admin');
  }

  return response.json();
};

/**
 * Update an existing admin
 * @param {number|string} id - Admin ID
 * @param {Object} adminData - Updated admin data
 * @returns {Promise} API response
 */
export const updateAdmin = async (id, adminData) => {
  // Create FormData if profileImage is a File
  const formData = new FormData();
  Object.keys(adminData).forEach((key) => {
    if (key === 'profileImage' && adminData[key] instanceof File) {
      formData.append(key, adminData[key]);
    } else if (key !== 'profileImage' && key !== 'confirmPassword') {
      formData.append(key, adminData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update admin');
  }

  return response.json();
};

/**
 * Delete an admin (soft delete)
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const deleteAdmin = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete admin');
  }

  return response.json();
};

