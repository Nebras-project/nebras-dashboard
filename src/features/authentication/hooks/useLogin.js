// external imports
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// internal imports
import { useAuth, useTranslation, useToast } from '@hooks';

/**
 * Custom hook for handling login functionality
 * Single Responsibility: Manage login submission logic
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const { success, error } = useToast();

  const handleLogin = useCallback(
    async (data) => {
      try {
        // Mock login - In real app, this would call an API
        const userData = {
          id: 1,
          name: 'Admin User',
          email: data.Email,
          role: 'owner',
        };
        // Mock JWT token - In real app, this would come from the API
        const mockToken = 'mock-jwt-token-' + Date.now();

        // Login with user and token
        login({ user: userData, token: mockToken });

        success({
          content: t('auth.welcomeMessage', { name: userData.name }),
        });
        navigate('/dashboard');
      } catch (err) {
        error({
          content: err.message || t('auth.invalidCredentials'),
        });
      }
    },
    [login, navigate, success, error, t]
  );

  return { handleLogin };
};
