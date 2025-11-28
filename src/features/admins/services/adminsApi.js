/**
 * Admins API Service
 *
 * Single Responsibility: Handle all API calls related to admin management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';

/**
 * FormData options for admin create/update operations
 */
const ADMIN_FORM_DATA_OPTIONS = {
  fileFields: 'profileImage',
  excludeFields: ['confirmPassword'],
};

/**
 * Fetch all admins with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchAdmins = async (params = {}) => {
  const { queryString } = params;

  // Use queryString directly from useTable hook
  const url = queryString
    ? `${API_ENDPOINTS.ADMINS.BASE}?${queryString}`
    : API_ENDPOINTS.ADMINS.BASE;

  return await apiClient.get(url);
};

/**
 * Fetch a single admin by ID
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const fetchAdminById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.ADMINS.BY_ID(id));
};

/**
 * Create a new admin
 * @param {Object} adminData - Admin data
 * @returns {Promise} API response
 */
export const createAdmin = async (adminData) => {
  const formData = createFormData(adminData, ADMIN_FORM_DATA_OPTIONS);
  return await apiClient.post(API_ENDPOINTS.ADMINS.BASE, formData);
};

/**
 * Update an existing admin (full replacement)
 * @param {number|string} id - Admin ID
 * @param {Object} adminData - Updated admin data (full resource)
 * @returns {Promise} API response
 */
export const updateAdmin = async (id, adminData) => {
  const formData = createFormData(adminData, ADMIN_FORM_DATA_OPTIONS);
  return await apiClient.put(API_ENDPOINTS.ADMINS.BY_ID(id), formData);
};

/**
 * Partially update an existing admin
 * @param {number|string} id - Admin ID
 * @param {Object} adminData - Partial admin data to update
 * @returns {Promise} API response
 */
export const patchAdmin = async (id, adminData) => {
  const formData = createFormData(adminData, ADMIN_FORM_DATA_OPTIONS);
  return await apiClient.patch(API_ENDPOINTS.ADMINS.BY_ID(id), formData);
};

/**
 * Delete an admin (soft delete)
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const deleteAdmin = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.ADMINS.BY_ID(id));
};
