/**
 * Forms API Service (النماذج الوزارية)
 *
 * Single Responsibility: Handle all API calls related to ministerial forms management
 *
 * Form Structure:
 * - formNumber: The ministerial form number
 * - year: The year of the form
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all forms with pagination, sorting, and filtering
 * @param {Object} params - Query parameters
 * @param {string} params.queryString - Query string from useTable hook (preferred)
 * @param {Object} params.pagination - Pagination model (deprecated, use queryString instead)
 * @param {Object} params.sort - Sort model (deprecated, use queryString instead)
 * @param {Object} params.filter - Filter model (deprecated, use queryString instead)
 * @returns {Promise} API response
 */
export const fetchForms = async (params = {}) => {
  const { queryString } = params;

  // Use queryString directly from useTable hook
  const url = queryString ? `${API_ENDPOINTS.FORMS.BASE}?${queryString}` : API_ENDPOINTS.FORMS.BASE;

  return await apiClient.get(url);
};

/**
 * Fetch a single form by ID
 * @param {number|string} id - Form ID
 * @returns {Promise} API response
 */
export const fetchFormById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.FORMS.BY_ID(id));
};

/**
 * Create a new form
 * @param {Object} formData - Form data containing formNumber and year
 * @param {string|number} formData.formNumber - The ministerial form number
 * @param {string|number} formData.year - The year of the form
 * @returns {Promise} API response
 */
export const createForm = async (formData) => {
  return await apiClient.post(API_ENDPOINTS.FORMS.BASE, formData);
};

/**
 * Update an existing form (full replacement)
 * @param {number|string} id - Form ID
 * @param {Object} formData - Updated form data (full resource)
 * @param {string|number} formData.formNumber - The ministerial form number
 * @param {string|number} formData.year - The year of the form
 * @returns {Promise} API response
 */
export const updateForm = async (id, formData) => {
  return await apiClient.put(API_ENDPOINTS.FORMS.BY_ID(id), formData);
};

/**
 * Partially update an existing form
 * @param {number|string} id - Form ID
 * @param {Object} formData - Partial form data to update
 * @returns {Promise} API response
 */
export const patchForm = async (id, formData) => {
  return await apiClient.patch(API_ENDPOINTS.FORMS.BY_ID(id), formData);
};

/**
 * Delete a form (soft delete)
 * @param {number|string} id - Form ID
 * @returns {Promise} API response
 */
export const deleteForm = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.FORMS.BY_ID(id));
};
