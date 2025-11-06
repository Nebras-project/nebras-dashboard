// external imports
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// internal imports
import { useUser, useTranslation, useToast } from '@hooks';

/**
 * Custom hook for handling login functionality
 * Single Responsibility: Manage login submission logic
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { t } = useTranslation();
  const { success, error } = useToast();

  const handleLogin = useCallback(
    async (data) => {
      try {
        // Mock login - In real app, this would call an API
        const userData = {
          id: 1,
          name: 'Admin User',
          email: data.email,
          role: 'owner',
        };
        login(userData);
        success({
          title: t('auth.loginSuccess'),
          content: t('auth.welcomeMessage', { name: userData.name }),
        });
        navigate('/dashboard');
      } catch (err) {
        error({
          title: t('auth.loginError'),
          content: err.message || t('auth.invalidCredentials'),
        });
      }
    },
    [login, navigate, success, error, t]
  );

  return { handleLogin };
};
