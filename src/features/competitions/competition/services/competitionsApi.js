/**
 * Competitions API Service
 *
 * Single Responsibility: Handle all API calls related to competition management
 */

// Import API client and endpoints
import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Fetch all competitions
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const fetchCompetitions = async (params = {}) => {
  return await apiClient.get(API_ENDPOINTS.COMPETITIONS.BASE, { params });
};

/**
 * Fetch a single competition by ID
 * @param {number|string} id - Competition ID
 * @returns {Promise} API response
 */
export const fetchCompetitionById = async (id) => {
  return await apiClient.get(API_ENDPOINTS.COMPETITIONS.BY_ID(id));
};

/**
 * Create a new competition
 * @param {Object} competitionData - Competition data
 * @returns {Promise} API response
 */
export const createCompetition = async (competitionData) => {
  return await apiClient.post(API_ENDPOINTS.COMPETITIONS.BASE, competitionData);
};

/**
 * Update an existing competition (full replacement)
 * @param {number|string} id - Competition ID
 * @param {Object} competitionData - Updated competition data (full resource)
 * @returns {Promise} API response
 */
export const updateCompetition = async (id, competitionData) => {
  return await apiClient.put(API_ENDPOINTS.COMPETITIONS.BY_ID(id), competitionData);
};

/**
 * Partially update an existing competition
 * @param {number|string} id - Competition ID
 * @param {Object} competitionData - Partial competition data to update
 * @returns {Promise} API response
 */
export const patchCompetition = async (id, competitionData) => {
  return await apiClient.patch(API_ENDPOINTS.COMPETITIONS.BY_ID(id), competitionData);
};

/**
 * Delete a competition (soft delete)
 * @param {number|string} id - Competition ID
 * @returns {Promise} API response
 */
export const deleteCompetition = async (id) => {
  return await apiClient.delete(API_ENDPOINTS.COMPETITIONS.BY_ID(id));
};
