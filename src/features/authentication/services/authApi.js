/**
 * Authentication API
 *
 * API functions for authentication operations
 * These functions are designed to work with React Query
 */

import apiClient, { API_ENDPOINTS } from '@config/axios';

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data and access token
 */
export const login = async (credentials) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  return response;
};

/**
 * Logout current user
 * @returns {Promise<void>}
 */
export const logout = async () => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  return response;
};

/**
 * Refresh access token
 * @returns {Promise<Object>} New access token
 */
export const refreshAccessToken = async () => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
  return response;
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} Current user data
 */
export const getCurrentUser = async () => {
  const response = await apiClient.get(API_ENDPOINTS.AUTH.ME);
  return response;
};

/**
 * Verify email with verification code
 * @param {Object} data - Verification data
 * @param {string} data.email - User email
 * @param {string} data.code - Verification code
 * @returns {Promise<Object>} Verification result
 */
export const verifyEmail = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, data);
  return response;
};

/**
 * Send forgot password email
 * @param {Object} data - Email data
 * @param {string} data.email - User email
 * @returns {Promise<Object>} Response
 */
export const sendForgotPassword = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_FORGOT_PASSWORD, data);
  return response;
};

/**
 * Send password reset email
 * @param {Object} data - Reset data
 * @param {string} data.email - User email
 * @returns {Promise<Object>} Response
 */
export const sendPasswordReset = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.SEND_PASSWORD_RESET, data);
  return response;
};

/**
 * Reset password with token
 * @param {Object} data - Reset data
 * @param {string} data.token - Reset token
 * @param {string} data.password - New password
 * @returns {Promise<Object>} Response
 */
export const resetPassword = async (data) => {
  const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  return response;
};

// Export all as default object
export default {
  login,
  logout,
  refreshAccessToken,
  getCurrentUser,
  verifyEmail,
  sendForgotPassword,
  sendPasswordReset,
  resetPassword,
};
