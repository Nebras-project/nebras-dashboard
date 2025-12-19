/**
 * usePasswordReset Hook
 *
 * Custom hook for sending password reset email with React Query
 */

import { useMutation } from '@tanstack/react-query';
import { sendPasswordReset } from '../services/authApi';
import { useToast } from '@hooks';

/**
 * Hook for password reset mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Password reset mutation properties
 */
export const usePasswordReset = (options = {}) => {
  const { error } = useToast();

  const mutation = useMutation({
    mutationFn: sendPasswordReset,
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
    sendPasswordReset: mutation.mutate,
    sendPasswordResetAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
