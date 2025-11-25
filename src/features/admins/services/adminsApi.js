/**
 * Admins API Service
 *
 * Single Responsibility: Handle all API calls related to admin management
 */

// Import dummy data for fallback
import { dummyAdmins } from '../data/dummyAdmins';

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
 * Fetch all admins with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchAdmins = async (params = {}) => {
  try {
    const { queryString } = params;

    // Use queryString directly from useTable hook
    const url = queryString
      ? `${API_ENDPOINTS.ADMINS.BASE}?${queryString}`
      : API_ENDPOINTS.ADMINS.BASE;

    return await apiClient.get(url);
  } catch (error) {
    return handleApiError(error, () => Promise.resolve(dummyAdmins));
  }
};

/**
 * Fetch a single admin by ID
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const fetchAdminById = async (id) => {
  try {
    return await apiClient.get(API_ENDPOINTS.ADMINS.BY_ID(id));
  } catch (error) {
    return handleApiError(error, () => {
      const admin = dummyAdmins.find((a) => a.id === Number(id) || a.id === String(id));
      if (admin) {
        return Promise.resolve(admin);
      }
      throw new Error('Admin not found');
    });
  }
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
