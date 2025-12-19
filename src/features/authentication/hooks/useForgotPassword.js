/**
 * useForgotPassword Hook
 *
 * Custom hook for sending forgot password email with React Query
 */

import { useMutation } from '@tanstack/react-query';
import { sendForgotPassword } from '../services/authApi';
import { useToast } from '@hooks';

/**
 * Hook for forgot password mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Forgot password mutation properties
 */
export const useForgotPassword = (options = {}) => {
  const { error } = useToast();

  const mutation = useMutation({
    mutationFn: sendForgotPassword,
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
    sendForgotPassword: mutation.mutate,
    sendForgotPasswordAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
