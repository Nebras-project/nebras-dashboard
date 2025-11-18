/**
 * Admins API Service
 *
 * Single Responsibility: Handle all API calls related to admin management
 */

// Import dummy data for fallback
import { dummyAdmins } from '../data/dummyAdmins';

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
 * Fetch all admins with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {Object} params.pagination - Pagination model
 * @param {Object} params.sort - Sort model
 * @param {Object} params.filter - Filter model
 * @returns {Promise} API response
 */
export const fetchAdmins = async (params = {}) => {
  try {
    const { pagination, sort, filter } = params;

    // Build query parameters
    const queryParams = {};

    if (pagination) {
      queryParams.page = pagination.page || 0;
      queryParams.pageSize = pagination.pageSize || 10;
    }

    if (sort && sort.length > 0) {
      queryParams.sortBy = sort[0].field;
      queryParams.sortOrder = sort[0].sort || 'asc';
    }

    if (filter && Object.keys(filter).length > 0) {
      queryParams.filter = JSON.stringify(filter);
    }

    return await apiClient.get(API_ENDPOINTS.ADMINS.BASE, { params: queryParams });
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
  // Create FormData if profileImage is a File
  const formData = new FormData();
  Object.keys(adminData).forEach((key) => {
    if (key === 'profileImage' && adminData[key] instanceof File) {
      formData.append(key, adminData[key]);
    } else if (key !== 'profileImage' && key !== 'confirmPassword') {
      formData.append(key, adminData[key]);
    }
  });

  return await apiClient.post(API_ENDPOINTS.ADMINS.BASE, formData);
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

  return await apiClient.put(API_ENDPOINTS.ADMINS.BY_ID(id), formData);
};

/**
 * Delete an admin (soft delete)
 * @param {number|string} id - Admin ID
 * @returns {Promise} API response
 */
export const deleteAdmin = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.ADMINS.BY_ID(id));
};
