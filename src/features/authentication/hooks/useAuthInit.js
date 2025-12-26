/**
 * useAuthInit Hook
 *
 * Custom hook for initializing authentication state on app load
 * Fetches current user data to restore auth state after page reload
 */

import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';
import { getCurrentUser } from '../services/authApi';
import { QUERY_KEYS } from '@config/queryClient';
import { toCamelCase } from '@utils/caseUtils';

/**
 * Hook for initializing authentication state
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether to enable initialization (default: true)
 * @returns {Object} Initialization state
 */
export const useAuthInit = (options = {}) => {
  const { enabled = true } = options;
  const { setUserData, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { refreshTokenAsync } = useRefreshToken();
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Skip if disabled
    if (!enabled) {
      return;
    }

    // Prevent multiple initialization calls
    if (hasInitialized.current) {
      return;
    }

    // If we already have authenticated user data, skip fetch
    if (isAuthenticated) {
      hasInitialized.current = true;
      return;
    }

    // Fetch current user data to restore auth state on page reload
    const initializeAuth = async () => {
      // Mark as initialized to prevent duplicate calls
      hasInitialized.current = true;

      try {
        // First, refresh the access token
        // The /me endpoint requires a valid accessToken
        let accessToken = null;
        try {
          accessToken = await refreshTokenAsync();
        } catch (_refreshError) {
          // If refresh fails, user is not authenticated
          // Auth state will remain empty, silently fail
          hasInitialized.current = false;
          return;
        }

        // Now fetch current user data with the refreshed token
        const response = await getCurrentUser();
        const userData = response?.data || response || {};

        const {
          userId,
          email,
          userName,
          profileImage,
          phoneNumber,
          role,
          accessToken: responseAccessToken, // In case /me also returns accessToken
          verifyEmail,
        } = userData;

        // Use accessToken from refresh or from response (response takes precedence)
        const finalAccessToken = responseAccessToken || accessToken;

        // Only update if we have required fields
        if (userId && finalAccessToken) {
          const normalizedRole = role ? toCamelCase(role) : null;

          setUserData({
            userId,
            email,
            userName,
            profileImage,
            phoneNumber,
            role: normalizedRole,
            accessToken: finalAccessToken,
            verifyEmail: verifyEmail ?? false,
          });

          // Update React Query cache
          queryClient.setQueryData([QUERY_KEYS.CURRENT_USER], userData);
        } else {
          // If we don't have required fields, user is not authenticated
          // Silently fail - don't show error messages
          hasInitialized.current = false;
        }
      } catch (_error) {
        // Silently handle errors during initialization
        // If refresh succeeded but /me failed, we still have the token in Redux
        // If it's a 401, the axios interceptor will handle it
        // We don't show error messages here to avoid confusing the user
        // console.log(_error);
        hasInitialized.current = false;
      }
    };

    initializeAuth();
  }, [setUserData, isAuthenticated, queryClient, refreshTokenAsync, enabled]);

  return {
    isInitialized: hasInitialized.current,
  };
};
