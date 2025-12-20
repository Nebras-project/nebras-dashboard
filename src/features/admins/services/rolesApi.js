/**
 * Roles API Service
 *
 * Single Responsibility: Handle all API calls related to roles management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all roles as an array
 * @returns {Promise<Array>} API response - array of roles
 */
export const fetchRoles = async () => {
  const response = await apiClient.get(API_ENDPOINTS.ROLES.BASE);
  // Ensure we return an array
  return response.roles || [];
};
