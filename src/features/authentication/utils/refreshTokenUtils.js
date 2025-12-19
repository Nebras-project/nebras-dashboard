/**
 * Refresh Token Utilities
 *
 * Shared utility functions for token refresh logic
 * Can be used by both React hooks and axios interceptors
 *
 * Note: Uses dynamic import to avoid circular dependency with axios.js
 */

import axios from 'axios';
import { API_URL, API_TIMEOUT } from '@config/env';
import { API_ENDPOINTS } from '@constants/apiEndpoints.js';
import { store } from '@store';
import { setAccessToken } from '@store/slices';

/**
 * Refresh access token and update Redux store
 * This is the core refresh logic used by both useRefreshToken hook and axios interceptor
 *
 * Uses a separate axios instance to avoid circular dependency with apiClient
 *
 * @returns {Promise<string>} The new access token
 * @throws {Error} If refresh fails
 */
export const refreshTokenAndUpdateStore = async () => {
  // Create a separate axios instance for refresh to avoid circular dependency
  // This instance doesn't have interceptors, so it won't trigger the 401 handler
  const refreshAxios = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
    withCredentials: true, // Include HttpOnly cookies
  });

  // Call refresh token endpoint
  const refreshResponse = await refreshAxios.post(API_ENDPOINTS.AUTH.REFRESH);

  // Extract new access token from response
  // Note: This response is NOT unwrapped (unlike apiClient which unwraps in interceptor)
  const newAccessToken =
    refreshResponse?.data?.accessToken || refreshResponse?.data?.data?.accessToken;

  if (!newAccessToken) {
    throw new Error('Token refresh failed: No access token received');
  }

  // Update Redux store with new access token
  store.dispatch(setAccessToken({ accessToken: newAccessToken }));

  return newAccessToken;
};
