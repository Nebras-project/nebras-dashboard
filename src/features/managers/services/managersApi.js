/**
 * Managers API Service
 *
 * Single Responsibility: Handle all API calls related to manager management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

// Import utilities
import { createFormData } from '@utils';

/**
 * FormData options for manager create/update operations
 */
const MANAGER_FORM_DATA_OPTIONS = {
  fileFields: 'userProfile',
  excludeFields: ['confirmPassword'],
};

/**
 * Fetch all managers with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchManagers = async (params = {}) => {
  const { queryString } = params;

  // Use queryString directly from useTable hook
  const url = queryString
    ? `${API_ENDPOINTS.MANAGERS.BASE}?${queryString}`
    : API_ENDPOINTS.MANAGERS.BASE;

  return await apiClient.get(url);
};

/**
 * Fetch a single manager by ID
 * @param {number|string} id - Manager ID
 * @returns {Promise} API response
 */
export const fetchManagerById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.MANAGERS.BY_ID(id));
};

/**
 * Create a new manager
 * @param {Object} managerData - Manager data
 * @returns {Promise} API response
 */
export const createManager = async (managerData) => {
  console.log('managerData', managerData);
  // Check if there's a file to upload
  const hasFile = managerData.userProfile instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(managerData, MANAGER_FORM_DATA_OPTIONS);
    return await apiClient.post(API_ENDPOINTS.MANAGERS.BASE, formData);
  } else {
    // Send as JSON when there's no file (remove confirmPassword)
    const { confirmPassword, ...dataWithoutConfirmPassword } = managerData;
    return await apiClient.post(API_ENDPOINTS.MANAGERS.BASE, dataWithoutConfirmPassword);
  }
};

/**
 * Update an existing manager (full replacement)
 * @param {number|string} id - Manager ID
 * @param {Object} managerData - Updated manager data (full resource)
 * @returns {Promise} API response
 */
export const updateManager = async (id, managerData) => {
  // Check if there's a file to upload
  const hasFile = managerData.userProfile instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(managerData, MANAGER_FORM_DATA_OPTIONS);
    return await apiClient.put(API_ENDPOINTS.MANAGERS.BY_ID(id), formData);
  } else {
    // Send as JSON when there's no file (remove confirmPassword)
    const { confirmPassword, ...dataWithoutConfirmPassword } = managerData;
    return await apiClient.put(API_ENDPOINTS.MANAGERS.BY_ID(id), dataWithoutConfirmPassword);
  }
};

/**
 * Partially update an existing manager
 * @param {number|string} id - Manager ID
 * @param {Object} managerData - Partial manager data to update
 * @returns {Promise} API response
 */
export const patchManager = async (id, managerData) => {
  // Check if there's a file to upload
  const hasFile = managerData.userProfile instanceof File;

  if (hasFile) {
    // Use FormData when there's a file
    const formData = createFormData(managerData, MANAGER_FORM_DATA_OPTIONS);
    return await apiClient.patch(API_ENDPOINTS.MANAGERS.BY_ID(id), formData);
  } else {
    // Send as JSON when there's no file (remove confirmPassword)
    const { confirmPassword, ...dataWithoutConfirmPassword } = managerData;
    return await apiClient.patch(API_ENDPOINTS.MANAGERS.BY_ID(id), dataWithoutConfirmPassword);
  }
};

/**
 * Delete a manager (soft delete)
 * @param {number|string} id - Manager ID
 * @returns {Promise} API response
 */
export const deleteManager = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.MANAGERS.BY_ID(id));
};
