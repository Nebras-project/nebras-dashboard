/**
 * useLogout Hook
 *
 * Custom hook for handling user logout with React Query
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authApi';
import { useAuth, useTranslation, useToast } from '@hooks';
import { NAVIGATION_PATHS } from '@config';

/**
 * Hook for logout mutation
 * @param {Object} options - React Query mutation options
 * @returns {Object} Logout mutation properties
 */
export const useLogout = (options = {}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { error, success } = useToast();
  const { clearUserData } = useAuth();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      // Clear Redux auth state
      clearUserData();

      // Show success message
      success({
        content: t('auth.logoutSuccess'),
      });

      // Navigate to login page
      navigate(NAVIGATION_PATHS.LOGIN, { replace: true });

      // Call custom onSuccess if provided
      options.onSuccess?.(response);
    },
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
  });

  return {
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
