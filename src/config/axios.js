/**
 * Axios Configuration
 *
 * Single Responsibility: Centralized axios instance with interceptors
 */

import axios from 'axios';
import { API_URL, API_TIMEOUT } from './env.js';
import { API_ENDPOINTS } from '@constants/apiEndpoints.js';
import { NAVIGATION_PATHS } from '@constants/navigationPaths.js';
import { HTTP_STATUS } from '@constants/errors.js';
import { store } from '@store';
// Use dynamic import to break circular dependency
// refreshTokenUtils uses a separate axios instance, so no circular dependency
import { refreshTokenAndUpdateStore } from '@features/authentication/utils/refreshTokenUtils';

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Modify requests before they are sent
 * Adds accessToken and Accept-Language headers
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get current state from Redux store
    const state = store.getState();
    const accessToken = state.auth?.accessToken;
    const currentLanguage = state.language?.currentLanguage || 'ar';

    // Add Authorization header if accessToken exists
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Add Accept-Language header
    config.headers['Accept-Language'] = currentLanguage;

    // Handle FormData - remove Content-Type header to let browser set it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle errors globally
 * Note: HttpOnly cookies are automatically managed by the browser
 */
apiClient.interceptors.response.use(
  (response) => {
    // Return data directly (axios wraps it in data property)
    return response.data;
  },
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;

    // Handle 403 Forbidden - redirect to Access Denied page
    if (status === HTTP_STATUS.FORBIDDEN) {
      // Optionally we could clear some sensitive state here if needed
      window.location.href = NAVIGATION_PATHS.ACCESS_DENIED;
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized - Try to refresh token
    if (status === HTTP_STATUS.UNAUTHORIZED && originalRequest && !originalRequest._retry) {
      // Prevent infinite loop - don't retry if already retried or if it's a login/refresh request
      const isAuthRequest =
        originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGIN) ||
        originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH) ||
        originalRequest?.url?.includes(API_ENDPOINTS.AUTH.LOGOUT);

      if (!isAuthRequest) {
        originalRequest._retry = true;

        try {
          // Use refreshTokenAndUpdateStore (same logic as useRefreshToken hook)
          // The isAuthRequest check above prevents this refresh call from triggering another retry
          const newAccessToken = await refreshTokenAndUpdateStore();

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Retry the original request
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear user data
          const { clearUserData } = await import('@store/slices');
          store.dispatch(clearUserData());

          // Redirect to login
          window.location.href = NAVIGATION_PATHS.LOGIN;
          return Promise.reject(
            refreshError?.response?.data?.message ||
              refreshError?.message ||
              'Session expired. Please login again.'
          );
        }
      }
    }

    // Reject the promise so React Query can handle other errors
    return Promise.reject(error);
  }
);

// Export apiClient as default and API_ENDPOINTS as named export
export default apiClient;
export { API_ENDPOINTS };
