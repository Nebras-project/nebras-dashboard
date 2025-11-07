// external imports
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo } from 'react';

// internal imports
import {
  login,
  logout,
  setUser,
  setToken,
  clearError,
  checkAuth,
  setLoading,
  setError,
  updateUserProfile,
} from '@store/slices';

export const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Memoize action creators to prevent unnecessary re-renders
  const loginAction = useCallback((payload) => dispatch(login(payload)), [dispatch]);
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const setUserAction = useCallback((user) => dispatch(setUser(user)), [dispatch]);
  const setTokenAction = useCallback((token) => dispatch(setToken(token)), [dispatch]);
  const clearErrorAction = useCallback(() => dispatch(clearError()), [dispatch]);
  const checkAuthAction = useCallback((payload) => dispatch(checkAuth(payload)), [dispatch]);
  const setLoadingAction = useCallback((isLoading) => dispatch(setLoading(isLoading)), [dispatch]);
  const setErrorAction = useCallback((error) => dispatch(setError(error)), [dispatch]);
  const updateUserProfileAction = useCallback(
    (updates) => dispatch(updateUserProfile(updates)),
    [dispatch]
  );

  return useMemo(
    () => ({
      // State
      user: auth.user,
      token: auth.token,
      isAuthenticated: auth.isAuthenticated,
      isLoading: auth.isLoading,
      error: auth.error,
      role: auth.role,
      // Legacy compatibility - keep userData for backward compatibility
      userData: auth.user,
      // Actions
      login: loginAction,
      logout: logoutAction,
      setUser: setUserAction,
      setToken: setTokenAction,
      clearError: clearErrorAction,
      checkAuth: checkAuthAction,
      setLoading: setLoadingAction,
      setError: setErrorAction,
      updateUserProfile: updateUserProfileAction,
    }),
    [
      auth,
      loginAction,
      logoutAction,
      setUserAction,
      setTokenAction,
      clearErrorAction,
      checkAuthAction,
      setLoadingAction,
      setErrorAction,
      updateUserProfileAction,
    ]
  );
};

