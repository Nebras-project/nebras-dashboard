/**
 * useResetPassword Hook
 *
 * Custom hook for resetting password with token using React Query
 */

import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../services/authApi';
import { useToast } from '@hooks';

/**
 * Hook for reset password mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Reset password mutation properties
 */
export const useResetPassword = (options = {}) => {
  const { error } = useToast();

  const mutation = useMutation({
    mutationFn: resetPassword,
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
    resetPassword: mutation.mutate,
    resetPasswordAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
