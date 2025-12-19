/**
 * useRefreshToken Hook
 *
 * Custom hook for refreshing access token with React Query
 */

import { useMutation } from '@tanstack/react-query';
import { refreshTokenAndUpdateStore } from '../utils/refreshTokenUtils';

/**
 * Hook for refresh token mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Refresh token mutation properties
 */
export const useRefreshToken = (options = {}) => {
  const mutation = useMutation({
    mutationFn: refreshTokenAndUpdateStore,
    onSuccess: (newAccessToken, variables, context) => {
      // Call custom onSuccess if provided
      // Pass the new access token as the first argument
      options.onSuccess?.(newAccessToken, variables, context);
    },
    ...options,
  });

  return {
    refreshToken: mutation.mutate,
    refreshTokenAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
