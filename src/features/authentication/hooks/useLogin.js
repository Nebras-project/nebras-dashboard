// external imports
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// internal imports
import { useAuth, useTranslation, useToast } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import { toCamelCase } from '@utils/caseUtils';
import { login } from '../services/authApi';

/**
 * Custom hook for handling login functionality
 * Single Responsibility: Manage login submission logic with React Query
 */
export const useLogin = (options = {}) => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();
  const { t } = useTranslation();
  const { success, error } = useToast();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      // Extract user data from response
      const responseData = response?.data || response || {};
      const { userId, email, userName, profileImage, phoneNumber, role, accessToken, isEmailConfirmed } =
        responseData;

      // Only update auth state if we have required fields
      if (userId && accessToken) {
        // Convert role to camelCase (handles "General Admin" -> "generalAdmin", etc.)
        const normalizedRole = role ? toCamelCase(role) : null;

        setUserData({
          userId,
          email,
          userName,
          profileImage,
          phoneNumber,
          role: normalizedRole,
          accessToken,
          isEmailConfirmed: isEmailConfirmed ?? false,
        });

        success({
          content: t('auth.welcomeMessage', { name: userName || email }),
        });

        navigate(NAVIGATION_PATHS.DASHBOARD);
      } else {
        error({
          content: t('auth.invalidResponse'),
        });
      }

      // Call custom onSuccess if provided
      options.onSuccess?.(response);
    },
    onError: (err) => {
      // Only display error message from API response
      const errorMessage = err?.response?.data?.message || t('auth.invalidResponse');

      error({
        content: errorMessage,
      });

      // Call custom onError if provided
      options.onError?.(err);
    },
  });

  return {
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  };
};
