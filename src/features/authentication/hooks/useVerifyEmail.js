/**
 * useVerifyEmail Hook
 *
 * Custom hook for verifying email with React Query
 */

import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '../services/authApi';
import { useToast } from '@hooks';

/**
 * Hook for verify email mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Verify email mutation properties
 */
export const useVerifyEmail = (options = {}) => {
  const { error } = useToast();

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onError: (err) => {
      // Only display error message from API response
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || null;

      if (errorMessage) {
        error({
          content: errorMessage,
        });
      }

      // Call custom onError if provided
      options.onError?.(err);
    },
    ...options,
  });

  return {
    verifyEmail: mutation.mutate,
    verifyEmailAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
